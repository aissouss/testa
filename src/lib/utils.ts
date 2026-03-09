import { clsx, type ClassValue } from "clsx";
import { differenceInCalendarDays, endOfWeek, isWithinInterval, startOfWeek } from "date-fns";
import { twMerge } from "tailwind-merge";
import { DashboardStats, Hizb, Juz, MemorizationStatus, Surah, SurahWithProgress, UserSurahProgress } from "@/lib/types";

export const QURAN_TOTAL_AYAHS = 6236;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getSurahPercent = (surah: Surah, progress: UserSurahProgress): number => {
  if (progress.status === "TO_MEMORIZE") return 0;
  if (progress.status === "MEMORIZED") return 100;
  return Math.max(0, Math.min(100, Math.round((progress.currentAyah / surah.ayahCount) * 100)));
};

export const getMemorizedAyahs = (surah: Surah, progress: UserSurahProgress): number => {
  if (progress.status === "MEMORIZED") return surah.ayahCount;
  if (progress.status === "IN_PROGRESS") return Math.max(0, Math.min(surah.ayahCount, progress.currentAyah));
  return 0;
};

export const isRevisedThisWeek = (isoDate: string | null) => {
  if (!isoDate) return false;
  const now = new Date();
  return isWithinInterval(new Date(isoDate), {
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 })
  });
};

export const shouldReviseThisWeek = (row: UserSurahProgress, known: boolean) => {
  if (!known) return false;
  if (!row.lastRevisionAt) return true;
  return differenceInCalendarDays(new Date(), new Date(row.lastRevisionAt)) >= row.revisionFrequencyDays;
};

export const normalizeProgress = (surah: Surah, row: UserSurahProgress): UserSurahProgress => {
  let status: MemorizationStatus = row.status;
  let currentAyah = Math.max(0, Math.min(row.currentAyah, surah.ayahCount));
  if (status === "TO_MEMORIZE") currentAyah = 0;
  if (status === "MEMORIZED") currentAyah = surah.ayahCount;
  if (status === "IN_PROGRESS" && currentAyah === 0) status = "TO_MEMORIZE";

  const known = status === "MEMORIZED" || (status === "IN_PROGRESS" && currentAyah > 0);
  const revisedThisWeek = isRevisedThisWeek(row.lastRevisionAt);
  const needsRevisionThisWeek = shouldReviseThisWeek({ ...row, status, currentAyah }, known);

  return { ...row, status, currentAyah, revisedThisWeek, needsRevisionThisWeek };
};

export const toSurahWithProgress = (surahs: Surah[], progressRows: UserSurahProgress[]): SurahWithProgress[] =>
  surahs.map((surah) => {
    const base = progressRows.find((r) => r.surahNumber === surah.number);
    const row = normalizeProgress(
      surah,
      base ?? {
        id: `local-${surah.number}`,
        userId: "local",
        surahNumber: surah.number,
        status: "TO_MEMORIZE",
        currentAyah: 0,
        lastRevisionAt: null,
        revisedThisWeek: false,
        needsRevisionThisWeek: false,
        tafsirStudied: false,
        vocabularyStudied: false,
        tajwidStudied: false,
        masteryLevel: "LOW",
        priority: 1,
        deadline: null,
        notes: "",
        revisionFrequencyDays: 7,
        updatedAt: new Date().toISOString()
      }
    );

    return {
      ...surah,
      progress: row,
      percent: getSurahPercent(surah, row),
      remainingAyahs: surah.ayahCount - getMemorizedAyahs(surah, row)
    };
  });

export const computeDashboardStats = (rows: SurahWithProgress[]): DashboardStats => {
  const totalAyahsMemorized = rows.reduce((sum, s) => sum + getMemorizedAyahs(s, s.progress), 0);
  const memorizedPercent = Math.round((totalAyahsMemorized / QURAN_TOTAL_AYAHS) * 10000) / 100;
  const memorizedSurahs = rows.filter((s) => s.progress.status === "MEMORIZED").length;
  const inProgressSurahs = rows.filter((s) => s.progress.status === "IN_PROGRESS").length;
  const notStartedSurahs = rows.length - memorizedSurahs - inProgressSurahs;
  const revisionDueThisWeek = rows.filter((s) => s.progress.needsRevisionThisWeek).length;
  const revisionDoneThisWeek = rows.filter((s) => s.progress.revisedThisWeek).length;

  return {
    memorizedPercent,
    remainingPercent: Math.max(0, 100 - memorizedPercent),
    memorizedSurahs,
    inProgressSurahs,
    notStartedSurahs,
    revisionDueThisWeek,
    revisionDoneThisWeek,
    revisionWeeklyPercent: revisionDueThisWeek ? Math.round((revisionDoneThisWeek / revisionDueThisWeek) * 100) : 0,
    totalAyahsMemorized,
    totalAyahs: QURAN_TOTAL_AYAHS
  };
};

const groupProgress = (items: Array<Juz | Hizb>, rows: SurahWithProgress[]) =>
  items.map((item) => {
    const linked = rows.filter((r) => ("name" in item ? r.juzNumbers : r.hizbNumbers).includes(item.number));
    const ayahs = linked.reduce((sum, s) => sum + s.ayahCount, 0);
    const memorized = linked.reduce((sum, s) => sum + getMemorizedAyahs(s, s.progress), 0);
    const percent = ayahs ? Math.round((memorized / ayahs) * 100) : 0;
    return { ...item, surahCount: linked.length, ayahs, memorized, percent };
  });

export const computeJuzProgress = (juz: Juz[], rows: SurahWithProgress[]) => groupProgress(juz, rows);
export const computeHizbProgress = (hizb: Hizb[], rows: SurahWithProgress[]) => groupProgress(hizb, rows);

import { clsx, type ClassValue } from "clsx";
import { isWithinInterval, startOfWeek, endOfWeek } from "date-fns";
import { twMerge } from "tailwind-merge";
import { DashboardStats, Surah, SurahWithProgress, UserSurahProgress } from "@/lib/types";
import { TOTAL_AYAHS } from "@/lib/data/surahs";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getSurahPercent = (surah: Surah, progress: UserSurahProgress): number => {
  if (progress.status === "TO_MEMORIZE") return 0;
  if (progress.status === "MEMORIZED") return 100;
  return Math.min(100, Math.round((progress.currentAyah / surah.ayahCount) * 100));
};

export const toSurahWithProgress = (surahs: Surah[], progressRows: UserSurahProgress[]): SurahWithProgress[] =>
  surahs.map((surah) => {
    const row = progressRows.find((r) => r.surahNumber === surah.number) ?? {
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
    } as UserSurahProgress;

    const ayahMemorized = row.status === "MEMORIZED" ? surah.ayahCount : row.status === "IN_PROGRESS" ? row.currentAyah : 0;

    return {
      ...surah,
      progress: row,
      percent: getSurahPercent(surah, row),
      remainingAyahs: Math.max(0, surah.ayahCount - ayahMemorized)
    };
  });

export const computeDashboardStats = (rows: SurahWithProgress[]): DashboardStats => {
  const memorizedAyahs = rows.reduce((sum, s) => {
    if (s.progress.status === "MEMORIZED") return sum + s.ayahCount;
    if (s.progress.status === "IN_PROGRESS") return sum + Math.min(s.progress.currentAyah, s.ayahCount);
    return sum;
  }, 0);

  const revisionDue = rows.filter((s) => s.progress.needsRevisionThisWeek).length;
  const revisionDone = rows.filter((s) => s.progress.revisedThisWeek).length;

  const memorizedPercent = Math.round((memorizedAyahs / TOTAL_AYAHS) * 10000) / 100;
  return {
    memorizedPercent,
    remainingPercent: Math.max(0, 100 - memorizedPercent),
    memorizedSurahs: rows.filter((s) => s.progress.status === "MEMORIZED").length,
    inProgressSurahs: rows.filter((s) => s.progress.status === "IN_PROGRESS").length,
    notStartedSurahs: rows.filter((s) => s.progress.status === "TO_MEMORIZE").length,
    revisionDueThisWeek: revisionDue,
    revisionDoneThisWeek: revisionDone,
    revisionWeeklyPercent: revisionDue === 0 ? 0 : Math.round((revisionDone / revisionDue) * 100),
    totalAyahsMemorized: memorizedAyahs,
    totalAyahs: TOTAL_AYAHS
  };
};

export const isRevisedThisWeek = (isoDate: string | null) => {
  if (!isoDate) return false;
  const now = new Date();
  return isWithinInterval(new Date(isoDate), { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) });
};

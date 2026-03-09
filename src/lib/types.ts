export type MemorizationStatus = "TO_MEMORIZE" | "IN_PROGRESS" | "MEMORIZED";
export type MasteryLevel = "LOW" | "MEDIUM" | "STRONG";

export type Surah = {
  id: number;
  number: number;
  arabicName: string;
  transliteration: string;
  frenchName: string;
  ayahCount: number;
  juzNumbers: number[];
  hizbNumbers: number[];
};

export type UserSurahProgress = {
  id: string;
  userId: string;
  surahNumber: number;
  status: MemorizationStatus;
  currentAyah: number;
  lastRevisionAt: string | null;
  revisedThisWeek: boolean;
  needsRevisionThisWeek: boolean;
  tafsirStudied: boolean;
  vocabularyStudied: boolean;
  tajwidStudied: boolean;
  masteryLevel: MasteryLevel;
  priority: number;
  deadline: string | null;
  notes: string;
  revisionFrequencyDays: number;
  updatedAt: string;
};

export type Juz = { number: number; name: string; surahNumbers: number[] };
export type Hizb = { number: number; surahNumbers: number[] };

export type RevisionEntry = {
  id: string;
  userId: string;
  surahNumber: number;
  revisedAt: string;
  notes?: string;
};

export type StudyEntry = {
  id: string;
  userId: string;
  surahNumber: number;
  tafsirSource: string;
  summary: string;
  tajwidRules: string;
  themes: string;
  benefits: string;
  reflections: string;
  updatedAt: string;
};

export type Note = {
  id: string;
  userId: string;
  surahNumber: number | null;
  title: string;
  content: string;
  category: "GOAL" | "REMINDER" | "REFLECTION" | "GENERAL";
  updatedAt: string;
};

export type DashboardStats = {
  memorizedPercent: number;
  remainingPercent: number;
  memorizedSurahs: number;
  inProgressSurahs: number;
  notStartedSurahs: number;
  revisionDueThisWeek: number;
  revisionDoneThisWeek: number;
  revisionWeeklyPercent: number;
  totalAyahsMemorized: number;
  totalAyahs: number;
};

export type SurahWithProgress = Surah & {
  progress: UserSurahProgress;
  percent: number;
  remainingAyahs: number;
};

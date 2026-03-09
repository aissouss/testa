import { UserSurahProgress, StudyEntry, Note } from "@/lib/types";

export const SAMPLE_USER_ID = "00000000-0000-0000-0000-000000000001";

export const sampleProgress: UserSurahProgress[] = [
  {
    id: "p1", userId: SAMPLE_USER_ID, surahNumber: 1, status: "MEMORIZED", currentAyah: 7,
    lastRevisionAt: new Date().toISOString(), revisedThisWeek: true, needsRevisionThisWeek: false,
    tafsirStudied: true, vocabularyStudied: true, tajwidStudied: true, masteryLevel: "STRONG", priority: 5,
    deadline: null, notes: "Réviser après chaque salat.", revisionFrequencyDays: 3, updatedAt: new Date().toISOString()
  },
  {
    id: "p2", userId: SAMPLE_USER_ID, surahNumber: 2, status: "IN_PROGRESS", currentAyah: 180,
    lastRevisionAt: new Date(Date.now() - 9 * 86400000).toISOString(), revisedThisWeek: false, needsRevisionThisWeek: true,
    tafsirStudied: false, vocabularyStudied: true, tajwidStudied: false, masteryLevel: "MEDIUM", priority: 4,
    deadline: null, notes: "Objectif fin de mois.", revisionFrequencyDays: 7, updatedAt: new Date().toISOString()
  },
  {
    id: "p3", userId: SAMPLE_USER_ID, surahNumber: 36, status: "IN_PROGRESS", currentAyah: 40,
    lastRevisionAt: new Date(Date.now() - 5 * 86400000).toISOString(), revisedThisWeek: true, needsRevisionThisWeek: true,
    tafsirStudied: true, vocabularyStudied: false, tajwidStudied: true, masteryLevel: "MEDIUM", priority: 3,
    deadline: null, notes: "Très motivant.", revisionFrequencyDays: 5, updatedAt: new Date().toISOString()
  }
];

export const sampleStudy: StudyEntry[] = [
  {
    id: "s1", userId: SAMPLE_USER_ID, surahNumber: 1, tafsirSource: "Tafsir Ibn Kathir",
    summary: "Invocation et guidance", tajwidRules: "Madd naturel", themes: "Louange, adoration",
    benefits: "Renforce l'intention", reflections: "Commencer chaque jour avec Al-Fatiha.", updatedAt: new Date().toISOString()
  }
];

export const sampleNotes: Note[] = [
  {
    id: "n1", userId: SAMPLE_USER_ID, surahNumber: null, title: "Objectif Ramadan", content: "Mémoriser Juz Amma.",
    category: "GOAL", updatedAt: new Date().toISOString()
  }
];

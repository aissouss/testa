import { sampleNotes, sampleProgress, sampleStudy } from "@/lib/data/sample";
import { SURAHS } from "@/lib/data/surahs";
import { getServerSupabase } from "@/lib/supabase/server";
import { Note, StudyEntry, UserSurahProgress } from "@/lib/types";
import { isRevisedThisWeek } from "@/lib/utils";

const recompute = (rows: UserSurahProgress[]) =>
  rows.map((row) => {
    const needs = row.lastRevisionAt
      ? (Date.now() - new Date(row.lastRevisionAt).getTime()) / 86400000 >= row.revisionFrequencyDays
      : row.status !== "TO_MEMORIZE";
    return { ...row, revisedThisWeek: isRevisedThisWeek(row.lastRevisionAt), needsRevisionThisWeek: needs };
  });

export const getUserProgress = async () => {
  const sb = getServerSupabase();
  if (!sb) return recompute(sampleProgress);

  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return recompute(sampleProgress);

  const { data } = await sb.from("user_surah_progress").select("*").eq("user_id", auth.user.id);
  if (!data?.length) return recompute(sampleProgress);
  return recompute(
    data.map((d) => ({
      id: d.id,
      userId: d.user_id,
      surahNumber: d.surah_number,
      status: d.status,
      currentAyah: d.current_ayah,
      lastRevisionAt: d.last_revision_at,
      revisedThisWeek: false,
      needsRevisionThisWeek: false,
      tafsirStudied: d.tafsir_studied,
      vocabularyStudied: d.vocabulary_studied,
      tajwidStudied: d.tajwid_studied,
      masteryLevel: d.mastery_level,
      priority: d.priority,
      deadline: d.deadline,
      notes: d.notes,
      revisionFrequencyDays: d.revision_frequency_days,
      updatedAt: d.updated_at
    }))
  );
};

export const getStudyEntries = async (): Promise<StudyEntry[]> => {
  const sb = getServerSupabase();
  if (!sb) return sampleStudy;
  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return sampleStudy;
  const { data } = await sb.from("study_entries").select("*").eq("user_id", auth.user.id);
  if (!data?.length) return sampleStudy;
  return data.map((d) => ({
    id: d.id,
    userId: d.user_id,
    surahNumber: d.surah_number,
    tafsirSource: d.tafsir_source,
    summary: d.summary,
    tajwidRules: d.tajwid_rules,
    themes: d.themes,
    benefits: d.benefits,
    reflections: d.reflections,
    updatedAt: d.updated_at
  }));
};

export const getNotes = async (): Promise<Note[]> => {
  const sb = getServerSupabase();
  if (!sb) return sampleNotes;
  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return sampleNotes;
  const { data } = await sb.from("notes").select("*").eq("user_id", auth.user.id);
  if (!data?.length) return sampleNotes;
  return data.map((n) => ({
    id: n.id,
    userId: n.user_id,
    surahNumber: n.surah_number,
    title: n.title,
    content: n.content,
    category: n.category,
    updatedAt: n.updated_at
  }));
};

export const getSurahs = async () => SURAHS;

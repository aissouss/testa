"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { sampleNotes, sampleProgress, sampleStudy } from "@/lib/data/sample";
import { SURAHS } from "@/lib/data/surahs";
import { AppState, MemorizationStatus, Note, StudyEntry, SurahWithProgress, UserSurahProgress } from "@/lib/types";
import { normalizeProgress, toSurahWithProgress } from "@/lib/utils";

type Ctx = {
  rows: SurahWithProgress[];
  study: StudyEntry[];
  notes: Note[];
  loading: boolean;
  saveProgress: (surahNumber: number, patch: Partial<UserSurahProgress>) => void;
  markRevised: (surahNumber: number) => void;
  saveStudy: (surahNumber: number, patch: Partial<StudyEntry>) => void;
  addNote: (note: Omit<Note, "id" | "updatedAt" | "userId">) => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
};

const QuranContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "quran-journal-v1";

const defaultState: AppState = { progress: sampleProgress, study: sampleStudy, notes: sampleNotes };

export function QuranProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        setState(JSON.parse(local) as AppState);
        setLoading(false);
        return;
      }

      if (!supabaseClient) {
        setLoading(false);
        return;
      }

      const auth = await supabaseClient.auth.getUser();
      if (!auth.data.user) {
        setLoading(false);
        return;
      }

      const [progressRes, studyRes, notesRes] = await Promise.all([
        supabaseClient.from("user_surah_progress").select("*").eq("user_id", auth.data.user.id),
        supabaseClient.from("study_entries").select("*").eq("user_id", auth.data.user.id),
        supabaseClient.from("notes").select("*").eq("user_id", auth.data.user.id)
      ]);

      const mapped: AppState = {
        progress: progressRes.data?.map((d) => ({
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
        })) ?? sampleProgress,
        study: studyRes.data?.map((s) => ({
          id: s.id,
          userId: s.user_id,
          surahNumber: s.surah_number,
          tafsirSource: s.tafsir_source,
          summary: s.summary,
          tajwidRules: s.tajwid_rules,
          themes: s.themes,
          benefits: s.benefits,
          reflections: s.reflections,
          updatedAt: s.updated_at
        })) ?? sampleStudy,
        notes: notesRes.data?.map((n) => ({
          id: n.id,
          userId: n.user_id,
          surahNumber: n.surah_number,
          title: n.title,
          content: n.content,
          category: n.category,
          updatedAt: n.updated_at
        })) ?? sampleNotes
      };

      setState(mapped);
      setLoading(false);
    };

    void boot();
  }, []);

  useEffect(() => {
    if (!loading) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, loading]);

  const persistProgress = async (row: UserSurahProgress) => {
    if (!supabaseClient) return;
    const auth = await supabaseClient.auth.getUser();
    if (!auth.data.user) return;
    await supabaseClient.from("user_surah_progress").upsert({
      user_id: auth.data.user.id,
      surah_number: row.surahNumber,
      status: row.status,
      current_ayah: row.currentAyah,
      last_revision_at: row.lastRevisionAt,
      tafsir_studied: row.tafsirStudied,
      vocabulary_studied: row.vocabularyStudied,
      tajwid_studied: row.tajwidStudied,
      mastery_level: row.masteryLevel,
      priority: row.priority,
      deadline: row.deadline,
      notes: row.notes,
      revision_frequency_days: row.revisionFrequencyDays,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id,surah_number" });
  };



  const persistStudy = async (row: StudyEntry) => {
    if (!supabaseClient) return;
    const auth = await supabaseClient.auth.getUser();
    if (!auth.data.user) return;
    await supabaseClient.from("study_entries").upsert({
      user_id: auth.data.user.id,
      surah_number: row.surahNumber,
      tafsir_source: row.tafsirSource,
      summary: row.summary,
      tajwid_rules: row.tajwidRules,
      themes: row.themes,
      benefits: row.benefits,
      reflections: row.reflections,
      updated_at: row.updatedAt
    }, { onConflict: "user_id,surah_number" });
  };

  const persistNote = async (row: Note) => {
    if (!supabaseClient) return;
    const auth = await supabaseClient.auth.getUser();
    if (!auth.data.user) return;
    await supabaseClient.from("notes").upsert({
      id: row.id,
      user_id: auth.data.user.id,
      surah_number: row.surahNumber,
      title: row.title,
      content: row.content,
      category: row.category,
      updated_at: row.updatedAt
    });
  };

  const rows = useMemo(() => toSurahWithProgress(SURAHS, state.progress), [state.progress]);

  const saveProgress = (surahNumber: number, patch: Partial<UserSurahProgress>) => {
    const surah = SURAHS.find((s) => s.number === surahNumber);
    if (!surah) return;

    setState((prev) => {
      const existing = prev.progress.find((p) => p.surahNumber === surahNumber) ?? {
        id: `local-${surahNumber}`,
        userId: "local",
        surahNumber,
        status: "TO_MEMORIZE" as MemorizationStatus,
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
      };

      const next = normalizeProgress(surah, { ...existing, ...patch, updatedAt: new Date().toISOString() });
      void persistProgress(next);

      return {
        ...prev,
        progress: [...prev.progress.filter((p) => p.surahNumber !== surahNumber), next]
      };
    });
  };

  const markRevised = (surahNumber: number) => {
    saveProgress(surahNumber, { lastRevisionAt: new Date().toISOString() });
  };

  const saveStudy = (surahNumber: number, patch: Partial<StudyEntry>) => {
    setState((prev) => {
      const existing = prev.study.find((s) => s.surahNumber === surahNumber) ?? {
        id: `study-${surahNumber}`,
        userId: "local",
        surahNumber,
        tafsirSource: "",
        summary: "",
        tajwidRules: "",
        themes: "",
        benefits: "",
        reflections: "",
        updatedAt: new Date().toISOString()
      };
      const next = { ...existing, ...patch, updatedAt: new Date().toISOString() };
      void persistStudy(next);
      return { ...prev, study: [...prev.study.filter((s) => s.surahNumber !== surahNumber), next] };
    });
  };

  const addNote = (note: Omit<Note, "id" | "updatedAt" | "userId">) => {
    setState((prev) => {
      const next = { ...note, id: crypto.randomUUID(), userId: "local", updatedAt: new Date().toISOString() } as Note;
      void persistNote(next);
      return {
        ...prev,
        notes: [next, ...prev.notes]
      };
    });
  };

  const updateNote = (id: string, patch: Partial<Note>) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => {
        if (n.id !== id) return n;
        const next = { ...n, ...patch, updatedAt: new Date().toISOString() };
        void persistNote(next);
        return next;
      })
    }));
  };

  return (
    <QuranContext.Provider value={{ rows, study: state.study, notes: state.notes, loading, saveProgress, markRevised, saveStudy, addNote, updateNote }}>
      {children}
    </QuranContext.Provider>
  );
}

export const useQuran = () => {
  const ctx = useContext(QuranContext);
  if (!ctx) throw new Error("useQuran must be used within QuranProvider");
  return ctx;
};

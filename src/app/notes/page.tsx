"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuran } from "@/components/shared/quran-provider";

export default function NotesPage() {
  const { rows, notes, addNote, updateNote } = useQuran();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [surah, setSurah] = useState<number | "none">("none");
  const [category, setCategory] = useState<"GENERAL" | "GOAL" | "REMINDER" | "REFLECTION">("GENERAL");

  return (
    <AppShell>
      <Card className="mb-4 space-y-2">
        <h3 className="font-semibold">Nouvelle note</h3>
        <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Contenu" value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="grid gap-2 md:grid-cols-3">
          <select className="rounded border bg-background p-2" value={surah} onChange={(e) => setSurah(e.target.value === "none" ? "none" : Number(e.target.value))}>
            <option value="none">Sans sourate</option>
            {rows.map((r) => <option key={r.number} value={r.number}>{r.number}. {r.transliteration}</option>)}
          </select>
          <select className="rounded border bg-background p-2" value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
            <option value="GENERAL">General</option><option value="GOAL">Goal</option><option value="REMINDER">Reminder</option><option value="REFLECTION">Reflection</option>
          </select>
          <Button onClick={() => { if (!title || !content) return; addNote({ title, content, category, surahNumber: surah === "none" ? null : surah }); setTitle(""); setContent(""); }}>Ajouter</Button>
        </div>
      </Card>

      <div className="space-y-3">
        {notes.map((note) => (
          <Card key={note.id}>
            <Input value={note.title} onChange={(e) => updateNote(note.id, { title: e.target.value })} />
            <Textarea className="mt-2" value={note.content} onChange={(e) => updateNote(note.id, { content: e.target.value })} />
            <p className="mt-2 text-xs text-zinc-400">{note.category} · {note.surahNumber ? `Sourate ${note.surahNumber}` : "Global"}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

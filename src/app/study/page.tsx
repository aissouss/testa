"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuran } from "@/components/shared/quran-provider";

export default function StudyPage() {
  const { rows, study, saveStudy, saveProgress } = useQuran();
  const [surah, setSurah] = useState(1);
  const current = useMemo(() => study.find((s) => s.surahNumber === surah), [study, surah]);

  return (
    <AppShell>
      <Card>
        <div className="mb-4 grid gap-2 md:grid-cols-2">
          <select className="rounded border bg-background px-3 py-2" value={surah} onChange={(e) => setSurah(Number(e.target.value))}>
            {rows.map((r) => <option key={r.number} value={r.number}>{r.number}. {r.transliteration}</option>)}
          </select>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <label><input type="checkbox" checked={rows.find((r) => r.number === surah)?.progress.tafsirStudied ?? false} onChange={(e) => saveProgress(surah, { tafsirStudied: e.target.checked })} /> Tafsir</label>
            <label><input type="checkbox" checked={rows.find((r) => r.number === surah)?.progress.vocabularyStudied ?? false} onChange={(e) => saveProgress(surah, { vocabularyStudied: e.target.checked })} /> Vocabulaire</label>
            <label><input type="checkbox" checked={rows.find((r) => r.number === surah)?.progress.tajwidStudied ?? false} onChange={(e) => saveProgress(surah, { tajwidStudied: e.target.checked })} /> Tajwid</label>
          </div>
        </div>
        <div className="grid gap-3">
          <Input placeholder="Source du tafsir" value={current?.tafsirSource ?? ""} onChange={(e) => saveStudy(surah, { tafsirSource: e.target.value })} />
          <Textarea placeholder="Résumé personnel" value={current?.summary ?? ""} onChange={(e) => saveStudy(surah, { summary: e.target.value })} />
          <Textarea placeholder="Règles tajwid" value={current?.tajwidRules ?? ""} onChange={(e) => saveStudy(surah, { tajwidRules: e.target.value })} />
          <Textarea placeholder="Thèmes principaux" value={current?.themes ?? ""} onChange={(e) => saveStudy(surah, { themes: e.target.value })} />
          <Textarea placeholder="Bénéfices" value={current?.benefits ?? ""} onChange={(e) => saveStudy(surah, { benefits: e.target.value })} />
          <Textarea placeholder="Réflexions" value={current?.reflections ?? ""} onChange={(e) => saveStudy(surah, { reflections: e.target.value })} />
        </div>
        <Button className="mt-3" variant="outline">Sauvegarde automatique active</Button>
      </Card>
    </AppShell>
  );
}

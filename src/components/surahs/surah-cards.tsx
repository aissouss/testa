"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SurahWithProgress, UserSurahProgress } from "@/lib/types";

type Props = {
  rows: SurahWithProgress[];
  onEdit: (surahNumber: number, patch: Partial<UserSurahProgress>) => void;
  onRevised: (surahNumber: number) => void;
};

export function SurahCards({ rows, onEdit, onRevised }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((row) => (
        <Card key={row.number}>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">{row.number}. {row.transliteration}</h3>
            <Badge>{row.progress.status}</Badge>
          </div>
          <p className="mb-2 text-xs text-zinc-400">{row.arabicName} · {row.frenchName}</p>
          <Progress value={row.percent} />
          <p className="my-2 text-sm">{row.percent}% · {row.remainingAyahs} ayahs restants</p>
          <div className="space-y-2">
            <select className="w-full rounded border bg-background p-2 text-sm" value={row.progress.status} onChange={(e) => onEdit(row.number, { status: e.target.value as UserSurahProgress["status"] })}>
              <option value="TO_MEMORIZE">À mémoriser</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="MEMORIZED">Mémorisée</option>
            </select>
            <Input type="number" min={0} max={row.ayahCount} value={row.progress.currentAyah} onChange={(e) => onEdit(row.number, { currentAyah: Number(e.target.value) || 0 })} />
            <button className="text-xs underline" onClick={() => onRevised(row.number)}>Révisée cette semaine</button>
          </div>
        </Card>
      ))}
    </div>
  );
}

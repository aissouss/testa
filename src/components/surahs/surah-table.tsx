"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SurahWithProgress, UserSurahProgress } from "@/lib/types";

type Props = {
  rows: SurahWithProgress[];
  onEdit: (surahNumber: number, patch: Partial<UserSurahProgress>) => void;
  onRevised: (surahNumber: number) => void;
};

export function SurahTable({ rows, onEdit, onRevised }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card p-4">
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-400">
          <tr>
            <th>#</th><th>Sourate</th><th>Statut</th><th>Ayah actuel</th><th>Progression</th><th>Reste</th><th>Révision</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.number} className="border-t align-top">
              <td className="py-3">{row.number}</td>
              <td className="py-3">
                <div>{row.transliteration}</div>
                <div className="text-xs text-zinc-500">{row.arabicName} · {row.frenchName}</div>
              </td>
              <td className="py-3">
                <select className="rounded border bg-background p-2" value={row.progress.status} onChange={(e) => onEdit(row.number, { status: e.target.value as UserSurahProgress["status"] })}>
                  <option value="TO_MEMORIZE">À mémoriser</option>
                  <option value="IN_PROGRESS">En cours</option>
                  <option value="MEMORIZED">Mémorisée</option>
                </select>
              </td>
              <td className="py-3">
                <Input type="number" min={0} max={row.ayahCount} value={row.progress.currentAyah} onChange={(e) => onEdit(row.number, { currentAyah: Number(e.target.value) || 0 })} />
              </td>
              <td className="py-3">{row.percent}%</td>
              <td className="py-3">{row.remainingAyahs}</td>
              <td className="py-3">
                <div className="mb-2"><Badge>{row.progress.needsRevisionThisWeek ? "À faire" : "OK"}</Badge></div>
                <button className="text-xs underline" onClick={() => onRevised(row.number)}>Marquer révisée</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

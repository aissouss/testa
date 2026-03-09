"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SurahWithProgress } from "@/lib/types";

export function SurahTable({ rows }: { rows: SurahWithProgress[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => rows.filter((r) => `${r.number} ${r.transliteration} ${r.frenchName}`.toLowerCase().includes(query.toLowerCase())),
    [rows, query]
  );

  return (
    <Card>
      <Input placeholder="Rechercher une sourate..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-zinc-400">
            <tr><th>#</th><th>Sourate</th><th>Statut</th><th>Progression</th><th>Reste</th><th>Révision</th></tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.number} className="border-t">
                <td className="py-3">{row.number}</td>
                <td>{row.transliteration}<div className="text-xs text-zinc-400">{row.frenchName}</div></td>
                <td><Badge>{row.progress.status}</Badge></td>
                <td className="min-w-36"><Progress value={row.percent} /><span className="text-xs">{row.percent}%</span></td>
                <td>{row.remainingAyahs} ayahs</td>
                <td>{row.progress.needsRevisionThisWeek ? "À faire" : "OK"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

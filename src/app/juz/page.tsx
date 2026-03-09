"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JUZ } from "@/lib/data/juz";
import { useQuran } from "@/components/shared/quran-provider";
import { computeJuzProgress } from "@/lib/utils";

export default function JuzPage() {
  const { rows } = useQuran();
  const list = computeJuzProgress(JUZ, rows);

  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((j) => (
          <Card key={j.number}>
            <p className="mb-2 font-semibold">Juz {j.number}</p>
            <Progress value={j.percent} />
            <p className="mt-2 text-sm text-zinc-400">{j.percent}% · {j.memorized}/{j.ayahs || 0} ayahs · {j.surahCount} sourates</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

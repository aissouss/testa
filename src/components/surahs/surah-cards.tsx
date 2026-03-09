import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SurahWithProgress } from "@/lib/types";

export function SurahCards({ rows }: { rows: SurahWithProgress[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((row) => (
        <Card key={row.number}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium">{row.number}. {row.transliteration}</h3>
            <Badge>{row.progress.masteryLevel}</Badge>
          </div>
          <p className="mb-2 text-sm text-zinc-400">{row.arabicName} • {row.frenchName}</p>
          <Progress value={row.percent} />
          <p className="mt-2 text-sm">{row.percent}% · {row.remainingAyahs} ayahs restants</p>
        </Card>
      ))}
    </div>
  );
}

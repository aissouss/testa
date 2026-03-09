import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { getStudyEntries } from "@/lib/supabase/queries";

export default async function StudyPage() {
  const entries = await getStudyEntries();
  return (
    <AppShell>
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <h3 className="font-semibold">Sourate {entry.surahNumber}</h3>
            <p className="text-sm text-zinc-400">{entry.tafsirSource}</p>
            <p className="mt-2 text-sm">{entry.summary}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

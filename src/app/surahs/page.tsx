import { AppShell } from "@/components/layout/app-shell";
import { SurahCards } from "@/components/surahs/surah-cards";
import { SurahTable } from "@/components/surahs/surah-table";
import { getSurahs, getUserProgress } from "@/lib/supabase/queries";
import { toSurahWithProgress } from "@/lib/utils";

export default async function SurahsPage() {
  const rows = toSurahWithProgress(await getSurahs(), await getUserProgress());
  return (
    <AppShell>
      <div className="space-y-6">
        <SurahTable rows={rows} />
        <SurahCards rows={rows} />
      </div>
    </AppShell>
  );
}

"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { SurahCards } from "@/components/surahs/surah-cards";
import { SurahTable } from "@/components/surahs/surah-table";
import { Input } from "@/components/ui/input";
import { useQuran } from "@/components/shared/quran-provider";

export default function SurahsPage() {
  const { rows, saveProgress, markRevised } = useQuran();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("number");
  const [view, setView] = useState<"table" | "cards">("table");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = rows.filter((r) => (`${r.number} ${r.transliteration} ${r.frenchName}`.toLowerCase().includes(q)) && (status === "ALL" || r.progress.status === status));
    return [...list].sort((a, b) => {
      if (sort === "progress") return b.percent - a.percent;
      if (sort === "status") return a.progress.status.localeCompare(b.progress.status);
      if (sort === "revision") return (a.progress.lastRevisionAt ?? "").localeCompare(b.progress.lastRevisionAt ?? "");
      return a.number - b.number;
    });
  }, [rows, query, status, sort]);

  return (
    <AppShell>
      <div className="mb-4 grid gap-2 md:grid-cols-4">
        <Input placeholder="Recherche" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="rounded border bg-card px-3" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">Tous statuts</option>
          <option value="TO_MEMORIZE">À mémoriser</option>
          <option value="IN_PROGRESS">En cours</option>
          <option value="MEMORIZED">Mémorisée</option>
        </select>
        <select className="rounded border bg-card px-3" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="number">Tri numéro</option>
          <option value="progress">Tri progression</option>
          <option value="status">Tri statut</option>
          <option value="revision">Tri dernière révision</option>
        </select>
        <select className="rounded border bg-card px-3" value={view} onChange={(e) => setView(e.target.value as "table" | "cards") }>
          <option value="table">Vue tableau</option>
          <option value="cards">Vue cartes</option>
        </select>
      </div>
      {view === "table" ? (
        <SurahTable rows={filtered} onEdit={saveProgress} onRevised={markRevised} />
      ) : (
        <SurahCards rows={filtered} onEdit={saveProgress} onRevised={markRevised} />
      )}
    </AppShell>
  );
}

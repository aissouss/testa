import { createClient } from "@supabase/supabase-js";
import { SURAHS } from "../src/lib/data/surahs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function main() {
  const supabase = createClient(url, serviceRole);

  const { error } = await supabase.from("surahs").upsert(
    SURAHS.map((s) => ({
      id: s.id,
      number: s.number,
      arabic_name: s.arabicName,
      transliteration: s.transliteration,
      french_name: s.frenchName,
      ayah_count: s.ayahCount,
      juz_numbers: s.juzNumbers,
      hizb_numbers: s.hizbNumbers
    }))
  );

  if (error) throw error;
  console.log(`Seeded ${SURAHS.length} surahs`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

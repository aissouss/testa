import { SURAHS } from "@/lib/data/surahs";
import { Hizb } from "@/lib/types";

export const HIZB: Hizb[] = Array.from({ length: 60 }, (_, i) => {
  const number = i + 1;
  return {
    number,
    surahNumbers: SURAHS.filter((s) => s.hizbNumbers.includes(number)).map((s) => s.number)
  };
});

import type { CyberEvent } from "@/model/CyberEvent";
import { useMemo } from "react";

export function useFilteredEvents(
  data: CyberEvent[],
  selectedCountry: string | null
) {
  return useMemo(() => {
    if (!selectedCountry || selectedCountry === "ALL")
        return data;
    return data.filter(e => e.event?.primaryLocation === selectedCountry);
  }, [data, selectedCountry]);
}

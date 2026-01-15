import type { CyberEvent } from "@/model/CyberEvent";
import { useMemo } from "react";

export function useFilteredEvents(
  data: CyberEvent[],
  selectedCountry: string | null
) {
  return useMemo(() => {
    if (!selectedCountry)
        return data;
    return data.filter(e => e.event?.primaryLocation === selectedCountry);
  }, [data, selectedCountry]);
}

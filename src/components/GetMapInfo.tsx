import { fetchJSON } from '../services/FetchData';
import { useEffect, useState } from 'react';


type CountryInfo = {
  total: number;
  types: Record<string, number>;
};

export function useMapInfo(data: any) {
  const [countries, setCountries] = useState<Record<string, CountryInfo>>({});

  useEffect(() => {
    if (!data || data.length === 0) return;

    const result: Record<string, CountryInfo> = {};

    data.forEach(item => {
      const country = item.event?.primaryLocation;
      const type = item.attack?.type || "Unknown";

      if (!country)
        return;

      if (!result[country])
        result[country] = { total: 0, types: {} };
      result[country].total += 1;

      if (!result[country].types[type])
        result[country].types[type] = 0;
      result[country].types[type] += 1;
    });

    setCountries(result);
  }, [data]);

  return countries;
}

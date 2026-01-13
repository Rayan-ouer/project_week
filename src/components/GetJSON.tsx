import { useEffect, useState } from 'react';
import { fetchJSON } from '../services/FetchData';
import { useMapInfo } from '../components/GetMapInfo'

export interface CyberEvent {
  id?: string;
  organization?: string;
  reported_by?: string;
  inserted_at?: string;
  extra?: {
    capture?: Array<{
      data?: {
        image?: string;
        markdown?: string;
        pdf?: string;
      };
      duration?: number;
      end?: number;
      start?: number;
    }>;
  };
  status?: string;
  event?: {
    date?: string;
    startDate?: string;
    name?: string;
    description?: string;
    primaryLocation?: string;
    primaryCity?: string;
    eventTrustLevel?: string;
  };
  attack?: {
    type?: string;
    vector?: string;
    impact?: {
      cia?: string;
      type?: string;
    };
    harms?: {
      groupName?: string;
    };
    threatActor?: string;
    attribution?: {
      type?: string;
      source?: string;
      url?: string;
    };
  };
  source?: {
    name?: string;
    url?: string;
    archive?: string;
  };
  target_name_embed?: string[];
  threat_actor_name_embed?: string[];
  tags?: string[];
}

export default function GetJSON() {
  const [data, setData] = useState<CyberEvent[]>([]);

  useEffect(() => {
    (async function loadData() {
      const res = await fetchJSON();
      setData(res as CyberEvent[]);
    })();
  }, []);

  return (
    <div>
      <h2>Info par pays :</h2>
      {data && <pre>{JSON.stringify(data[0])}</pre>}
    </div>
  );
}

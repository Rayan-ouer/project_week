import { use, useEffect, useState } from 'react';
import { fetchJSON } from '../services/FetchJSON';
import type { CyberEvent, CountryEvent } from '../model/CyberEvent';
import { ChartBarAttackType } from './TypeAttack';
import { TimelineComp } from "@/components/Timeline";
import { ModalButton } from "@/components/buttonCountry"
import Dashboard from "./Dashboard";
import WorldMap from './WorldMap';
import { getCountryISO3 } from '@/services/getCountryIS03'
import { useFilteredEvents } from '@/services/FilterCountry';
import { Button } from './ui/button';
import { ArrowUpIcon, Ghost } from "lucide-react"


function convertISO2_to_ISO3(data: CyberEvent[]): void {
  data.forEach(event => {
    if (!event.event?.primaryLocation)
		  return;
    const iso3 = getCountryISO3(event.event.primaryLocation);
    if (!iso3)
		  return;
    event.event.primaryLocation = iso3;
  });
}

function getEventByCountry(data: CyberEvent[]): CountryEvent[]{
	const map: Record<string, CyberEvent[]> = {};

	data.forEach(event => {
		const country = event.event?.primaryLocation;
		if (!country)
			return;
		if (!map[country])
			map[country] = [];
		map[country].push(event);
	})
	return Object.entries(map).map(([country, events]) => ({
		country,
		events,
	}));
}

export default function CyberEventsContainer() {
  const [data, setData] = useState<CyberEvent[]>([]);
  const [country, setCountries] = useState<CountryEvent[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const filteredData = useFilteredEvents(data, selectedCountry);

  	useEffect(() => {
    	(async function loadData() {
     	const res = await fetchJSON();
		convertISO2_to_ISO3(res as CyberEvent[])
      	setData(res as CyberEvent[]);
    })();}, []);

	useEffect(() => {
    if (data.length === 0)
		return;
    const grouped = getEventByCountry(data);
    setCountries(grouped as CountryEvent[]);
  }, [data]);
  
  	const handleCountryClick = (countryCode: string | null) => {
		if (!countryCode) {
			setSelectedCountry(null);
			return;
		}
		if (selectedCountry === countryCode) {
			setSelectedCountry(null);
		} else {
			setSelectedCountry(countryCode);
		}
	};

  return (
    <div>
      <TimelineComp data={filteredData} />
      <div>
      <WorldMap onCountryClick={handleCountryClick} data={country}/>
	  {selectedCountry && (
        <div className="SideMenu">
          <div className="overlay" onClick={() => setSelectedCountry(null)}></div>
            <div>
            <Button className="closeButton" onClick={() => setSelectedCountry(null)}>
              X
              </Button>
            </div>
            <Dashboard
              data={data.filter(e => e.event?.primaryLocation === selectedCountry)}
            />
        </div>
      )}
      </div>
      <div>
      </div>
    </div>
  );
}
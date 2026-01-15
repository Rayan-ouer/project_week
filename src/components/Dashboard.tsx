import { ChartBarAttackType } from './TypeAttack';
import { ChartBarAttackImpact } from './ImpactAttack';
import { TableAttack } from './TableAttack';
import { ChartRadarSector } from './SectorAttack';
import type { CyberEvent } from '../model/CyberEvent';

export default function Dashboard({ data }: { data: CyberEvent[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1 flex flex-col gap-4">
        <ul>
        <ChartBarAttackType data={data} />
        </ul>
        <div/>
         <div className="flex-1 flex flex-col gap-4">
          <ul>
        <ChartBarAttackImpact data={data} />
        </ul>
        </div>
        <div className="flex-1 flex flex-col gap-4"></div>
        <ul>
        <ChartRadarSector data={data} />
        </ul>
        </div>
      </div>
  );
}

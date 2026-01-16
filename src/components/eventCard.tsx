import type { CyberEvent } from '@/model/CyberEvent'
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getCountryName3 } from "@/services/getCountryName"
import { findTypeColor } from "@/services/getTypeColor"


export default function CardDemo({ data }: { data: CyberEvent}) {

  return (
    <Card className="eventCard">
      <div className="cardHead">
        <strong>{getCountryName3(data.event?.primaryLocation)}</strong>
          <Label className="cardTitle">{data.event?.startDate}</Label>
      </div>
      <div>
          <div className="cardContent">
          <div className="typeBar" style={{backgroundColor: `${findTypeColor(data.attack?.type)}`}}>
              <Label className="cardTitle">{data.attack?.type}</Label>
            </div>
            <div >
                <Label className="cardTitle">{data.event?.name}</Label>
            </div>
            <div className="cardTitle">
                <Label className="cardTitle">Impact : {data.attack?.impact?.type}</Label>
            </div>
          </div>
      </div>
    </Card>
  )
}

"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import type { CyberEvent } from "@/model/CyberEvent"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { string } from "astro:schema"
import { group } from "d3"

export const description = "A radar chart of type"

const chartConfig = {
  desktop: {
    label: "name",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const GROUPS = [
  "Organizational",
  "Individual",
  "International Peace",
  "Societal",
  "Security",
] as const;

export function ChartRadarSector({ data }: { data: CyberEvent[] }) {
  const chartData = useMemo(() => {
    const counters = GROUPS.map(group => ({
      group,
      sum: 0,
    }));
    for (const event of data) {
      const type = event.attack?.harms?.groupName;
      if (!type) continue;
      for (const item of counters) {
        if (type.includes(item.group)) {
          item.sum += 1;
        }
      }
    }
    return counters;
  }, [data]);
  return (
    <Card>
      <CardHeader className="text-center">
        <div></div>
        <CardTitle>Radar by Sector</CardTitle>
        <CardDescription>
          Showing type of attack by sector
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className=""
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow-lg border">
                    <div className="font-bold">{data.group}</div>   {}
                    <div>Nombre d’attaques : {data.sum}</div>   {}
                  </div>
                );
              }}
            />
            <PolarAngleAxis dataKey="group" />
            <PolarGrid />
            <Radar
              dataKey="sum"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

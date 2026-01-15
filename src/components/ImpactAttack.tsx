"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import type { CyberEvent } from "@/model/CyberEvent"
import { useMemo } from "react"

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

export const description = "A horizontal bar chart"

const chartConfig = {
  value: {
    label: "Nombre d'attaques",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const CustomYAxisTick = ({ x, y, payload }: any) => (
  <text
    x={x}
    y={y}
    dy={4}
    className="fill-foreground text-xs bg-white"
    textAnchor="end"
  >
    {payload.value}
  </text>
)


export function ChartBarAttackImpact({ data }: { data: CyberEvent[] }) {
    const chartData = useMemo(() => {
        const map: Record<string, number> = {};
        data.forEach(e => {
            const type = e.attack?.impact?.type;
            if (!type) return;
            map[type] = (map[type] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [data]);
  
  return (
    <Card className="chartCard">
      <CardHeader className="text-center" >
        <div></div>
        <CardTitle>Type of Impact</CardTitle>
      </CardHeader>
      <CardContent >
        <ChartContainer className="w-full h-64" config={chartConfig}>
           <ResponsiveContainer width="100%" height="100%">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <ChartTooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow-lg border">
                    <div className="font-bold">{data.name}</div>   {}
                    <div>Nombre d’attaques : {data.value}</div>   {}
                  </div>
                );
              }}
            />
            <Bar dataKey="value" fill="var(--chart-3)" radius={8}>
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, ResponsiveContainer } from "recharts"
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

export const description = "A bar chart with label of type of attack"

const chartConfig = {
  value: {
    label: "Nombre d'attaques",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarAttackType({ data }: { data: CyberEvent[] }) {
  const chartData = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(e => {
      const type = e.attack?.type;
      if (!type) return;
      map[type] = (map[type] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  return (
    <Card className="chartCard">
      <CardHeader className="text-center">
        <div></div>
        <CardTitle >Attack by type</CardTitle>
          <CardDescription>
          Showing type of attack
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-64" config={chartConfig}>
           <ResponsiveContainer width="100%" height="100%">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#3b82f6" }}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
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
            <Bar dataKey="value" fill="var(--chart-2)" radius={8}>
             <LabelList
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}



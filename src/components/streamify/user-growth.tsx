import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import { UserGrowthData } from "@/lib/types";

const chartConfig = {
  views: {
    label: "User Count",
  },
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function UserGrowth() {
  const [userGrowth, setUserGrowth] = useState<UserGrowthData[] | null>(null);
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("totalUsers");

  useEffect(() => {
    fetch("/api/user-growth")
      .then((res) => res.json())
      .then((data) => setUserGrowth(data));
  }, []);

  const total = useMemo(() => {
    if (!userGrowth) return null;
    return {
      activeUsers: userGrowth.reduce((acc, curr) => acc + curr.activeUsers, 0),
      totalUsers: userGrowth.reduce((acc, curr) => acc + curr.totalUsers, 0),
    };
  }, [userGrowth]);

  if (!userGrowth) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>User Growth - Interactive</CardTitle>
          <CardDescription>
            Showing the growth in the number of total users and active users
            over the past 12 months.
          </CardDescription>
        </div>
        <div className="flex">
          {["activeUsers", "totalUsers"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total && total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] lg:h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={userGrowth}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid
              strokeDasharray={"5 5"}
              stroke="#09090b"
              strokeOpacity={0.1}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

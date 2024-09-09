import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Song } from "@/lib/types";

const chartConfig = {
  streamCount: {
    label: "Streams",
    color: "hsl(var(--chart-1))",
  },
  songName: {
    label: "Track Name",
    color: "hsl(var(--chart-2))",
  },
  artist: {
    label: "Artist",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function TopStreamed({ className }: { className?: string }) {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch("/api/top-songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top 5 Streamed Songs - Interactive Bar Chart</CardTitle>
        <CardDescription>Streams over the past 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={songs}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="songName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="streamCount"
              fill="var(--color-streamCount)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

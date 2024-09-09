import { Label, Pie, PieChart } from "recharts";
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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { RevenueData } from "@/lib/types";

const chartConfig = {
  subscriptions: {
    label: "Subscriptions",
  },
  ads: {
    label: "Ads",
  },
  inAppPurchases: {
    label: "In-App Purchases",
  },
  affiliateMarketing: {
    label: "Affiliate Marketing",
  },
} satisfies ChartConfig;

export default function RevenueDistrib() {
  const id = "pie-interactive";

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [activeMonth, setActiveMonth] = useState<string>("");

  useEffect(() => {
    fetch("/api/revenue-distribution")
      .then((res) => res.json())
      .then((data) => {
        setRevenueData(data);
        setActiveMonth(data[0]?.month);
      });
  }, []);

  const months = useMemo(
    () => revenueData.map((item) => item.month),
    [revenueData]
  );

  const activeIndex = useMemo(
    () => revenueData.findIndex((item) => item.month === activeMonth),
    [activeMonth, revenueData]
  );

  const activeRevenue = useMemo(
    () =>
      activeIndex !== -1
        ? revenueData[activeIndex]
        : {
            subscriptions: 0,
            ads: 0,
            inAppPurchases: 0,
            affiliateMarketing: 0,
          },
    [activeIndex, revenueData]
  );

  const totalRevenue = useMemo(() => {
    return (
      activeRevenue.subscriptions +
      activeRevenue.ads +
      activeRevenue.inAppPurchases +
      activeRevenue.affiliateMarketing
    );
  }, [activeRevenue]);

  const pieData = [
    {
      name: "Subscriptions",
      value: activeRevenue.subscriptions,
      fill: "hsl(var(--chart-1))",
    },
    { name: "Ads", value: activeRevenue.ads, fill: "hsl(var(--chart-2))" },
    {
      name: "In-App Purchases",
      value: activeRevenue.inAppPurchases,
      fill: "hsl(var(--chart-3))",
    },
    {
      name: "Affiliate Marketing",
      value: activeRevenue.affiliateMarketing,
      fill: "hsl(var(--chart-4))",
    },
  ];

  if (!revenueData.length || activeIndex === -1) {
    return <div>Loading...</div>;
  }

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Revenue Breakdown - Interactive Pie Chart</CardTitle>
          <CardDescription>Revenue by Source for 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((month) => (
              <SelectItem
                key={month}
                value={month}
                className="rounded-lg [&_span]:flex"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              isAnimationActive={true}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              fill="fill"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Revenue
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

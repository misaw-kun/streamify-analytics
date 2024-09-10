import { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

interface KeyMetricProps {
  title: string;
  metric: React.ReactNode;
  icon: LucideIcon;
}

export default function KeyMetric({
  title,
  metric,
  icon: Icon,
}: KeyMetricProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
        {/* <p className="text-xs text-muted-foreground">+201 since last hour</p> */}
      </CardContent>
    </Card>
  );
}

export function KeyMetricSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-[16px] w-[250px] rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[32px] w-full" />
      </CardContent>
    </Card>
  );
}

import { useEffect, useState } from "react";
import type { Metrics } from "@/lib/types";
import KeyMetric, { KeyMetricSkeleton } from "./key-metric";
import { Activity, DollarSign, Music, Star, Users } from "lucide-react";

export default function Metrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Error fetching metrics", err));
  }, []);

  if (!metrics) {
    return (
      <section className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-5">
        <KeyMetricSkeleton />
        <KeyMetricSkeleton />
        <KeyMetricSkeleton />
        <KeyMetricSkeleton />
        <KeyMetricSkeleton />
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-5">
      <KeyMetric title="Total Users" metric={metrics.totalUsers} icon={Users} />
      <KeyMetric
        title="Active Users"
        metric={metrics.activeUsers}
        icon={Activity}
      />
      <KeyMetric
        title="Total Streams"
        metric={metrics.totalStreams}
        icon={Music}
      />
      <KeyMetric
        title="Revenue"
        metric={`$${metrics.revenue}`}
        icon={DollarSign}
      />
      <KeyMetric title="Top Artist" metric={metrics.topArtist} icon={Star} />
    </section>
  );
}

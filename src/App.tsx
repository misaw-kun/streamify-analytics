import { useEffect, useState } from "react";
import KeyMetric from "./components/streamify/key-metric";
import { Metrics } from "./lib/types";
import { Activity, DollarSign, Music, Star, Users } from "lucide-react";
import UserGrowth from "./components/streamify/user-growth";
import RevenueDistrib from "./components/streamify/revenue-distrib";

function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Error fetching metrics", err));
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-5">
          <KeyMetric
            title="Total Users"
            metric={metrics.totalUsers}
            icon={Users}
          />
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
          <KeyMetric
            title="Top Artist"
            metric={metrics.topArtist}
            icon={Star}
          />
        </div>
        <UserGrowth />
        <RevenueDistrib />
      </main>
    </div>
  );
}

export default App;

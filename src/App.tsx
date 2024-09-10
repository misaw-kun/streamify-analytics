import Metrics from "./components/streamify/metrics";
import UserGrowth from "./components/streamify/user-growth";
import RevenueDistrib from "./components/streamify/revenue-distrib";
import TopStreamed from "./components/streamify/top-streamed";
import RecentStreams from "./components/streamify/recent-streams";
import Navbar from "./components/streamify/navbar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="container mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Metrics />
          <section className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <UserGrowth className="col-span-1 md:col-span-3 lg:col-span-3" />
            <RevenueDistrib className="col-span-1 md:col-span-1 lg:col-span-1" />
            <TopStreamed className="md:col-span-2 lg:col-span-2" />
            <RecentStreams className="md:col-span-3 lg:col-span-full" />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

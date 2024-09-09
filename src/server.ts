import { createServer } from "miragejs";

// for introducing fluctuations (aesthetic reasons)
function getRandomGrowth(base: number, minOffset: number, maxOffset: number) {
  return (
    base + Math.floor(Math.random() * (maxOffset - minOffset + 1) + minOffset)
  );
}

export default function initMockServer() {
  createServer({
    routes() {
      this.namespace = "api";

      // Endpoint: GET /api/metrics
      this.get("/metrics", () => {
        return {
          totalUsers: 100000,
          activeUsers: 75000,
          totalStreams: 3000000,
          revenue: 500000,
          topArtist: "Artist A",
        };
      });

      // Endpoint: GET /api/user-growth
      this.get("/user-growth", () => {
        return [
          { month: "January", totalUsers: 80000, activeUsers: 60000 },
          {
            month: "February",
            totalUsers: getRandomGrowth(83000, -2000, 5000),
            activeUsers: getRandomGrowth(63000, -3000, 4000),
          },
          {
            month: "March",
            totalUsers: getRandomGrowth(86000, -4000, 6000),
            activeUsers: getRandomGrowth(66000, -3500, 5000),
          },
          {
            month: "April",
            totalUsers: getRandomGrowth(89000, -3000, 7000),
            activeUsers: getRandomGrowth(69000, -2000, 6000),
          },
          {
            month: "May",
            totalUsers: getRandomGrowth(92000, -2500, 6000),
            activeUsers: getRandomGrowth(72000, -1500, 5500),
          },
          {
            month: "June",
            totalUsers: getRandomGrowth(95000, -5000, 8000),
            activeUsers: getRandomGrowth(74000, -3000, 7000),
          },
          {
            month: "July",
            totalUsers: getRandomGrowth(98000, -4000, 7000),
            activeUsers: getRandomGrowth(75500, -3500, 6000),
          },
          {
            month: "August",
            totalUsers: getRandomGrowth(100000, -3500, 7500),
            activeUsers: getRandomGrowth(77000, -2000, 6500),
          },
          {
            month: "September",
            totalUsers: getRandomGrowth(103000, -3000, 7000),
            activeUsers: getRandomGrowth(78500, -1500, 6000),
          },
          {
            month: "October",
            totalUsers: getRandomGrowth(105000, -5000, 8000),
            activeUsers: getRandomGrowth(80000, -4000, 7000),
          },
          {
            month: "November",
            totalUsers: getRandomGrowth(107000, -4500, 7500),
            activeUsers: getRandomGrowth(81500, -3000, 6500),
          },
          {
            month: "December",
            totalUsers: getRandomGrowth(109000, -4000, 8500),
            activeUsers: getRandomGrowth(83000, -3500, 7000),
          },
        ];
      });

      // Endpoint: GET /api/revenue-distribution
      this.get("/revenue-distribution", () => {
        return [
          { source: "Subscriptions", amount: 300000 },
          { source: "Ads", amount: 200000 },
        ];
      });

      // Endpoint: GET /api/top-songs
      this.get("/top-songs", () => {
        return [
          { songName: "Song A", artist: "Artist A", streamCount: 150000 },
          { songName: "Song B", artist: "Artist B", streamCount: 130000 },
          { songName: "Song C", artist: "Artist C", streamCount: 120000 },
          { songName: "Song D", artist: "Artist D", streamCount: 110000 },
          { songName: "Song E", artist: "Artist E", streamCount: 100000 },
        ];
      });

      // Endpoint: GET /api/recent-streams
      this.get("/recent-streams", () => {
        return [
          {
            songName: "Song A",
            artist: "Artist A",
            dateStreamed: "2024-09-01",
            streamCount: 100,
            userId: "user1",
          },
          {
            songName: "Song B",
            artist: "Artist B",
            dateStreamed: "2024-09-02",
            streamCount: 200,
            userId: "user2",
          },
          {
            songName: "Song C",
            artist: "Artist C",
            dateStreamed: "2024-09-03",
            streamCount: 150,
            userId: "user3",
          },
          {
            songName: "Song D",
            artist: "Artist D",
            dateStreamed: "2024-09-04",
            streamCount: 300,
            userId: "user4",
          },
          {
            songName: "Song E",
            artist: "Artist E",
            dateStreamed: "2024-09-05",
            streamCount: 250,
            userId: "user5",
          },
        ];
      });
    },
  });
}

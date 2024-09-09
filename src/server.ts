import { createServer } from "miragejs";

// for introducing fluctuations (aesthetic reasons)
function getRandom(base: number, minOffset: number, maxOffset: number) {
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
            totalUsers: getRandom(83000, -2000, 5000),
            activeUsers: getRandom(63000, -3000, 4000),
          },
          {
            month: "March",
            totalUsers: getRandom(86000, -4000, 6000),
            activeUsers: getRandom(66000, -3500, 5000),
          },
          {
            month: "April",
            totalUsers: getRandom(89000, -3000, 7000),
            activeUsers: getRandom(69000, -2000, 6000),
          },
          {
            month: "May",
            totalUsers: getRandom(92000, -2500, 6000),
            activeUsers: getRandom(72000, -1500, 5500),
          },
          {
            month: "June",
            totalUsers: getRandom(95000, -5000, 8000),
            activeUsers: getRandom(74000, -3000, 7000),
          },
          {
            month: "July",
            totalUsers: getRandom(98000, -4000, 7000),
            activeUsers: getRandom(75500, -3500, 6000),
          },
          {
            month: "August",
            totalUsers: getRandom(100000, -3500, 7500),
            activeUsers: getRandom(77000, -2000, 6500),
          },
          {
            month: "September",
            totalUsers: getRandom(103000, -3000, 7000),
            activeUsers: getRandom(78500, -1500, 6000),
          },
          {
            month: "October",
            totalUsers: getRandom(105000, -5000, 8000),
            activeUsers: getRandom(80000, -4000, 7000),
          },
          {
            month: "November",
            totalUsers: getRandom(107000, -4500, 7500),
            activeUsers: getRandom(81500, -3000, 6500),
          },
          {
            month: "December",
            totalUsers: getRandom(109000, -4000, 8500),
            activeUsers: getRandom(83000, -3500, 7000),
          },
        ];
      });

      // Endpoint: GET /api/revenue-distribution
      this.get("/revenue-distribution", () => {
        return [
          {
            month: "January",
            subscriptions: 30000,
            ads: 12000,
            inAppPurchases: 8000,
            affiliateMarketing: 4000,
          },
          {
            month: "February",
            subscriptions: getRandom(32000, -2000, 5000),
            ads: getRandom(11500, -1500, 2500),
            inAppPurchases: getRandom(7500, -1000, 2000),
            affiliateMarketing: getRandom(4500, -500, 1500),
          },
          {
            month: "March",
            subscriptions: getRandom(33000, -2500, 6000),
            ads: getRandom(11800, -1700, 2700),
            inAppPurchases: getRandom(7800, -1200, 2200),
            affiliateMarketing: getRandom(4800, -600, 1600),
          },
          {
            month: "April",
            subscriptions: getRandom(35000, -3000, 7000),
            ads: getRandom(12500, -2000, 3000),
            inAppPurchases: getRandom(8100, -1300, 2300),
            affiliateMarketing: getRandom(5000, -700, 1700),
          },
          {
            month: "May",
            subscriptions: getRandom(37000, -3800, 8000),
            ads: getRandom(13000, -2500, 3500),
            inAppPurchases: getRandom(9500, -1500, 2500),
            affiliateMarketing: getRandom(7000, -1100, 1900),
          },
        ];
      });

      // Endpoint: GET /api/top-songs
      this.get("/top-songs", () => {
        return [
          {
            songName: "Song A",
            artist: "Artist A",
            streamCount: getRandom(150000, -10000, 10000),
          },
          {
            songName: "Song B",
            artist: "Artist B",
            streamCount: getRandom(130000, -10000, 10000),
          },
          {
            songName: "Song C",
            artist: "Artist C",
            streamCount: getRandom(120000, -10000, 10000),
          },
          {
            songName: "Song D",
            artist: "Artist D",
            streamCount: getRandom(110000, -10000, 10000),
          },
          {
            songName: "Song E",
            artist: "Artist E",
            streamCount: getRandom(100000, -10000, 10000),
          },
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

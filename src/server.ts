import { createServer } from "miragejs";

// for introducing fluctuations (aesthetic reasons)
function getRandom(base: number, minOffset: number, maxOffset: number) {
  return (
    base + Math.floor(Math.random() * (maxOffset - minOffset + 1) + minOffset)
  );
}

const songs = [
  {
    id: "1",
    artist: "Taylor Swift",
    song: "Cruel Summer",
    date: "2024-09-10",
    streamCount: 1000000,
  },
  {
    id: "2",
    artist: "Drake",
    song: "Hotline Bling",
    date: "2024-09-10",
    streamCount: 2900000,
  },
  {
    id: "3",
    artist: "The Weeknd",
    song: "Blinding Lights",
    date: "2024-09-10",
    streamCount: 4500000,
  },
  {
    id: "4",
    artist: "Billie Eilish",
    song: "Bad Guy",
    date: "2024-09-10",
    streamCount: 3700009,
  },
  {
    id: "5",
    artist: "Post Malone",
    song: "Circles",
    date: "2024-09-09",
    streamCount: 4100000,
  },
  {
    id: "6",
    artist: "Doja Cat",
    song: "Say So",
    date: "2024-09-09",
    streamCount: 260000,
  },
  {
    id: "7",
    artist: "Dua Lipa",
    song: "Levitating",
    date: "2024-09-09",
    streamCount: 390000,
  },
  {
    id: "8",
    artist: "Olivia Rodrigo",
    song: "Vampire",
    date: "2024-09-08",
    streamCount: 420000,
  },
  {
    id: "9",
    artist: "Harry Styles",
    song: "As It Was",
    date: "2024-09-08",
    streamCount: 380000,
  },
  {
    id: "10",
    artist: "Kendrick Lamar",
    song: "Humble",
    date: "2024-09-08",
    streamCount: 340000,
  },
  {
    id: "11",
    artist: "Ariana Grande",
    song: "7 rings",
    date: "2024-09-07",
    streamCount: 360000,
  },
  {
    id: "12",
    artist: "Ed Sheeran",
    song: "Shape of You",
    date: "2024-09-07",
    streamCount: 440000,
  },
  {
    id: "13",
    artist: "Beyoncé",
    song: "Cuff It",
    date: "2024-09-06",
    streamCount: 350000,
  },
  {
    id: "14",
    artist: "Bruno Mars",
    song: "Uptown Funk",
    date: "2024-09-06",
    streamCount: 400000,
  },
  {
    id: "15",
    artist: "Lil Nas X",
    song: "Old Town Road",
    date: "2024-09-05",
    streamCount: 380000,
  },
  {
    id: "16",
    artist: "Miley Cyrus",
    song: "Flowers",
    date: "2024-09-05",
    streamCount: 430000,
  },
  {
    id: "17",
    artist: "Rihanna",
    song: "Diamonds",
    date: "2024-09-04",
    streamCount: 390000,
  },
  {
    id: "18",
    artist: "Justin Bieber",
    song: "Peaches",
    date: "2024-09-04",
    streamCount: 420000,
  },
  {
    id: "19",
    artist: "SZA",
    song: "Kill Bill",
    date: "2024-09-04",
    streamCount: 410000,
  },
  {
    id: "20",
    artist: "Bad Bunny",
    song: "Titi Me Pregunto",
    date: "2024-09-03",
    streamCount: 330000,
  },
  {
    id: "21",
    artist: "Lizzo",
    song: "About Damn Time",
    date: "2024-09-03",
    streamCount: 310000,
  },
  {
    id: "22",
    artist: "Lil Baby",
    song: "Woah",
    date: "2024-09-03",
    streamCount: 290000,
  },
  {
    id: "23",
    artist: "Cardi B",
    song: "Up",
    date: "2024-09-02",
    streamCount: 360000,
  },
  {
    id: "24",
    artist: "Future",
    song: "Mask Off",
    date: "2024-09-02",
    streamCount: 400000,
  },
  {
    id: "25",
    artist: "Kanye West",
    song: "Stronger",
    date: "2024-09-02",
    streamCount: 380000,
  },
  {
    id: "26",
    artist: "J. Cole",
    song: "Middle Child",
    date: "2024-09-01",
    streamCount: 320000,
  },
  {
    id: "27",
    artist: "Eminem",
    song: "Lose Yourself",
    date: "2024-09-01",
    streamCount: 350000,
  },
  {
    id: "28",
    artist: "Travis Scott",
    song: "SICKO MODE",
    date: "2024-09-01",
    streamCount: 410000,
  },
  {
    id: "29",
    artist: "Meghan Thee Stallion",
    song: "Savage",
    date: "2024-08-31",
    streamCount: 390000,
  },
  {
    id: "30",
    artist: "DJ Khaled",
    song: "I'm The One",
    date: "2024-08-31",
    streamCount: 430000,
  },
  {
    id: "31",
    artist: "Shawn Mendes",
    song: "Señorita",
    date: "2024-08-30",
    streamCount: 370000,
  },
  {
    id: "32",
    artist: "Khalid",
    song: "Talk",
    date: "2024-08-30",
    streamCount: 310000,
  },
  {
    id: "33",
    artist: "BTS",
    song: "Dynamite",
    date: "2024-08-29",
    streamCount: 450000,
  },
  {
    id: "34",
    artist: "Halsey",
    song: "Without Me",
    date: "2024-08-29",
    streamCount: 420000,
  },
  {
    id: "35",
    artist: "Imagine Dragons",
    song: "Believer",
    date: "2024-08-29",
    streamCount: 340000,
  },
  {
    id: "36",
    artist: "Maroon 5",
    song: "Sugar",
    date: "2024-08-28",
    streamCount: 300000,
  },
  {
    id: "37",
    artist: "Selena Gomez",
    song: "Lose You To Love Me",
    date: "2024-08-28",
    streamCount: 380000,
  },
  {
    id: "38",
    artist: "Coldplay",
    song: "Yellow",
    date: "2024-08-28",
    streamCount: 410000,
  },
  {
    id: "39",
    artist: "Shakira",
    song: "Hips Don't Lie",
    date: "2024-08-27",
    streamCount: 430000,
  },
  {
    id: "40",
    artist: "Adele",
    song: "Easy On Me",
    date: "2024-08-27",
    streamCount: 390000,
  },
];

export default function initMockServer() {
  createServer({
    routes() {
      this.namespace = "api";

      // Endpoint: GET /api/metrics
      this.get("/metrics", () => {
        return {
          totalUsers: 1200000,
          activeUsers: 900000,
          totalStreams: songs.reduce(
            (total, song) => song.streamCount + total,
            0
          ),
          revenue: 99999999,
          topArtist: "The Weeknd",
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
        return songs.sort((a, b) => b.streamCount - a.streamCount).slice(0, 5);
      });

      // Endpoint: GET /api/recent-streams
      this.get("/recent-streams", () => {
        return songs;
      });
    },
  });
}

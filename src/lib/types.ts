export type Metrics = {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
};

export type UserGrowthData = {
  month: string;
  totalUsers: number;
  activeUsers: number;
};

export type RevenueData = {
  month: string;
  subscriptions: number;
  ads: number;
  inAppPurchases: number;
  affiliateMarketing: number;
  totalRevenue: number;
};

export type Song = {
  id: number;
  title: string;
  artist: string;
  streams: number;
};

export type StreamData = {
  id: string;
  artist: string;
  song: string;
  date: string;
  streamCount: number;
};

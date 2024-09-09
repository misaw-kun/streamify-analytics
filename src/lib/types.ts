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

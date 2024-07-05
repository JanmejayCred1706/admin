export type orderTypeAllowed =
  | 'childCode'
  | 'retailerName'
  | 'planSold'
  | 'premium'
  | 'commission'
  | 'createdAt';
export interface ActiveRetailersColumnKeys {
  childCode: keyof ActiveRetailersDataItem;
  retailerName: keyof ActiveRetailersDataItem;
  planSold: keyof ActiveRetailersDataItem;
  premium: keyof ActiveRetailersDataItem;
  commission: keyof ActiveRetailersDataItem;
  createdAt: keyof ActiveRetailersDataItem;
}
export interface ActiveRetailersDataItem {
  key: string;
  name: string;
}

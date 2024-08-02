export type orderTypeAllowed =
  | 'dealerShipName'
  | 'email'
  | 'mobile'
  | 'childCode'
  | 'storeName'
  | 'createdAt';
export interface franchiseRetailersColumnKeys {
  dealerShipName: keyof franchiseRetailersDataItem;
  email: keyof franchiseRetailersDataItem;
  mobile: keyof franchiseRetailersDataItem;
  childCode: keyof franchiseRetailersDataItem;
  storeName: keyof franchiseRetailersDataItem;
  createdAt: keyof franchiseRetailersDataItem;
}
export interface franchiseRetailersDataItem {
  key: string;
  name: string;
}

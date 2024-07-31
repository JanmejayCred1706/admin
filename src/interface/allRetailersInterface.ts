export type orderTypeAllowed =
  | 'dealerShipName'
  | 'email'
  | 'mobile'
  | 'ownershipType'
  | 'childCode'
  | 'storeName'
  | 'wallet'
  | 'createdAt'
  | 'action';
export interface AllRetailersColumnKeys {
  dealerShipName: keyof AllRetailersDataItem;
  email: keyof AllRetailersDataItem;
  mobile: keyof AllRetailersDataItem;
  ownershipType: keyof AllRetailersDataItem;
  childCode: keyof AllRetailersDataItem;
  storeName: keyof AllRetailersDataItem;
  wallet: keyof AllRetailersDataItem;
  createdAt: keyof AllRetailersDataItem;
  action: keyof AllRetailersDataItem;
}
export interface AllRetailersDataItem {
  key: string;
  name: string;
}

export type orderTypeAllowed =
  | 'childCode'
  | 'retailerName'
  | 'planSold'
  | 'premium'
  | 'commission'
  | 'createdAt'
  | 'action';
export interface ActiveRetailersColumnKeys {
  childCode: keyof ActiveRetailersDataItem;
  retailerName: keyof ActiveRetailersDataItem;
  planSold: keyof ActiveRetailersDataItem;
  premium: keyof ActiveRetailersDataItem;
  commission: keyof ActiveRetailersDataItem;
  createdAt: keyof ActiveRetailersDataItem;
  action: keyof ActiveRetailersDataItem;
}
export interface ActiveRetailersDataItem {
  key: string;
  name: string;
}

export type RetailerActionBtnInterface = {
  handleDocument?: () => void;
  handleInactive?: () => void;
  handleResetPassword?: (data: any) => void;
  data: any;
  // data: ActiveRetailersColumnKeys;
};

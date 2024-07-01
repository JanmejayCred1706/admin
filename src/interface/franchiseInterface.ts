export type orderTypeAllowed =
  | 'name'
  | 'email'
  | 'mobileNumber'
  | 'walletBalance'
  | 'dealerCount'
  | 'totalPremium'
  | 'totalCommission'
  | 'action';
export interface FranchiseColumnKeys {
  name: keyof FranchiseDataItem;
  email: keyof FranchiseDataItem;
  mobileNumber: keyof FranchiseDataItem;
  walletBalance: keyof FranchiseDataItem;
  dealerCount: keyof FranchiseDataItem;
  totalPremium: keyof FranchiseDataItem;
  totalCommission: keyof FranchiseDataItem;
  action: keyof FranchiseDataItem;
}
export interface FranchiseDataItem {
  key: string;
  name: string;
}

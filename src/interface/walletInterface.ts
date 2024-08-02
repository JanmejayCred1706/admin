export type orderTypeAllowed =
  | 'createdAt'
  | 'previousBalance'
  | 'amount'
  | 'currentAmount'
  | 'description';
export interface WalletColumnKeys {
  createdAt: keyof WalletDataItem;
  previousBalance: keyof WalletDataItem;
  amount: keyof WalletDataItem;
  currentAmount: keyof WalletDataItem;
  description: keyof WalletDataItem;
}
export interface WalletDataItem {
  key: string;
  name: string;
}

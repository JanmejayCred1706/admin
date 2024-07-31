export type orderTypeAllowed =
  | 'refId'
  | 'name'
  | 'mobile'
  | 'email'
  | 'state'
  | 'city'
  | 'totalClaims'
  | 'claimedAmount'
  | 'action';
export interface ColumnKeysServiceCenter {
  refId: keyof DataItemServiceCenter;
  name: keyof DataItemServiceCenter;
  mobile: keyof DataItemServiceCenter;
  email: keyof DataItemServiceCenter;
  state: keyof DataItemServiceCenter;
  city: keyof DataItemServiceCenter;
  totalClaims: keyof DataItemServiceCenter;
  claimedAmount: keyof DataItemServiceCenter;
  action: keyof DataItemServiceCenter;
}
export interface DataItemServiceCenter {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

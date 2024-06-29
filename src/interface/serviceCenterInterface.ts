export interface ColumnKeysServiceCenter {
  refId: keyof DataItemServiceCenter;
  name: keyof DataItemServiceCenter;
  mobile: keyof DataItemServiceCenter;
  email: keyof DataItemServiceCenter;
  premium: keyof DataItemServiceCenter;
  commission: keyof DataItemServiceCenter;
  vivoMargin: keyof DataItemServiceCenter;
  stateMargin: keyof DataItemServiceCenter;
  garantieMargin: keyof DataItemServiceCenter;
  retailersType: keyof DataItemServiceCenter;
  retailersCode: keyof DataItemServiceCenter;
  childCode: keyof DataItemServiceCenter;
  promoterId: keyof DataItemServiceCenter;
  startDate: keyof DataItemServiceCenter;
  endDate: keyof DataItemServiceCenter;
  planPurchaseDate: keyof DataItemServiceCenter;
}
export interface DataItemServiceCenter {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

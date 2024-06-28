export interface ColumnKeys {
  refId: keyof DataItem;
  customerName: keyof DataItem;
  plan: keyof DataItem;
  planNo: keyof DataItem;
  premium: keyof DataItem;
  commission: keyof DataItem;
  vivoMargin: keyof DataItem;
  stateMargin: keyof DataItem;
  garantieMargin: keyof DataItem;
  retailersType: keyof DataItem;
  retailersCode: keyof DataItem;
  childCode: keyof DataItem;
  promoterId: keyof DataItem;
  startDate: keyof DataItem;
  endDate: keyof DataItem;
  planPurchaseDate: keyof DataItem;
}
export interface DataItem {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

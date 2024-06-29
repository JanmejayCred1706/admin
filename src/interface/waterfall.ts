export type orderTypeAllowed =
  | 'orderId'
  | 'tradeName'
  | 'retailersAddress'
  | 'gstIn'
  | 'state'
  | 'location'
  | 'pinCode'
  | 'planPurchaseDate'
  | 'billingPeriod'
  | 'plan'
  | 'modelName'
  | 'priceRange'
  | 'retailerCost';
export interface WaterfallReportColumnKeys {
  orderId: keyof WaterfallReportDataItem;
  tradeName: keyof WaterfallReportDataItem;
  retailersAddress: keyof WaterfallReportDataItem;
  gstIn: keyof WaterfallReportDataItem;
  state: keyof WaterfallReportDataItem;
  location: keyof WaterfallReportDataItem;
  pinCode: keyof WaterfallReportDataItem;
  planPurchaseDate: keyof WaterfallReportDataItem;
  billingPeriod: keyof WaterfallReportDataItem;
  plan: keyof WaterfallReportDataItem;
  modelName: keyof WaterfallReportDataItem;
  priceRange: keyof WaterfallReportDataItem;
  retailerCost: keyof WaterfallReportDataItem;
}
export interface WaterfallReportDataItem {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

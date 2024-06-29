export type orderTypeAllowed =
  | 'childCode'
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
export interface BillingReportColumnKeys {
  childCode: keyof BillingReportDataItem;
  tradeName: keyof BillingReportDataItem;
  retailersAddress: keyof BillingReportDataItem;
  gstIn: keyof BillingReportDataItem;
  state: keyof BillingReportDataItem;
  location: keyof BillingReportDataItem;
  pinCode: keyof BillingReportDataItem;
  planPurchaseDate: keyof BillingReportDataItem;
  billingPeriod: keyof BillingReportDataItem;
  plan: keyof BillingReportDataItem;
  modelName: keyof BillingReportDataItem;
  priceRange: keyof BillingReportDataItem;
  retailerCost: keyof BillingReportDataItem;
}
export interface BillingReportDataItem {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

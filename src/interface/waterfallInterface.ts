export type orderTypeAllowed =
  | 'orderId'
  | 'retailerName'
  | 'customerName'
  | 'orderStatus'
  | 'purchaseDate'
  | 'modelName'
  | 'productType';
export interface WaterfallReportColumnKeys {
  orderId: keyof WaterfallReportDataItem;
  retailerName: keyof WaterfallReportDataItem;
  customerName: keyof WaterfallReportDataItem;
  orderStatus: keyof WaterfallReportDataItem;
  purchaseDate: keyof WaterfallReportDataItem;
  modelName: keyof WaterfallReportDataItem;
  productType: keyof WaterfallReportDataItem;
}
export interface WaterfallReportDataItem {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

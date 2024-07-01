export type orderTypeAllowed =
  | 'id'
  | 'acknowledgementNo'
  | 'irn'
  | 'createdAt'
  | 'action';
export interface InvoiceColumnKeys {
  id: keyof InvoiceDataItem;
  acknowledgementNo: keyof InvoiceDataItem;
  irn: keyof InvoiceDataItem;
  createdAt: keyof InvoiceDataItem;
  action: keyof InvoiceDataItem;
}
export interface InvoiceDataItem {
  key: string;
  refId: number;
  name: string;
}

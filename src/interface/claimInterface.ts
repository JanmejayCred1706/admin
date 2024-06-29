import { chipColors } from '@functions/globalFn';

export interface ClaimsColumnKeys {
  refId: keyof ClaimsDataItem;
  jobSheetNo: keyof ClaimsDataItem;
  serviceCenterName: keyof ClaimsDataItem;
  customerName: keyof ClaimsDataItem;
  plan: keyof ClaimsDataItem;
  claimedAmount: keyof ClaimsDataItem;
  approvedAmount: keyof ClaimsDataItem;
  status: keyof ClaimsDataItem;
}
export interface ClaimsDataItem {
  key: string;
  refId: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
  status: keyof typeof chipColors;
}

export type orderTypeAllowed =
  | 'refId'
  | 'jobSheetNo'
  | 'serviceCenterName'
  | 'customerName'
  | 'plan'
  | 'claimedAmount'
  | 'approvedAmount'
  | 'status';

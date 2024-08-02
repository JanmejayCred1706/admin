export interface PageDataProps {
  startPage: number;
  current: number;
  limit: number;
}
export interface DateFilterProps {
  startDate: string;
  endDate: string;
}
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    title: string,
    msg?: string
  ) => void;
  contextHolder: React.ReactNode;
}
export type pageKeyInterfaceProps =
  | 'dashboard'
  | 'analytics'
  | 'allPlans'
  | 'cancelPlans'
  | 'allRetailers'
  | 'activeRetailers'
  | 'allServiceCenter'
  | 'allClaims'
  | 'billingReport'
  | 'waterfallReport'
  | 'franchise'
  | 'invoice'; 
export type InputDateProps = string | number | Date;
export type TopCardInterface = {
  // id: number;
  count: number;
  title: string;
  link?: string;
};

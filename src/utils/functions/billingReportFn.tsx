import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  BillingReportColumnKeys,
  BillingReportDataItem,
} from '@interface/billingReport';
import { ColumnsType } from 'antd/es/table';

export const billingReportListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<BillingReportDataItem> = [
    {
      title: 'Child Code',
      dataIndex: 'childCode',
      key: 'childCode',
      //   render: (text) =>
      //   <a>
      //     {text}
      //     </a>,
    },
    { title: 'Trade Name', dataIndex: 'tradeName', key: 'tradeName' },
    {
      title: 'Retailers Address',
      dataIndex: 'retailersAddress',
      key: 'retailersAddress',
    },
    { title: 'Gstin', dataIndex: 'gstIn', key: 'gstIn' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Pin Code', dataIndex: 'pinCode', key: 'pinCode' },
    {
      title: 'Plan Purchase Date',
      dataIndex: 'planPurchaseDate',
      key: 'planPurchaseDate',
    },
    {
      title: 'Billing Period',
      dataIndex: 'billingPeriod',
      key: 'billingPeriod',
    },
    { title: 'Plan', dataIndex: 'plan', key: 'plan' },
    { title: 'Model Name', dataIndex: 'modelName', key: 'modelName' },
    {
      title: 'Product Price Range',
      dataIndex: 'priceRange',
      key: 'priceRange',
    },
    {
      title: 'Cost to Retailer',
      dataIndex: 'retailerCost',
      key: 'retailerCost',
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        childCode: cur.child_code,
        tradeName: cur.trade_name,
        retailersAddress: cur.dealer_address,
        gstIn: cur.GSTIN,
        state: cur.state,
        location: cur.location,
        pinCode: cur.pincode,
        planPurchaseDate: cur.plan_purchase_date,
        billingPeriod: cur.billing_period,
        plan: cur.product_type,
        modelName: cur.mobile_model_name,
        priceRange: cur.price_range,
        retailerCost: formatCurrency(cur.cost_to_dealer),
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof BillingReportColumnKeys)[] => {
  let order: (keyof BillingReportColumnKeys)[] = [
    'childCode',
    'tradeName',
    'retailersAddress',
    'gstIn',
    'state',
    'location',
    'pinCode',
    'planPurchaseDate',
    'billingPeriod',
    'plan',
    'modelName',
    'priceRange',
    'retailerCost',
  ];

  return order;
};

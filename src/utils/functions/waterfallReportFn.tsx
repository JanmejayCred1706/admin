import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  WaterfallReportColumnKeys,
  WaterfallReportDataItem,
} from '@interface/waterfall';
import { ColumnsType } from 'antd/es/table';

export const waterfallReportListingData = (
  listingData: any,
  keys: string[]
) => {
  const defColumns: ColumnsType<WaterfallReportDataItem> = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      //   render: (text) =>
      //   <a>
      //     {text}
      //     </a>,
    },
    { title: 'Retailer Name', dataIndex: 'retailerName', key: 'retailerName' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Order Status', dataIndex: 'orderStatus', key: 'orderStatus' },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
    {
      title: 'Phone Model Name',
      dataIndex: 'modelName',
      key: 'modelName',
    },
    { title: 'Product Type', dataIndex: 'productType', key: 'productType' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Pin Code', dataIndex: 'pinCode', key: 'pinCode' },
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
        orderId: cur.order_id,
        retailerName: cur.dealer_name,
        customerName: cur.customer_name,
        orderStatus: cur.order_status,
        purchaseDate: cur.purchase_date,
        modelName: cur.phone_model_name,
        productType: cur.product_id,
        pinCode: cur.pincode,
        billingPeriod: cur.billing_period,
        plan: cur.product_type,
        priceRange: cur.price_range,
        retailerCost: formatCurrency(cur.cost_to_dealer),
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof WaterfallReportColumnKeys)[] => {
  let order: (keyof WaterfallReportColumnKeys)[] = [
    'orderId',
    'retailerName',
    'customerName',
    'orderStatus',
    'purchaseDate',
    'modelName',
    'productType',
    'pinCode',
    'billingPeriod',
    'plan',
    'priceRange',
    'retailerCost',
  ];

  return order;
};

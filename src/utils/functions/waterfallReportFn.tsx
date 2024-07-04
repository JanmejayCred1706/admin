import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  WaterfallReportColumnKeys,
  WaterfallReportDataItem,
} from '@interface/waterfallInterface';
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
  ];

  return order;
};

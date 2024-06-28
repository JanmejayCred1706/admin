import { formatCurrency, modifyListingData } from '@functions/globalFn';
import { ColumnKeys, DataItem } from '@interface/allPlansInterface';
import { ColumnsType } from 'antd/lib/table';

// Define the interface for the objects in the array
interface MyObject {
  id: number;
  name: string;
  // Add other properties as needed
}

// Define the interface for the function parameter
interface MyObjectArray {
  data: MyObject[];
}

export const planListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<DataItem> = [
    {
      title: 'Ref Id',
      dataIndex: 'refId',
      key: 'refId',
      render: (text) => <a>{text}</a>,
    },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Plan', dataIndex: 'plan', key: 'plan' },
    { title: 'Plan Number', dataIndex: 'planNo', key: 'planNo' },
    { title: 'Premium', dataIndex: 'premium', key: 'premium' },
    {
      title: 'Retailer Commission',
      dataIndex: 'commission',
      key: 'commission',
    },
    { title: 'Vivo Margin', dataIndex: 'vivoMargin', key: 'vivoMargin' },
    { title: 'State Margin', dataIndex: 'stateMargin', key: 'stateMargin' },
    {
      title: 'Garantie Margin',
      dataIndex: 'garantieMargin',
      key: 'garantieMargin',
    },
    {
      title: 'Retailers Type',
      dataIndex: 'retailersType',
      key: 'retailersType',
    },
    {
      title: 'Retailers Code',
      dataIndex: 'retailersCode',
      key: 'retailersCode',
    },
    { title: 'Child Code', dataIndex: 'childCode', key: 'childCode' },
    { title: 'Promoter Id', dataIndex: 'promoterId', key: 'promoterId' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    {
      title: 'Plan Purchase Date',
      dataIndex: 'planPurchaseDate',
      key: 'planPurchaseDate',
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        refId: cur.id,
        customerName: cur.name,
        plan: cur.product_name,
        planNo: cur.policy_number,
        premium: formatCurrency(cur.premium),
        commission: formatCurrency(cur.commission),
        vivoMargin: formatCurrency(cur.oem_commission_part),
        stateMargin: formatCurrency(cur.state_commission_part),
        garantieMargin: formatCurrency(cur.garantie_commission),
        retailersType: '',
        retailersCode: cur.code,
        childCode: cur.store_code,
        promoterId: cur.promoter_id,
        startDate: '',
        endDate: '',
        planPurchaseDate: '',
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof ColumnKeys)[] => {
  let order: (keyof ColumnKeys)[] = [
    'refId',
    'customerName',
    'plan',
    'planNo',
    'premium',
    'commission',
    'vivoMargin',
    'stateMargin',
    'garantieMargin',
    'retailersType',
    'retailersCode',
    'childCode',
    'promoterId',
    'startDate',
    'endDate',
    'planPurchaseDate',
  ];

  return order;
};

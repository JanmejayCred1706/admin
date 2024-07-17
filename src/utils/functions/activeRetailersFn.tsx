import RetailerActionBtn from '@components/ui/RetailerActionBtn';
import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  ActiveRetailersColumnKeys,
  ActiveRetailersDataItem,
} from '@interface/activeRetailersInterface';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const activeRetailersListingData = (
  listingData: any,
  keys: string[],
  handleDocument?: () => void,
  handleInactive?: () => void,
  handleResetPassword?: () => void
) => {
  const defColumns: ColumnsType<ActiveRetailersDataItem> = [
    {
      title: 'Child Code',
      dataIndex: 'childCode',
      key: 'childCode',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Retailer Name',
      dataIndex: 'retailerName',
      key: 'retailerName',
    },
    { title: 'Plan Sold', dataIndex: 'planSold', key: 'planSold' },
    { title: 'Premium', dataIndex: 'premium', key: 'premium' },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
    },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, data) => (
        <RetailerActionBtn
          {...{ handleDocument, handleInactive, handleResetPassword, data }}
        />
      ),
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        childCode: cur.store_code,
        retailerName: cur.dealership_name,
        planSold: cur.total_sales,
        premium: formatCurrency(cur.total_premium),
        commission: formatCurrency(cur.commission),
        createdAt: cur.created_at,
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof ActiveRetailersColumnKeys)[] => {
  let order: (keyof ActiveRetailersColumnKeys)[] = [
    'childCode',
    'retailerName',
    'planSold',
    'premium',
    'commission',
    'createdAt',
    'action',
  ];

  return order;
};

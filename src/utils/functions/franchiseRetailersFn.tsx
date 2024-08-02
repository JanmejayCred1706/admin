import RetailerActionBtn from '@components/ui/RetailerActionBtn';
import { modifyListingData } from '@functions/globalFn';
import {
  AllRetailersColumnKeys,
  AllRetailersDataItem,
} from '@interface/allRetailersInterface';
import {
  franchiseRetailersColumnKeys,
  franchiseRetailersDataItem,
} from '@interface/franchiseRetailersInterface';
import { ColumnsType } from 'antd/es/table';

export const franchiseRetailersListingData = (
  listingData: any,
  keys: string[]
) => {
  const defColumns: ColumnsType<franchiseRetailersDataItem> = [
    {
      title: 'Dealership Name',
      dataIndex: 'dealerShipName',
      key: 'dealerShipName',
      render: (text) => <a>{text}</a>,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Mobile Number', dataIndex: 'mobile', key: 'mobile' },
    { title: 'Child Code', dataIndex: 'childCode', key: 'childCode' },
    { title: 'Store Name', dataIndex: 'storeName', key: 'storeName' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        dealerShipName: cur.dealership_name,
        email: cur.email,
        mobile: cur.mobile,
        childCode: cur.child_code,
        storeName: cur.store_name,
        createdAt: cur.created_at,
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof franchiseRetailersColumnKeys)[] => {
  let order: (keyof franchiseRetailersColumnKeys)[] = [
    'dealerShipName',
    'email',
    'mobile',
    'childCode',
    'storeName',
    'createdAt',
  ];

  return order;
};

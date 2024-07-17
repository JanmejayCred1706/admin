import RetailerActionBtn from '@components/ui/RetailerActionBtn';
import { modifyListingData } from '@functions/globalFn';
import {
  AllRetailersColumnKeys,
  AllRetailersDataItem,
} from '@interface/allRetailersInterface';
import { ColumnsType } from 'antd/es/table';

export const allRetailersListingData = (
  listingData: any,
  keys: string[],
  handleDocument?: () => void,
  handleInactive?: () => void,
  handleResetPassword?: () => void
) => {
  const defColumns: ColumnsType<AllRetailersDataItem> = [
    {
      title: 'Dealership Name',
      dataIndex: 'dealerShipName',
      key: 'dealerShipName',
      render: (text) => <a>{text}</a>,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Child Code', dataIndex: 'childCode', key: 'childCode' },
    { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
    {
      title: 'Ownership Type',
      dataIndex: 'ownershipType',
      key: 'ownershipType',
    },
    { title: 'Store Name', dataIndex: 'storeName', key: 'storeName' },
    { title: 'Total Claims', dataIndex: 'totalClaims', key: 'totalClaims' },
    { title: 'Wallet', dataIndex: 'wallet', key: 'wallet' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
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
        dealerShipName: cur.dealership_name,
        email: cur.email,
        mobile: cur.mobile,
        ownershipType: cur.ownership_type,
        childCode: cur.store_code,
        storeName: cur.store_name,
        wallet: '',
        createdAt: cur.created_at,
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof AllRetailersColumnKeys)[] => {
  let order: (keyof AllRetailersColumnKeys)[] = [
    'dealerShipName',
    'email',
    'mobile',
    'ownershipType',
    'childCode',
    'storeName',
    'wallet',
    'createdAt',
    'action',
  ];

  return order;
};

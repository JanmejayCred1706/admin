import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  ColumnKeysServiceCenter,
  DataItemServiceCenter,
} from '@interface/serviceCenterInterface';
import { ColumnsType } from 'antd/es/table';

export const serviceCenterListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<DataItemServiceCenter> = [
    {
      title: 'Ref Id',
      dataIndex: 'refId',
      key: 'refId',
      render: (text) => <a>{text}</a>,
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Total Claims', dataIndex: 'totalClaims', key: 'totalClaims' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    {
      title: 'Claimed Amount',
      dataIndex: 'claimedAmount',
      key: 'claimedAmount',
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        refId: cur.id,
        name: cur.name,
        mobile: cur.mobile,
        email: cur.email,
        state: cur.state,
        city: cur.city,
        totalClaims: cur.total_claims,
        claimedAmount: formatCurrency(cur.total_claimed_amount),
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof ColumnKeysServiceCenter)[] => {
  let order: (keyof ColumnKeysServiceCenter)[] = [
    'refId',
    'name',
    'mobile',
    'email',
    'state',
    'city',
    'totalClaims',
    'claimedAmount',
  ];

  return order;
};

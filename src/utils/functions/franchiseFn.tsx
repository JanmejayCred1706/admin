import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  FranchiseColumnKeys,
  FranchiseDataItem,
} from '@interface/franchiseInterface';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';

export const franchiseListingData = (
  listingData: any,
  keys: string[],
  handleAddMoney: (id: string) => void
) => {
  const router = useRouter();
  const handleRedirection = (id: string) => {
    router.push(`/admin/retailers/franchise-retailers?id=${id}`);
  };

  const defColumns: ColumnsType<FranchiseDataItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Wallet Balance',
      dataIndex: 'walletBalance',
      key: 'walletBalance',
    },
    { title: 'Dealer Count', dataIndex: 'dealerCount', key: 'dealerCount' },
    { title: 'Total Premium', dataIndex: 'totalPremium', key: 'totalPremium' },
    {
      title: 'Total Commission',
      dataIndex: 'totalCommission',
      key: 'totalCommission',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => console.log(record, 'data')}>
            Add Money
          </Button>
          <Button type="primary" onClick={() => handleRedirection(record.key)}>
            View Retailers
          </Button>
        </Space>
      ),
    },
  ];

  const defData =
    listingData?.length > 1
      ? listingData.map((cur: any, i: number) => ({
          key: cur.id,
          name: cur.name,
          email: cur.email,
          mobileNumber: cur.mobile_number,
          walletBalance: formatCurrency(cur.wallet_balance),
          dealerCount: cur.dealer_count,
          totalPremium: formatCurrency(cur.total_premium),
          totalCommission: formatCurrency(cur.total_commission),
        }))
      : [];
  console.log(defData, 'data');
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  console.log(data, 'data');
  return { columns, data };
};

export const sequenceFn = (): (keyof FranchiseColumnKeys)[] => {
  let order: (keyof FranchiseColumnKeys)[] = [
    'name',
    'email',
    'mobileNumber',
    'walletBalance',
    'dealerCount',
    'totalPremium',
    'totalCommission',
    'action',
  ];

  return order;
};

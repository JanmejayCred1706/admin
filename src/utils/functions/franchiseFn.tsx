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
  handleAddMoney: () => void
) => {
  const router = useRouter();
  const handleRedirection = (id: string) => {
    console.log(id, 'id');
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
      render: (_, data) => (
        <Space>
          <Button type="primary" onClick={handleAddMoney}>
            Add Money
          </Button>
          <Button type="primary" onClick={() => handleRedirection(data.key)}>
            View Retailers
          </Button>
        </Space>
      ),
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        name: cur.name,
        email: cur.email,
        mobileNumber: cur.mobile_number,
        walletBalance: formatCurrency(cur.wallet_balance),
        dealerCount: cur.dealer_count,
        totalPremium: formatCurrency(cur.total_premium),
        totalCommission: formatCurrency(cur.total_commission),
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
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

import { formatCurrency, modifyListingData } from '@functions/globalFn';
import { WalletColumnKeys, WalletDataItem } from '@interface/walletInterface';
import { ColumnsType } from 'antd/es/table';

export const walletListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<WalletDataItem> = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Previous Balance',
      dataIndex: 'previousBalance',
      key: 'previousBalance',
    },
    {
      title: 'Amount (Credit/Debit)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Current Amount',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  const defData =
    listingData?.length > 1
      ? listingData.map((cur: any, i: number) => ({
          key: cur.id,
          createdAt: cur.created_at,
          previousBalance: formatCurrency(cur.previous_balance),
          amount: formatCurrency(cur.amount),
          currentAmount: formatCurrency(cur.current_balance),
          description: cur.description,
        }))
      : [];
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof WalletColumnKeys)[] => {
  let order: (keyof WalletColumnKeys)[] = [
    'createdAt',
    'previousBalance',
    'amount',
    'currentAmount',
    'description',
  ];

  return order;
};

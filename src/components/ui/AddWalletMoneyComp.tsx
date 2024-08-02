import AddFundModal from '@components/ui/AddFundModal';
import ModalComp from '@core/ModalComp';
import { formatCurrency } from '@functions/globalFn';
import useGetRequest from '@hooks/useGetRequest';
import { useAppStore } from '@utils/Store';
import { Button, Card } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { FC, useEffect, useMemo } from 'react';

interface AddWalletMoneyCompProps {}

const AddWalletMoneyComp: FC<AddWalletMoneyCompProps> = () => {
  const { setModelOpen } = useAppStore();
  const params = useMemo(() => ({}), []);

  const {
    data: balanceData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('franchise/balance', params, {}, [params]);
  useEffect(() => {
    refetch();
  }, [params, refetch]);
  let amountCount = balanceData?.data?.data?.wallet_balance;
  return (
    <>
      <ModalComp component={<AddFundModal />} />
      <div className="flex gap-4 items-end">
        <div className="w-80 bg-priBlue text-priWhite p-8 rounded-2xl">
          <p className="text-2xl mb-1">Wallet Balance</p>
          <Title level={2} style={{ color: '#fff' }}>
            {formatCurrency(amountCount)}
          </Title>
        </div>
        <Button type="primary" onClick={() => setModelOpen(true)}>
          Add Fund
        </Button>
      </div>
    </>
  );
};

export default React.memo(AddWalletMoneyComp);

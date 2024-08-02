'use client';
import DataTable from '@components/core/DataTable';
import MixedHeadContent from '@components/core/MixedHeadContent';
import ModalComp from '@components/core/ModalComp';
import { sequenceFn, walletListingData } from '@functions/walletFn';
import useGetRequest from '@hooks/useGetRequest';
import { PageDataProps } from '@interface/globalInterface';
import { orderTypeAllowed } from '@interface/walletInterface';
import { useAppStore } from '@utils/Store';
import React, { useEffect, useMemo, useState } from 'react';

const page = () => {
  const { currentState, dateFilters, setModelOpen } = useAppStore();
  const [selectedId, setSelectedId] = useState('');
  const [pageData, setPageData] = useState<PageDataProps>({
    startPage: 1,
    current: 1,
    limit: 25,
  });

  const params = useMemo(
    () => ({
      page: pageData.current - 1,
      state_id: currentState,
    }),
    [pageData, currentState]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('franchise/transactions', params, {}, [params]);

  let count: number = listingData?.data?.total_count || 0;
  let order: orderTypeAllowed[] = sequenceFn();
  const { data: rawData, columns } = walletListingData(
    listingData?.data?.data || [],
    order
  );
  const data = rawData || [];
  useEffect(() => {
    refetch();
  }, [params, refetch]);
  return (
    <>
      <MixedHeadContent
        titleHeader="Wallet"
        searchPlaceHolder="Search"
        exportUrl="franchise/transactions"
        // exportPayload={params}
        moduleKey="wallet"
      />
      <DataTable
        {...{
          columns,
          data,
          count,
          pageData,
          setPageData,
        }}
      />
    </>
  );
};

export default page;

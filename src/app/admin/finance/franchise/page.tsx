'use client';
import { DataTable, MixedHeadContent, ModalComp } from '@components/Component';

import { franchiseListingData, sequenceFn } from '@functions/franchiseFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/franchiseInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import { Button } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

interface pageProps {}

const Franchise: React.FC<pageProps> = ({}) => {
  const { currentState, dateFilters, setModelOpen } = useAppStore();
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
  } = useGetRequest('franchise/list', params, {}, [params]);

  let count: number = listingData?.data?.total_count || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const handleAddMoney = () => {
    setModelOpen(true);
  };
  const { data: rawData, columns } = franchiseListingData(
    listingData?.data?.data || [],
    order,
    handleAddMoney
  );

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <ModalComp
        component={
          <>
            <Button onClick={() => setModelOpen(false)}>close</Button>
          </>
        }
      />
      <MixedHeadContent
        titleHeader="Franchise"
        searchPlaceHolder="Search"
        exportUrl="franchise/list"
        exportPayload={params}
        moduleKey="franchise"
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

export default Franchise;

'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import ModalComp from '@core/ModalComp';
import { franchiseListingData, sequenceFn } from '@functions/franchiseFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/franchiseInterface';
import { PageDataProps } from '@interface/globalInterface';
import AddMoney from '@ui/AddMoney';
import { useAppStore } from '@utils/Store';
import React, { useEffect, useMemo, useState } from 'react';

interface pageProps {}

const Franchise: React.FC<pageProps> = ({}) => {
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
      status: 'inactive',
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
  console.log(selectedId, 'setSelectedId');
  const handleAddMoney = (id: string) => {
    setModelOpen(true);
    setSelectedId(id);
  };
  const { data: rawData, columns } = franchiseListingData(
    listingData?.data?.data || [],
    order,
    handleAddMoney
  );
  console.log(rawData, columns, 'data');

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <ModalComp component={<AddMoney {...{ selectedId }} />} />
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

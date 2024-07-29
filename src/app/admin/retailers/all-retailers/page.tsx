'use client';
import DataTable from '@components/core/DataTable';
import MixedHeadContent from '@components/core/MixedHeadContent';
import { allRetailersListingData, sequenceFn } from '@functions/allRetailersFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/allRetailersInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo, useState } from 'react';

type Props = {};

const AllRetailers = (props: Props) => {
  const {
    currentState,
    dateFilters: { allRetailers },
  } = useAppStore();
  const [pageData, setPageData] = useState<PageDataProps>({
    startPage: 1,
    current: 1,
    limit: 25,
  });

  const params = useMemo(
    () => ({
      page: pageData.current - 1,
      state_id: currentState,
      date: 'custom',
      ...allRetailers,
    }),
    [pageData, currentState]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('partners/retailers', params, {}, [params]);

  let count: number = listingData?.data?.totalCount || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = allRetailersListingData(
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
        titleHeader="All Retailers"
        searchPlaceHolder="Search"
        exportUrl="partners/retailers"
        exportPayload={params}
        moduleKey="allRetailers"
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

export default AllRetailers;

'use client';
import {
  DataTable,
  MixedHeadContent,
  withOutLogin,
} from '@components/Component';
import { planListingData, sequenceFn } from '@functions/planFn';
import { orderTypeAllowed } from '@interface/allPlansInterface';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo, useState } from 'react';
import useGetRequest from 'src/hooks/useGetRequest';
import { PageDataProps } from 'src/interface/globalInterface';

const AllPlans = () => {
  const { currentState, dateFilters } = useAppStore();
  console.log(dateFilters, 'dateFilters');
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
  } = useGetRequest('v2/orders', params, {}, [params]);

  console.log(listingData, '>>>');

  let count: number = listingData?.data?.total_count || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = planListingData(
    listingData?.data?.policies || [],
    order
  );

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <MixedHeadContent
        titleHeader="All Plans"
        searchPlaceHolder="Search"
        exportUrl="v2/orders"
        exportPayload={params}
        moduleKey="allPlans"
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

export default AllPlans;

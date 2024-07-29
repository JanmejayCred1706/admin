'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import React, { useEffect, useMemo, useState } from 'react';
import useGetRequest from '@hooks/useGetRequest';
import { useAppStore } from '@utils/Store';
import { PageDataProps } from '@interface/globalInterface';
import { planListingData, sequenceFn } from '@functions/planFn';
import { orderTypeAllowed } from '@interface/allPlansInterface';

const CancelPlans = () => {
  const {
    currentState,
    dateFilters: { cancelPlans },
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
      policy_status: 'cancelled',
      ...cancelPlans,
      date: 'custom',
    }),
    [pageData, currentState, cancelPlans]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('v2/orders', params, {}, [params]);

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
        titleHeader="Cancel Plans"
        searchPlaceHolder="Search"
        exportUrl="v2/orders"
        exportPayload={params}
        moduleKey="cancelPlans"
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

export default CancelPlans;

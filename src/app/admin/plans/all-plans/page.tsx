'use client';
import { DataTable, MixedHeadContent } from '@components/Component';
import { planListingData, sequenceFn } from '@functions/planFn';
import { useAppStore } from '@utils/Store';
import { DateFilterProps, PageDataProps } from '@utils/globalInterface';
import { useEffect, useState, useMemo } from 'react';
import useGetRequest from 'src/hooks/useGetRequest';

type Props = {};

const AllPlans = (props: Props) => {
  const { currentState } = useAppStore();
  const [dateFilter, setDateFilter] = useState<DateFilterProps>({
    start: '',
    end: '',
  });
  console.log(currentState, 'current');

  const [pageData, setPageData] = useState<PageDataProps>({
    startPage: 1,
    current: 1,
    limit: 25,
  });

  // Using useMemo to memoize params, so it changes only when dependencies change
  const params = useMemo(
    () => ({
      page: pageData.current - 1,
      state_id: currentState,
    }),
    [pageData, currentState]
  );
  console.log();

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('v2/orders', params, {}, [params]);

  console.log(listingData, '>>>');

  let count: number = listingData?.data?.total_count || 0;
  let order = sequenceFn();

  const { data: rawData, columns } = planListingData(
    listingData?.data?.policies || [],
    order
  );

  // Ensure `data` is always an array
  const data = rawData || [];

  useEffect(() => {
    // Refetch only if necessary
    refetch();
  }, [params, refetch]);

  return (
    <>
      <MixedHeadContent
        titleHeader="All Plans"
        {...{ dateFilter, setDateFilter }}
        searchPlaceHolder="Search"
        exportUrl="v2/orders"
        exportPayload={params}
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

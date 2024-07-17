'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import { claimsListingData, sequenceFn } from '@functions/claimsFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/claimInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo, useState } from 'react';

const AllClaims = () => {
  const { currentState, dateFilters } = useAppStore();
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
  } = useGetRequest('partners/claim', params, {}, [params]);

  let count: number = listingData?.data?.totalCount || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = claimsListingData(
    listingData?.data?.claims || [],
    order
  );

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);
  return (
    <>
      <MixedHeadContent
        titleHeader="All Claims"
        searchPlaceHolder="Search"
        exportUrl="partners/claim"
        exportPayload={params}
        moduleKey="allClaims"
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

export default AllClaims;

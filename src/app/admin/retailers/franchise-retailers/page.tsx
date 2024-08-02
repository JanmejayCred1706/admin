'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import {
  franchiseRetailersListingData,
  sequenceFn,
} from '@functions/franchiseRetailersFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/franchiseRetailersInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {};

const page = (props: Props) => {
  const { currentState } = useAppStore();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [pageData, setPageData] = useState<PageDataProps>({
    startPage: 1,
    current: 1,
    limit: 25,
  });

  const params = useMemo(
    () => ({
      page: pageData.current - 1,
      state_id: currentState,
      franchise_id: id,
    }),
    [pageData, currentState, id]
  );
  let order: orderTypeAllowed[] = sequenceFn();
  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('franchise/retailers', params, {}, [params]);
  const { data: rawData, columns } = franchiseRetailersListingData(
    listingData?.data?.data || [],
    order
  );
  let count: number = listingData?.data?.total_count || 0;
  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);
  return (
    <div>
      <MixedHeadContent
        titleHeader="Franchise Retailers"
        searchPlaceHolder="Search"
        exportUrl="franchise/retailers"
        exportPayload={params}
        moduleKey="franchiseRetailers"
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
    </div>
  );
};

export default page;

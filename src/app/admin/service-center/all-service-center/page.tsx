'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import {
  sequenceFn,
  serviceCenterListingData,
} from '@functions/serviceCenterFn';
import useGetRequest from '@hooks/useGetRequest';
import { PageDataProps } from '@interface/globalInterface';
import { orderTypeAllowed } from '@interface/serviceCenterInterface';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo, useState } from 'react';

const AllServiceCenters = () => {
  const {
    currentState,
    dateFilters: { allServiceCenter },
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
      // date: 'custom',
      // ...allServiceCenter,
    }),
    [pageData, currentState, allServiceCenter]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('admin/service_centres', params, {}, [params]);

  let count: number = listingData?.data?.totalCount || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = serviceCenterListingData(
    listingData?.data?.service_centre || [],
    order
  );

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);
  return (
    <>
      <MixedHeadContent
        titleHeader="Service Center"
        searchPlaceHolder="Search"
        exportUrl="admin/service_centres"
        exportPayload={params}
        moduleKey="allServiceCenter"
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

export default AllServiceCenters;

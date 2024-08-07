'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import {
  sequenceFn,
  waterfallReportListingData,
} from '@functions/waterfallReportFn';
import useGetRequest from '@hooks/useGetRequest';
import { PageDataProps } from '@interface/globalInterface';
import { orderTypeAllowed } from '@interface/waterfallInterface';
import { useAppStore } from '@utils/Store';
import React, { useEffect, useMemo, useState } from 'react';

interface pageProps {}

const WaterfallReport: React.FC<pageProps> = ({}) => {
  const {
    currentState,
    dateFilters: { waterfallReport },
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
      ...waterfallReport,
    }),
    [pageData, currentState, waterfallReport]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('report/water-fall-report', params, {}, [params]);

  let count: number = listingData?.data?.total_count || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = waterfallReportListingData(
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
        titleHeader="Waterfall Report"
        searchPlaceHolder="Search"
        exportUrl="report/water-fall-report"
        exportPayload={params}
        moduleKey="waterfallReport"
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

export default WaterfallReport;

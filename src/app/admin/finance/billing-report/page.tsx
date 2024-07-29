'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import {
  billingReportListingData,
  sequenceFn,
} from '@functions/billingReportFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/billingReportInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import React, { useEffect, useMemo, useState } from 'react';

interface pageProps {}

const BillingReport: React.FC<pageProps> = ({}) => {
  const {
    currentState,
    dateFilters: { billingReport },
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
      ...billingReport,
    }),
    [pageData, currentState, billingReport]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('report/billing-report', params, {}, [params]);

  let count: number = listingData?.data?.total_count || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = billingReportListingData(
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
        titleHeader="Billing Report"
        searchPlaceHolder="Search"
        exportUrl="report/billing-report"
        exportPayload={params}
        moduleKey="billingReport"
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

export default BillingReport;

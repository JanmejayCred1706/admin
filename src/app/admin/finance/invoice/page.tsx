'use client';
import { DataTable, MixedHeadContent } from '@components/Component';
import { billingReportListingData } from '@functions/billingReportFn';
import { sequenceFn } from '@functions/claimsFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/billingReport';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import React, { useEffect, useMemo, useState } from 'react';

interface pageProps {}

const Invoice: React.FC<pageProps> = ({}) => {
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
  } = useGetRequest('v2/invoices', params, {}, [params]);

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
        titleHeader="Invoice"
        searchPlaceHolder="Search"
        exportUrl="v2/invoices"
        exportPayload={params}
        moduleKey="invoice"
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

export default Invoice;

'use client';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import { InvoiceListingData, sequenceFn } from '@functions/invoiceFn';
import useGetRequest from '@hooks/useGetRequest';
import { PageDataProps } from '@interface/globalInterface';
import { orderTypeAllowed } from '@interface/invoiceInterface';
import { useAppStore } from '@utils/Store';
import { Button } from 'antd';
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

  const { data: rawData, columns } = InvoiceListingData(
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

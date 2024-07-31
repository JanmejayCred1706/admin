'use client';
import ModalComp from '@components/core/ModalComp';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import {
  activeRetailersListingData,
  sequenceFn,
} from '@functions/activeRetailersFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/activeRetailersInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo, useState } from 'react';

type Props = {};

const page = (props: Props) => {
  const {
    currentState,
    dateFilters: { activeRetailers },
    setModelOpen,
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
      ...activeRetailers,
      date: 'custom',
    }),
    [pageData, currentState, activeRetailers]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('partners/dealer', params, {}, [params]);

  let count: number = listingData?.data?.totalCount || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const { data: rawData, columns } = activeRetailersListingData(
    listingData?.data?.dealers || [],
    order
  );

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch]);
  return (
    <>
      <MixedHeadContent
        titleHeader="Active Retailers"
        searchPlaceHolder="Search"
        exportUrl="partners/dealer"
        exportPayload={params}
        moduleKey="activeRetailers"
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

export default page;

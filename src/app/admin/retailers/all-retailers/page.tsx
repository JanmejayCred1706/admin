'use client';
import ConfirmationComp from '@ui/ConfirmationComp';
import DataTable from '@core/DataTable';
import MixedHeadContent from '@core/MixedHeadContent';
import ModalComp from '@core/ModalComp';
import { allRetailersListingData, sequenceFn } from '@functions/allRetailersFn';
import useGetRequest from '@hooks/useGetRequest';
import { orderTypeAllowed } from '@interface/allRetailersInterface';
import { PageDataProps } from '@interface/globalInterface';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo, useState } from 'react';
import usePostRequest from '@hooks/usePostRequest';
import { useNotification } from '@higher-order-components/Notification';

type Props = {};

const AllRetailers = (props: Props) => {
  const {
    currentState,
    dateFilters: { allRetailers },
    setModelOpen,
  } = useAppStore();
  const { showNotification } = useNotification();
  const [curModal, setCurModal] = useState('');
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
      ...allRetailers,
    }),
    [pageData, currentState]
  );

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('partners/retailers', params, {}, [params]);

  let count: number = listingData?.data?.totalCount || 0;
  let order: orderTypeAllowed[] = sequenceFn();

  const handleClose = () => {
    setModelOpen(false);
  };
  const handleDocument = () => {
    setModelOpen(true);
  };
  const handleInactive = () => {
    setModelOpen(true);
  };
  const handleResetPassword = () => {
    setModelOpen(true);
    setCurModal('reset');
  };
  const cancelClick = () => {
    handleClose();
  };
  const handleResetClick = () => {};
  const { data: rawData, columns } = allRetailersListingData(
    listingData?.data?.data || [],
    order,
    handleDocument,
    handleInactive,
    handleResetPassword
  );

  const data = rawData || [];

  useEffect(() => {
    refetch();
  }, [params, refetch, allRetailers]);
  return (
    <>
      <ModalComp
        component={
          <ConfirmationComp
            {...{ cancelClick }}
            content="Do you really want to reset password for this dealer?"
            saveClick={handleResetClick}
          />
        }
      />
      <MixedHeadContent
        titleHeader="All Retailers"
        searchPlaceHolder="Search"
        exportUrl="partners/retailers"
        exportPayload={params}
        moduleKey="allRetailers"
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

export default AllRetailers;

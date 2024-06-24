'use client';
import { DataTable, MixedHeadContent } from '@components/Component';
import { planListingData } from '@functions/planFn';
import type { TableProps } from 'antd';
import { Button, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useGetRequest from 'src/hooks/useGetRequest';

type Props = {};

const AllPlans = (props: Props) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [plan, setPlan] = useState([]);

  const handleChange = (e: any) => {
    // console.log(e.target.value);
  };

  const [stateParam, setStateParam] = useState(0);

  const {
    data: listingData,
    error,
    isLoading,
    refetch,
  } = useGetRequest('v2/orders', { page: stateParam }, {}, [stateParam]);
  console.log(listingData, '>>>');
  let count: number = listingData?.data?.total_count;
  const { data, columns } = planListingData(listingData?.data?.policies);
  useEffect(() => {
    // Example of manual refetching if needed
    refetch();
  }, [stateParam, refetch]);
  return (
    <>
      <MixedHeadContent titleHeader="All Plans" />
      <DataTable
        {...{
          columns,
          data,
          count,
          pageNo,
          setPageNo,
          // searchParams,
          // setSearchParam,
        }}
      />
    </>
  );
};

export default AllPlans;

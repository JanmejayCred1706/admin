'use client';

import { ChartComp, MixedHeadContent } from '@components/Component';
import {
  modelWiseSale,
  saleOrPremium,
  topRetailerData,
} from '@functions/dashboardFn';
import useGetRequest from '@hooks/useGetRequest';
import { useAppStore } from '@utils/Store';
import { useMemo, useEffect } from 'react';
import React from 'react';

type ChartTypeInterface = 'line' | 'bar' | 'pie'; // Define the expected chart types

const Analytics: React.FC = () => {
  const { currentState } = useAppStore();

  // Memoize the params object to prevent infinite loop
  const params = useMemo(
    () => ({
      state_id: currentState,
      duration: 'thisMonth',
    }),
    [currentState]
  );

  const { data, error, isLoading, refetch } = useGetRequest(
    'report/analytics',
    params,
    {},
    [params]
  );

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  console.log(data, 'data');

  const { series, options } = saleOrPremium(data?.data?.plan_premium ?? []);
  const { series: modelWiseSeries, options: modelWiseOptions } = modelWiseSale(
    data?.data?.best_sold_model_report ?? []
  );
  const { series: topRetailersSeries, options: topRetailersOptions } =
    topRetailerData(data?.data?.best_retailers_plan_sold ?? []);
  const arr: {
    options: any;
    series: any;
    type: ChartTypeInterface;
    height: number;
  }[] = [
    {
      options: options,
      series: series,
      type: 'line',
      height: 400,
    },
    {
      options: modelWiseOptions,
      series: modelWiseSeries,
      type: 'bar',
      height: 400,
    },
    {
      options: topRetailersOptions,
      series: topRetailersSeries,
      type: 'bar',
      height: 400,
    },
  ];

  return (
    <>
      <MixedHeadContent titleHeader="Dashboard" moduleKey="dashboard" />
      <div className="flex gap-8 w-full flex-wrap my-8">
        <ChartComp arr={arr} />
      </div>
    </>
  );
};

export default Analytics;

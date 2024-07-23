'use client';
import dynamic from 'next/dynamic';
import MixedHeadContent from '@components/core/MixedHeadContent';
import {
  modelWiseSale,
  rangeContribution,
  rangeWiseSold,
  saleOrPremium,
  saleWithType,
  topRetailer,
} from '@functions/dashboardFn';
import useGetRequest from '@hooks/useGetRequest';
import { useAppStore } from '@utils/Store';
import React, { useEffect, useMemo } from 'react';
import { ChartTypeInterface } from '@interface/dashboardInterface';

const ChartComp = dynamic(() => import('@components/core/ChartComp'), {
  ssr: false,
});

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

  const { series, options } = saleOrPremium(data?.data?.plan_premium ?? []);
  const { series: modelWiseSeries, options: modelWiseOptions } = modelWiseSale(
    data?.data?.best_sold_model_report ?? []
  );
  const { series: topRetailersSeries, options: topRetailersOptions } =
    topRetailer(data?.data?.best_retailers_plan_sold ?? []);
  const { series: saleWithTypeSeries, options: saleWithTypeOptions } =
    saleWithType(data?.data?.all_plan_sold ?? []);
  const { series: rangeWiseSeries, options: rangeWiseOptions } = rangeWiseSold(
    data?.data?.price_range_wise_best_sold ?? []
  );
  const { series: rangeContributionSeries, options: rangeContributionOptions } =
    rangeContribution(data?.data?.price_range_wise_premium_contribution ?? []);
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
      height: 500,
    },
    {
      options: modelWiseOptions,
      series: modelWiseSeries,
      type: 'bar',
      height: 500,
    },
    {
      options: topRetailersOptions,
      series: topRetailersSeries,
      type: 'bar',
      height: 500,
    },
    {
      options: saleWithTypeOptions,
      series: saleWithTypeSeries,
      type: 'radialBar',
      height: 500,
    },
    {
      options: rangeWiseOptions,
      series: rangeWiseSeries,
      type: 'bar',
      height: 500,
    },
    {
      options: rangeContributionOptions,
      series: rangeContributionSeries,
      type: 'line',
      height: 500,
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

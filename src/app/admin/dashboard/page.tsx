'use client';
import MixedHeadContent from '@components/core/MixedHeadContent';
import DashboardModule from '@components/ui/DashboardModule';
import TopCard from '@components/ui/TopCard';
import { dashboardCardFn } from '@functions/dashboardFn';
import useGetRequest from '@hooks/useGetRequest';
import { useAppStore } from '@utils/Store';
import { useEffect, useMemo } from 'react';

const Dashboard = () => {
  const {
    dateFilters: { dashboard },
    isApiLoading,
  } = useAppStore();
  const params = useMemo(
    () => ({
      date: 'custom',
      ...dashboard,
    }),
    [dashboard]
  );

  const { data, error, isLoading, refetch } = useGetRequest(
    'dashboard/cards',
    params,
    {},
    [params]
  );
  const value = dashboardCardFn(data?.data);
  const dataArr = [
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
    {
      header: 'Electronics',
      type: 'GT',
      count: '90',
    },
  ];
  const chipArr = ['ALL', 'COCO', 'FOCO', 'GT'];
  useEffect(() => {
    refetch();
  }, [params, refetch, dashboard]);
  return (
    <div>
      <MixedHeadContent titleHeader="Dashboard" moduleKey="dashboard" />
      <div className="flex gap-4 my-8 w-full flex-wrap">
        {value.map((cur, id) => (
          <TopCard title={cur.title} count={cur.count} {...{ id }} key={id} />
        ))}
      </div>
      <div>
        <div className="flex gap-8">
          <DashboardModule
            title="Plans"
            subTitleLeft="Product"
            subTitleRight="Sold"
            {...{ dataArr, chipArr }}
          />
          <DashboardModule
            title="Retailers"
            subTitleLeft="Retailers"
            subTitleRight="Sold"
            {...{ dataArr, chipArr }}
          />
          <DashboardModule
            title="Premium"
            subTitleLeft="Product"
            subTitleRight="Amount"
            {...{ dataArr, chipArr }}
          />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;

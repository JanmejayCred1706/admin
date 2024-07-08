'use client';
import React from 'react';
import { DashboardModule, MixedHeadContent } from '@components/Component';
import { useAppStore } from '@utils/Store';
import { dashboardCardFn } from '@functions/dashboardFn';
import TopCard from '@components/ui/TopCard';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';

const Dashboard = () => {
  const { dateFilters } = useAppStore();
  const value = dashboardCardFn();

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

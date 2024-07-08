'use client';
import React from 'react';
import { MixedHeadContent } from '@components/Component';
import { useAppStore } from '@utils/Store';
import { dashboardCardFn } from '@functions/dashboardFn';

const Dashboard = () => {
  const { dateFilters } = useAppStore();
  const value = dashboardCardFn();

  return (
    <>
      <MixedHeadContent titleHeader="Dashboard" moduleKey="dashboard" />
      <div className="flex gap-4 my-8 w-full flex-wrap">
        {value.map((cur, id) => (
          <div className="topCard" key={id}>
            <p className="text-2xl leading-4">{cur.title}</p>
            <p className="text-xl mb-1">{cur.count}</p>
            <p className="pointer">See Details</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;

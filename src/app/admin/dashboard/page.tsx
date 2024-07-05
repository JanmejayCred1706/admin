'use client';
import React from 'react';
import { MixedHeadContent } from '@components/Component';
import { useAppStore } from '@utils/Store';

const Dashboard = () => {
  const { dateFilters } = useAppStore();
  const arr = [
    {
      count: 100,
      title: 'Active Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'All Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'Dead Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'Active Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'Active Retailers',
      link: '',
    },
  ];

  return (
    <>
      <MixedHeadContent titleHeader="Dashboard" moduleKey="dashboard" />
      <div className="flex gap-4 my-8 w-full flex-wrap">
        {arr.map((cur, id) => (
          <div className="topCard" key={id}>
            <p className="text-2xl leading-4">{cur.title}</p>
            <p className="text-lg mb-1">{cur.count}</p>
            <p>See Details</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;

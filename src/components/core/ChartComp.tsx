'use client';
import React from 'react';
import { Card } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ChartTypeInterface } from '@interface/dashboardInterface';

type ChartCompProps = {
  height?: number;
  arr: {
    options: any;
    series: any;
    type?: ChartTypeInterface;
    height: number;
  }[];
};

const ChartComp: React.FC<ChartCompProps> = ({ arr }) => {
  if (typeof window === 'undefined') {
    // Return null or some placeholder content for server-side rendering
    return null;
  }

  return (
    <>
      {arr?.map((cur, id) => (
        <Card className="w-[48%]" key={id}>
          <ReactApexChart
            options={cur.options}
            series={cur.series}
            type={cur.type}
            height={cur.height}
            width="100%"
          />
        </Card>
      ))}
    </>
  );
};

export default ChartComp;

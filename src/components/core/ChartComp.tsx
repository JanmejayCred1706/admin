import { ChartTypeInterface } from '@interface/dashboardInterface';
import { Card } from 'antd';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

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

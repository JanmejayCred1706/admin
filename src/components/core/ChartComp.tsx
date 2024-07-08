import { ChartTypeInterface } from '@interface/dashboardInterface';
import { Card } from 'antd';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Define the types for the props

type ChartCompProps = {
  options: any;
  series: any;
  type: ChartTypeInterface;
  height: number;
  width?: number;
  export?: boolean;
};

const ChartComp: React.FC<ChartCompProps> = ({
  options,
  series,
  type,
  height,
  width,
  export
}) => {
  return (
    <Card>
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        height={height}
        width={width}
      />
    </Card>
  );
};

export default ChartComp;

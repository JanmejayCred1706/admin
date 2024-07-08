import { DashboardModuleInterface } from '@interface/dashboardInterface';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

// Define types/interfaces

const DashboardModule: React.FC<DashboardModuleInterface> = ({
  title,
  subTitleLeft,
  subTitleRight,
  dataArr,
  chipArr,
}) => {
  return (
    <Card className="w-1/3 border border-none shadow-card">
      <Title level={4}>{title}</Title>
      <div className="flex gap-2">
        {chipArr.map((cur, id) => (
          <p className="chip" key={id}>
            {cur}
          </p>
        ))}
      </div>
      <div className="display-between">
        <p>{subTitleLeft}</p>
        <p>{subTitleRight}</p>
      </div>
      {dataArr.map((cur, id) => (
        <div className="dashboardDataModule" key={id}>
          <div>
            <p>{cur.header}</p>
            <p>{cur.type}</p>
          </div>
          <div>{cur.count}</div>
        </div>
      ))}
    </Card>
  );
};

export default DashboardModule;

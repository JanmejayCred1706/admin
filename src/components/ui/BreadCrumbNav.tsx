import { BreadCrumbNavProps } from '@interface/UiInterfaces';
import { Breadcrumb } from 'antd';
import React from 'react';

const BreadCrumbNav: React.FC<BreadCrumbNavProps> = ({}) => {
  let BreadCrumbItems = [
    {
      title: 'Home',
    },
    {
      title: <a href="">Application Center</a>,
    },
    {
      title: <a href="">Application List</a>,
    },
    {
      title: 'An Application',
    },
  ];
  return <Breadcrumb style={{ margin: '1rem 0' }} items={BreadCrumbItems} />;
};

export default BreadCrumbNav;

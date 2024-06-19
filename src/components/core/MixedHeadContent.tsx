'use client';
import { SearchOutlined } from '@ant-design/icons';
import { DateFilter } from '@components/Component';
import { Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { ChangeEvent, FC, useRef } from 'react';

type MixedHeadContendProps = {
  titleHeader: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  searchPlaceHolder?: string;
  startDate?: string;
  endDate?: string;
  setStartDate?: (date: string) => void;
  setEndDate?: (date: string) => void;
};

const MixedHeadContent: FC<MixedHeadContendProps> = ({
  titleHeader,
  handleChange,
  searchPlaceHolder = 'Search',
}) => {
  return (
    <div className="display-between">
      <Title level={3}>{titleHeader}</Title>
      <Space>
        {handleChange && (
          <Input
            placeholder={searchPlaceHolder}
            prefix={
              <SearchOutlined className="site-form-item-icon text-[#0c344e]" />
            }
            className="inputHover h-10 border"
            onChange={handleChange}
          />
        )}
        {/* <DateFilter {...{ startDate, endDate, setStartDate, setEndDate }} /> */}
        {/* <ExportOutlined style={{ fontSize: '32px' }} /> */}
      </Space>
    </div>
  );
};

export default MixedHeadContent;

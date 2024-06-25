import {
  ExportOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { DateFilter } from '@components/Component';
import { DateFilterProps } from '@utils/globalInterface';
import { Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { ChangeEvent, FC } from 'react';
import useGetRequest from 'src/hooks/useGetRequest';

type exportPayloadProps = {
  page: number;
  state_id: number | string;
};
type MixedHeadContendProps = {
  titleHeader: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  searchPlaceHolder?: string;
  dateFilter?: DateFilterProps;
  setDateFilter?: React.Dispatch<React.SetStateAction<DateFilterProps>>;
  exportUrl: string;
  exportPayload: exportPayloadProps;
  filter?: string;
};

const MixedHeadContent: FC<MixedHeadContendProps> = ({
  titleHeader,
  handleChange,
  searchPlaceHolder = 'Search',
  dateFilter,
  setDateFilter,
  exportUrl,
  exportPayload,
  filter,
}) => {
  const handleExport = () => {
    console.log('clicked');
    const {
      data: listingData,
      error,
      isLoading,
      refetch,
    } = useGetRequest(exportUrl, exportPayload, {}, [exportPayload]);
  };
  return (
    <div className="display-between">
      <Title level={3}>{titleHeader}</Title>
      <Space size="large">
        {searchPlaceHolder && (
          <Input
            placeholder={searchPlaceHolder}
            prefix={
              <SearchOutlined className="site-form-item-icon text-[#0c344e]" />
            }
            className="inputHover h-10 border"
            onChange={handleChange}
          />
        )}
        {filter && <FilterOutlined className="iconBorder" />}
        {exportUrl && (
          <ExportOutlined className="iconBorder" onClick={handleExport} />
        )}

        {dateFilter && setDateFilter && (
          <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        )}
      </Space>
    </div>
  );
};

export default MixedHeadContent;

import {
  ExportOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { DateFilterProps } from 'src/interface/globalInterface';
import { Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { ChangeEvent, FC } from 'react';
import useGetRequest from 'src/hooks/useGetRequest';
import { useNotification } from '@higher-order-components/Notification';
import DateFilter from '@components/ui/DateFilter';

type exportPayloadProps = {
  page: number;
  state_id: number | string;
};

type MixedHeadContendProps = {
  titleHeader: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  searchPlaceHolder?: string;
  exportUrl?: string;
  exportPayload?: exportPayloadProps;
  filter?: string;
  moduleKey?: string;
};

const MixedHeadContent: FC<MixedHeadContendProps> = ({
  titleHeader,
  handleChange,
  searchPlaceHolder,
  exportUrl,
  exportPayload,
  filter,
  moduleKey,
}) => {
  const { showNotification } = useNotification();

  const payloadForExport = {
    ...exportPayload,
    export: 1,
  };

  const { data, error, isLoading, refetch } = useGetRequest(
    exportUrl || '',
    payloadForExport,
    {},
    exportUrl ? [payloadForExport] : []
  );

  const handleExport = async () => {
    if (!exportUrl) {
      showNotification('error', 'Export URL is not provided');
      return;
    }

    try {
      const { data } = await refetch();
      showNotification(
        'success',
        'Data Exported Successfully',
        data?.data?.message
      );
    } catch (err) {
      showNotification('error', 'Data Export Failed', err.message || err);
      console.error('Error exporting data:', err);
    }
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
        {moduleKey && <DateFilter moduleKey={moduleKey} />}
      </Space>
    </div>
  );
};

export default MixedHeadContent;

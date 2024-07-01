import { modifyListingData } from '@functions/globalFn';
import {
  InvoiceColumnKeys,
  InvoiceDataItem,
} from '@interface/invoiceInterface';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const InvoiceListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<InvoiceDataItem> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Acknowledgement No.',
      dataIndex: 'acknowledgementNo',
      key: 'acknowledgementNo',
    },
    {
      title: 'Irn',
      dataIndex: 'irn',
      key: 'irn',
    },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, data) => (
        <Space>
          <Button type="primary">Download</Button>
        </Space>
      ),
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        id: cur.id,
        acknowledgementNo: cur.acknowledgement_no,
        irn: cur.irn,
        createdAt: cur.created_at,
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof InvoiceColumnKeys)[] => {
  let order: (keyof InvoiceColumnKeys)[] = [
    'id',
    'acknowledgementNo',
    'irn',
    'createdAt',
    'action',
  ];

  return order;
};

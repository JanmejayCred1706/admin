import DataChip from '@components/core/DataChip';
import { formatCurrency, modifyListingData } from '@functions/globalFn';
import { ClaimsColumnKeys, ClaimsDataItem } from '@interface/claimInterface';
import {
  ColumnKeysServiceCenter,
  DataItemServiceCenter,
} from '@interface/serviceCenterInterface';
import { ColumnsType } from 'antd/es/table';

export const claimsListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<ClaimsDataItem> = [
    {
      title: 'Claim Reference',
      dataIndex: 'refId',
      key: 'refId',
      render: (text) => <a>{text}</a>,
    },
    { title: 'Job Sheet N.o', dataIndex: 'jobSheetNo', key: 'jobSheetNo' },
    {
      title: 'Service Center Name',
      dataIndex: 'serviceCenterName',
      key: 'serviceCenterName',
    },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Plan', dataIndex: 'plan', key: 'plan' },
    {
      title: 'Claimed Amount',
      dataIndex: 'claimedAmount',
      key: 'claimedAmount',
    },
    {
      title: 'Approved Amount',
      dataIndex: 'approvedAmount',
      key: 'approvedAmount',
    },
    {
      title: 'Claimed Amount',
      dataIndex: 'claimedAmount',
      key: 'claimedAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <div className="flex justify-center">
          <DataChip color={status} name={status} />
        </div>
      ),
    },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        refId: cur.id,
        jobSheetNo: cur.job_sheet_number,
        serviceCenterName: cur.service_centre_name,
        customerName: cur.name,
        plan: cur.type,
        claimedAmount: formatCurrency(cur.claimed_amount),
        approvedAmount: formatCurrency(cur.approved_amount),
        status: cur.status,
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof ClaimsColumnKeys)[] => {
  let order: (keyof ClaimsColumnKeys)[] = [
    'refId',
    'jobSheetNo',
    'serviceCenterName',
    'customerName',
    'plan',
    'claimedAmount',
    'approvedAmount',
    'status',
  ];

  return order;
};

import { formatCurrency, modifyListingData } from '@functions/globalFn';
import {
  ColumnKeysServiceCenter,
  DataItemServiceCenter,
} from '@interface/serviceCenterInterface';
import { ColumnsType } from 'antd/es/table';

export const serviceCenterListingData = (listingData: any, keys: string[]) => {
  const defColumns: ColumnsType<DataItemServiceCenter> = [
    {
      title: 'Ref Id',
      dataIndex: 'refId',
      key: 'refId',
      render: (text) => <a>{text}</a>,
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    // { title: 'Premium', dataIndex: 'premium', key: 'premium' },
    // {
    //   title: 'Retailer Commission',
    //   dataIndex: 'commission',
    //   key: 'commission',
    // },
    // { title: 'Vivo Margin', dataIndex: 'vivoMargin', key: 'vivoMargin' },
    // { title: 'State Margin', dataIndex: 'stateMargin', key: 'stateMargin' },
    // {
    //   title: 'Garantie Margin',
    //   dataIndex: 'garantieMargin',
    //   key: 'garantieMargin',
    // },
    // {
    //   title: 'Retailers Type',
    //   dataIndex: 'retailersType',
    //   key: 'retailersType',
    // },
    // {
    //   title: 'Retailers Code',
    //   dataIndex: 'retailersCode',
    //   key: 'retailersCode',
    // },
    // { title: 'Child Code', dataIndex: 'childCode', key: 'childCode' },
    // { title: 'Promoter Id', dataIndex: 'promoterId', key: 'promoterId' },
    // { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    // { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    // {
    //   title: 'Plan Purchase Date',
    //   dataIndex: 'planPurchaseDate',
    //   key: 'planPurchaseDate',
    // },
  ];
  let defData: any =
    listingData?.length > 1 &&
    listingData?.map((cur: any, id: any) => {
      return {
        key: cur.id,
        refId: cur.id,
        name: cur.name,
        mobile: cur.mobile,
        email: cur.email,
        premium: formatCurrency(cur.premium),
        commission: formatCurrency(cur.commission),
        vivoMargin: formatCurrency(cur.oem_commission_part),
        stateMargin: formatCurrency(cur.state_commission_part),
        garantieMargin: formatCurrency(cur.garantie_commission),
        retailersType: '',
        retailersCode: cur.code,
        childCode: cur.store_code,
        promoterId: cur.promoter_id,
        startDate: cur.start_date,
        endDate: cur.end_date,
        planPurchaseDate: cur?.contract_start_date,
      };
    });
  const { columns, data } = modifyListingData(defData, keys, defColumns);
  return { columns, data };
};

export const sequenceFn = (): (keyof ColumnKeysServiceCenter)[] => {
  let order: (keyof ColumnKeysServiceCenter)[] = [
    'refId',
    'name',
    'mobile',
    'email',
    'premium',
    'commission',
    'vivoMargin',
    'stateMargin',
    'garantieMargin',
    'retailersType',
    'retailersCode',
    'childCode',
    'promoterId',
    'startDate',
    'endDate',
    'planPurchaseDate',
  ];

  return order;
};

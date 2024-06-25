import { PageDataProps } from '@utils/globalInterface';
import { Table, TableProps } from 'antd';
import React from 'react';

interface DataTableProps {
  columns: TableProps<any>['columns'];
  data: any[];
  rowSelection?: TableProps<any>['rowSelection'];
  count: number;
  bordered?: boolean;
  pageData: PageDataProps;
  setPageData: React.Dispatch<React.SetStateAction<PageDataProps>>;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  rowSelection,
  count,
  bordered,
  pageData,
  setPageData,
}) => {
  const getTotalPageCount =
    count > pageData.current * pageData.limit
      ? pageData.current * pageData.limit
      : count;
  const currentPageValue = pageData.current * pageData.limit - 24;
  const onPageChange = (page: number) => {
    setPageData((prev) => ({
      ...prev,
      current: page,
    }));
  };
  return (
    <div>
      <Table
        columns={columns}
        rowSelection={rowSelection ?? undefined}
        pagination={
          count && pageData.current
            ? {
                current: pageData.current,
                pageSize: pageData.limit,
                total: count,
                position: ['none', 'bottomRight'],
                onChange: (page) => {
                  onPageChange(page);
                },
              }
            : false
        }
        dataSource={data}
        scroll={{ x: 'max-content' }}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      />
      <p className="mt-[-3rem]">
        Showing {currentPageValue}-{getTotalPageCount} of &nbsp;
        {count}
      </p>
    </div>
  );
};

export default DataTable;

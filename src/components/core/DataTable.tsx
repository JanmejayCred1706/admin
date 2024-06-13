import { Table, TableProps } from 'antd';
import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { getUrlPageNo } from 'utils/UtilsIndex';

interface DataTableProps {
  columns: TableProps<any>['columns'];
  data?: any[];
  rowSelection?: TableProps<any>['rowSelection'];
  count: number;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  setSearchParam?: (params: { page: number }) => void;
  bordered?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data = [],
  rowSelection,
  count,
  pageNo,
  setPageNo,
  setSearchParam,
  bordered,
}) => {
  //   const { search } = useLocation();
  //   const defaultPage = getUrlPageNo(search);
  let search: string = '';
  let defaultPage: number = 1;
  const defaultPageNo = defaultPage ? defaultPage : 1;
  const getTotalPageCount =
    count > defaultPageNo * 20 ? defaultPageNo * 20 : count;

  return (
    <div>
      <Table
        columns={columns}
        rowSelection={rowSelection ?? undefined}
        pagination={
          count && pageNo
            ? {
                current: +defaultPageNo,
                pageSize: 20,
                total: count,
                position: ['none', 'bottomRight'],
                onChange: (page) => {
                  setPageNo(page);
                  setSearchParam({ page });
                },
              }
            : false
        }
        dataSource={data}
        scroll={{ y: 1000 }}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      />
      <p className="mt-[-3rem]">
        Showing {defaultPageNo * 20 - 9}-{getTotalPageCount} of {count}
      </p>
    </div>
  );
};

export default DataTable;

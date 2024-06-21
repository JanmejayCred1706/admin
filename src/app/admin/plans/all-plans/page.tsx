'use client';
import { DataTable, MixedHeadContent } from '@components/Component';
import type { TableProps } from 'antd';
import { Button, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useGetRequest from 'src/hooks/useGetRequest';

type Props = {};

const AllPlans = (props: Props) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [plan, setPlan] = useState([]);
  let count: number = 100;
  const handleChange = (e: any) => {
    // console.log(e.target.value);
  };

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const [stateParam, setStateParam] = useState(0);

  const {
    data: flow,
    error,
    isLoading,
    refetch,
  } = useGetRequest('v2/orders', { page: stateParam }, {}, [stateParam]);

  useEffect(() => {
    // Example of manual refetching if needed
    refetch();
  }, [stateParam, refetch]);
  console.log(flow);
  return (
    <>
      <MixedHeadContent titleHeader="All Plans" />
      <DataTable
        {...{
          columns,
          data,
          count,
          pageNo,
          setPageNo,
          // searchParams,
          // setSearchParam,
        }}
      />
    </>
  );
};

export default AllPlans;

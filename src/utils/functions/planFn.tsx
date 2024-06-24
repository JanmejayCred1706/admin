import { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
// Define the interface for the objects in the array
interface MyObject {
  id: number;
  name: string;
  // Add other properties as needed
}

// Define the interface for the function parameter
interface MyObjectArray {
  data: MyObject[];
}

export const planListingData = (listing: any) => {
  console.log(listing, '>>');
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
  return { columns, data };
};

// // @functions/planFn.ts
// export const planListingData = (listingData: any) => {
//   console.log(planListingData);
//   if (!listingData) {
//     return { data: [], columns: [] };
//   }

//   // Assuming listingData.items is an array of plan objects
//   const data = listingData.items || [];

//   // Define the columns for the DataTable
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     // Add more columns as needed
//   ];

//   return { data, columns };
// };

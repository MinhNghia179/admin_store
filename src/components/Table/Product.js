import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <>
        <div className={status ? 'status-active' : 'status-active'}>
          {status ? 'Còn hàng' : 'Hết hàng'}
        </div>
      </>
    ),
  },
  {
    title: 'Trade Mark',
    dataIndex: 'trademark',
    key: 'trademark',
  },
  {
    title: 'Main Stone',
    dataIndex: 'mainstone',
    key: 'mainstone',
  },
  {
    title: 'Main Color Stone',
    dataIndex: 'maincolortone',
    key: 'maincolortone',
  },
  {
    title: 'Shape',
    dataIndex: 'shape',
    key: 'shape',
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text) => (
      <>
        <div>{text.length > 20 ? text.substring(0, 19) + '...' : text}</div>
      </>
    ),
  },
  {
    title: 'Images',
    dataIndex: 'images',
    key: 'images',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <>
        <div className="list-icon">
          <BsFillTrashFill onClick={() => {}} />
          <BsFillPencilFill onClick={() => {}} />
        </div>
      </>
    ),
  },
];

export default columns;

import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Divider,
  TableProps,
  Popconfirm,
  Space,
  Typography,
  Tag,
  TableColumnsType,
} from 'antd';
import CreateModal from './components/CreateModal.tsx';
import SearchList from '../../../components/SearchList/index.tsx';
import UpdateModal from './components/UpdateModal.jsx';
import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  title: string;
  desc: string;
  method: string;
  url: string;
  requestHeader: string;
  responseHeader: string;
  status: 0 | 1;
}

const data: DataType[] = [
  {
    key: '1',
    title: 'Jim Green',
    desc: '这是一个接口',
    method: 'POST',
    url: 'https://www.baidu.com',
    requestHeader: 'xxxxxx',
    responseHeader: 'json字符串',
    // status: ["关闭"],
    status: 0,
  },
  {
    key: '2',
    title: 'Jim Green',
    desc: '这是一个接口',
    method: 'POST',
    url: 'https://www.baidu.com',
    requestHeader: 'xxxxxx',
    responseHeader: 'json字符串',
    // status: ["关闭"],
    status: 0,
  },
  {
    key: '3',
    title: 'Jim Green',
    desc: '这是一个接口',
    method: 'POST',
    url: 'https://www.baidu.com',
    requestHeader: 'xxxxxx',
    responseHeader: 'json字符串',
    status: 1,
  },
];

const { Search } = Input;

const AdminInterfaceInfo: React.FC = () => {
  // 接口状态管理
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  //   //   const [showDetail, setShowDetail] = useState(false);
  // const [titlesearch, setTitleSearch] = useState(''); // 搜索框的值
  const [currentRow, setCurrentRow] = useState();
  // const [selectionType, setSelectionType] = useState('checkbox');
  // const [interfaceInfoList, setInterfaceInfoList] = useState([]); // table表数据
  // table复选框
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // api状态（0：关闭，1：在线）
  const [apiStatus, setApiStatus] = useState('');
  // const [clearSearch, setClearOnSearch] = useState(false);

  // const [form] = Form.useForm();

  /**
   * 检查接口状态是否匹配
   * @param record 接口数据
   * @returns 状态是否匹配
   */
  const isStatus = (record: DataType) => record.status === Number(apiStatus);

  // table表单多选操作（多删除）
  // rowSelection object indicates the need for row selection
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const footerRow = () => {
    return hasSelected ? (
      <>
        <Button
          type="primary"
          onClick={start}
          loading={loading}
          style={{marginRight: "1rem"}}
          danger
        >
          批量删除
        </Button>
        {hasSelected ? `选择了 ${selectedRowKeys.length} 项数据` : null}
      </>
    ): null
  }

  // 模糊查询
  const onSearch = (values) => {
    // setClearOnSearch(true);
    console.log('查询', values);
  };

  /**
   * 添加接口(默认不对外开放)
   *
   */
  const handleAdd = (values: any) => {
    // addInterfaceInfoPost(values);
    console.log('添加接口', value);
  };

  /**
   * 更新接口
   *
   */
  const handleUpdate = (values: any) => {
    // if (!currentRow){
    //   return;
    // }
    // try {
    //   await updateInterfaceInfoPut({
    //     ID: currentRow.ID,
    //     ...values});
    //   return true;
    // } catch (e) {
    //   console.log("错误：",e.message)
    //   return false;
    // }
    console.log('更新接口', values);
    setInterfaceInfoList(data);
  };

  /**
   * 删除接口(从表格中删除,数据库不删除)
   *
   */
  const handleRemove = async () => {};

  /**
   * 发布接口
   *
   */
  const handleOnline = async () => {};

  /**
   * 下线接口
   *
   */
  const handleOffline = async () => {
    /**
     * TODO
     * 1. 获取接口id、status,根据id查询数据库的接口状态是否一致，
     * 2. 一致则修改对应的接口状态status并返回前端
     * 3. 前端根据返回的接口数据（id，status）刷新table表单
     */
  };

  /**
   * 接口管理列表的参数类型
   */
  const columns: TableColumnsType<DataType> = [
    {
      title: '接口名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      key: 'requestHeader',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      key: 'responseHeader',
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 0 ? 'grey' : 'yellow';
        const text = status === 0 ? '离线' : '在线';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (_, record: DataType) => {
        const isRecord = isStatus(record);
        return isRecord ? (
          <Space>
            <a
              key="config"
              onClick={() => {
                handleUpdateModalVisible(true);
                setCurrentRow(record);
                console.log('record:', record);
              }}
            >
              修改
            </a>
            <Typography.Link>
              <a
                key="online"
                onClick={() => {
                  handleOnline(record);
                }}
              >
                发布
              </a>
            </Typography.Link>
            <Popconfirm
              placement="topRight"
              title="确定删除"
              description="是否要删除该数据"
              okText="Yes"
              cancelText="No"
              key="delete"
            >
              <a style={{color: "red"}}>删除</a>
            </Popconfirm>
          </Space>
        ) : (
          <Typography.Link>
            <a
              key="logout"
              onClick={() => {
                handleOffline(record.key);
              }}
            >
              下线
            </a>
          </Typography.Link>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <SearchList />

      <Divider />
      <div
        style={{
          maxWidth: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div style={{ fontSize: '1rem' }}>查询表格</div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            新建
          </Button>
        </div>
      </div>
      <Table<DataType>
        //   多选框
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        footer={footerRow}
      />
      <CreateModal
        open={createModalVisible}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        values={currentRow || {}}
        onSubmit={(values) => {
          console.log('father:', values);
          handleUpdate(values);
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
      />
    </div>
  );
};
export default AdminInterfaceInfo;

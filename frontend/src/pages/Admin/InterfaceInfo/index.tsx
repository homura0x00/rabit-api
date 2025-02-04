import { useEffect, useState } from "react";
import { Table, Button, Input,  Divider, TableProps, Popconfirm } from "antd";
import CreateModal from "./components/CreateModal.tsx";
import SearchList from "../../../components/SearchList/index.tsx";
import UpdateModal from "./components/UpdateModal.jsx";
import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  id: string;
  key?: string;
  title: string;
  desc: string;
  method: string;
  url: string;
  requestHeader: string;
  responseHeader: string;
  status: 0 | 1;
}

/**
 * 接口管理列表的参数类型
 */
const columns: TableProps<DataType>['columns'] = [
  {
    title: "id",
    dataIndex: "ID",
    key: "id",
  },
  {
    title: "接口名称",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "desc",
  },
  {
    title: "请求方法",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "url",
    dataIndex: "url",
    key: "url",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "请求头",
    dataIndex: "requestHeader",
    key: "requestHeader",
  },
  {
    title: "响应头",
    dataIndex: "responseHeader",
    key: "responseHeader",
    //   render: (text) => <a>{text}</a>,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    dataIndex: "option",
    key: "option",
    render: (_, record) => [
      <a
        key="config"
        onClick={() => {
          handleUpdateModalVisible(true);
          setCurrentRow(record);
          console.log("record:", record);
          // console.log("currentRow:",currentRow)
        }}
      >
        修改
      </a>,
      record.status === 0 ? (
        <a
          key="online"
          onClick={() => {
            handleOnline(record);
          }}
        >
          发布
        </a>
      ) : null,
      record.status === 1 ? (
        <Button
          type="text"
          key="logout"
          danger
          onClick={() => {
            handleOffline(record);
          }}
        >
          下线
        </Button>
      ) : null,
      <Popconfirm
        placement="topRight"
        title="确定删除"
        description="是否要删除该数据"
        okText="Yes"
        cancelText="No"
        key="delete"
      >
        <Button type="dashed" danger>删除</Button>
      </Popconfirm>
    
    ],
  },
];

const data: DataType[] = [
{
  id: "1",
  title: "Jim Green",
  desc: "这是一个接口",
  method: "POST",
  url: "https://www.baidu.com",
  requestHeader: "xxxxxx",
  responseHeader: "json字符串",
  // status: ["关闭"],
  status: 0,
},
{
  id: "2",
  title: "Jim Green",
  desc: "这是一个接口",
  method: "POST",
  url: "https://www.baidu.com",
  requestHeader: "xxxxxx",
  responseHeader: "json字符串",
  // status: ["关闭"],
  status: 0,
},
{
  id: "3",
  title: "Jim Green",
  desc: "这是一个接口",
  method: "POST",
  url: "https://www.baidu.com",
  requestHeader: "xxxxxx",
  responseHeader: "json字符串",
  status: 0,
},
];

const { Search } = Input;


const AdminInterfaceInfo: React.FC = () => {
  // 接口状态管理
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  //   //   const [showDetail, setShowDetail] = useState(false);
  const [titlesearch, setTitleSearch] = useState(''); // 搜索框的值
  const [currentRow, setCurrentRow] = useState();
  const [selectionType, setSelectionType] = useState("checkbox");
  const [interfaceInfoList, setInterfaceInfoList] = useState([]); // table表数据
  // table复选框
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); 
  // const [clearSearch, setClearOnSearch] = useState(false);

  // const [form] = Form.useForm();

  // table表单多项
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };



  // 模糊查询
  const onSearch = (values) => {
    // setClearOnSearch(true);
    console.log("查询", values);
  };

  //   const style = {
  //     background: "#0092ff",
  //     padding: "8px 0",
  //   };
  /**
   * 添加接口(默认不对外开放)
   *
   */
  const handleAdd = (values: any) => {
    // addInterfaceInfoPost(values);
    console.log("添加接口", value)
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
    console.log("更新接口", values)
    setInterfaceInfoList(data)
  };

  /**
   * 删除接口(从表格中删除,数据库不删除)
   *
   */
  const handleRemove = async () => {
  };

  /**
   * 发布接口
   *
   */
  const handleOnline = async () => {};

  /**
   * 下线接口
   *
   */
  const handleOffline = async () => {};

  

  return (
    <div>
      {/* <Search
        id="title"
        size="large"
        style={{
          width: "200px",
        }}
        value={titlesearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitleSearch(e.target.value);
        }}
        placeholder="请输入接口名称"
        onSearch={onSearch}
        enterButton
      /> */}
      <SearchList />

      <Divider />
      <div
        style={{
          maxWidth: "100vw",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div style={{ fontSize: "1rem" }}>查询表格</div>
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
      <Table
        //   多选框
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
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
        onSubmit={ (values) => {
          console.log("father:", values)
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

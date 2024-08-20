import { Button, message, Pagination, Popconfirm, Space, Table } from "antd";
import type { PopconfirmProps, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { Link } from "react-router-dom";
export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;
const StudentData = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const confirm: PopconfirmProps["onConfirm"] = () => {
    message.success("Block this Student");
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.success("Cancel to Block Student");
  };

  const metaData = studentData?.meta;
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space
            style={{ display: "flex", justifyItems: "center", gap: "5px" }}
          >
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/student-update/${item?.key}`}>
              <Button style={{ backgroundColor: "red", color: "white" }}>
                Update
              </Button>
            </Link>
            <Popconfirm
              title="Block Student"
              description="Are you sure to block this student"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Block"
              cancelText="No"
            >
              <Button style={{ backgroundColor: "red", color: "white" }}>
                Block
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: "10%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />

      <div style={{ marginTop: "10px" }}>
        <Pagination
          align="end"
          current={page}
          pageSize={metaData?.limit}
          onChange={(value) => setPage(value)}
          total={metaData?.total}
        />
      </div>
    </>
  );
};

export default StudentData;

import { Button, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
export type TTableData = Pick<TStudent, "fullName" | "id">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery(params);

  const tableData = studentData?.data?.map(({ id, fullName }) => ({
    id,
    fullName,
  }));
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
      title: "Action",
      key: "X",
      render: () => {
        return (
          <Space
            style={{ display: "flex", justifyItems: "center", gap: "5px" }}
          >
            <Button>Details</Button>
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Update
            </Button>
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Block
            </Button>
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default StudentData;

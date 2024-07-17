import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemesterDataType } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";
export type TTableData = Pick<
  TAcademicSemesterDataType,
  "name" | "_id" | "year" | "startMonth" | "endMonth"
>;
const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);

  console.log(isLoading, isFetching, "isLOading");
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "X",
      render: () => {
        return (
          <div style={{ display: "flex", justifyItems: "center", gap: "5px" }}>
            <Button>Update</Button>
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Delete
            </Button>
          </div>
        );
      },
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

export default AcademicSemester;

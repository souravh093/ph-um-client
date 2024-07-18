import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFacultyDataType } from "../../../types/academicManagement.type";
import { Button, Table, TableColumnsType, TableProps } from "antd";

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);

  type TAcademicFacultyTableData = Pick<
    TAcademicFacultyDataType,
    "name" | "_id" | "createdAt"
  >;

  const tableData = facultyData?.data?.data?.map(
    ({ _id, name, createdAt }) => ({
      key: _id,
      _id,
      name,
      createdAt:
        createdAt &&
        new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    })
  );

  const columns: TableColumnsType<TAcademicFacultyTableData> = [
    {
      title: "Created Date",
      dataIndex: "createdAt",
    },
    {
      title: "Name",
      dataIndex: "name",
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

  const onChange: TableProps<TAcademicFacultyTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
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

export default AcademicFaculty;

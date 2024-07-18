import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicDepartmentDataType } from "../../../types/academicManagement.type";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAllAcademicDepartmentsQuery(undefined);
  const tableData = departmentData?.data?.map(
    ({
      _id,
      name,
      createdAt,
      academicFaculty,
    }: Partial<TAcademicDepartmentDataType>) => ({
      key: _id,
      _id,
      name,
      academicFaculty: academicFaculty?.name,
      createdAt:
        createdAt &&
        new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    })
  );


  type TAcademicDepartmentTableData = Pick<
    TAcademicDepartmentDataType,
    "name" | "_id" | "createdAt" | "academicFaculty"
  >;
  const columns: TableColumnsType<TAcademicDepartmentTableData> = [
    {
      title: "Created Date",
      dataIndex: "createdAt",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
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

  const onChange: TableProps<TAcademicDepartmentTableData>["onChange"] = (
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

export default AcademicDepartment;

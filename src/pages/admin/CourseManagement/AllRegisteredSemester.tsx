import moment from "moment";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types";
import { Button, Table, TableColumnsType, Tag } from "antd";

const item = [
  {
    label: "Upcoming",
    key: "UPCOMING"
  },
  {
    label: "Ongoing",
    key: "ONGOING"
  },
  {
    label: "Ended",
    key: "ENDED"
  }
]

const AllRegisteredSemester = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);

  type TRegisteredSemesterTableData = Pick<
    TSemester,
    "status" | "startDate" | "endDate"
  >;

  const tableData = semesterData?.data?.map(
    ({
      _id,
      status,
      startDate,
      endDate,
      academicSemester: { name, year },
      createdAt,
    }) => ({
      key: _id,
      _id,
      name: `${name} ${year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMM"),
      endDate: moment(new Date(endDate)).format("MMM"),
      createdAt:
        createdAt &&
        new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    })
  );

  const columns: TableColumnsType<TRegisteredSemesterTableData> = [
    {
      title: "Academic Semester",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item: string) => {
        let color;

        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
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

  //   const onChange: TableProps<TRegisteredSemesterTableData>["onChange"] = (
  //     pagination,
  //     filters,
  //     sorter,
  //     extra
  //   ) => {
  //     console.log("params", pagination, filters, sorter, extra);
  //   };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      //   onChange={onChange}
    />
  );
};

export default AllRegisteredSemester;

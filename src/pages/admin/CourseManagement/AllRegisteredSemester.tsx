import moment from "moment";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types";
import { Button, Dropdown, message, Table, TableColumnsType, Tag } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const AllRegisteredSemester = () => {
  const [updateSemesterRegistration] = useUpdateRegisteredSemesterMutation();
  const [semesterId, setSemesterId] = useState("");
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

  const handleStatusUpdate = async (data) => {
    const toastId = toast.loading("Updating...");
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = await updateSemesterRegistration(updateData).unwrap();

      console.log(res);

      if (res.success) {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
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

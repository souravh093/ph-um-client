import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourse = () => {
  const [id, setId] = useState("");;
  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);

  console.log(academicFaculties);

  const academicFacultiesOptions = academicFaculties?.data?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item?.name}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicFacultiesOptions ?? []}
          />
          <PHInput
            disabled={!id}
            type="number"
            label="Min Credit"
            name="minCredit"
          />
          <PHInput type="number" label="Max Credit" name="maxCredit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;

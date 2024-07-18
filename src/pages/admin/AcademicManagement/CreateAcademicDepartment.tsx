import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartmentDataType } from "../../../types/academicManagement.type";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data: academicFaculty, isLoading } =
    useGetAllAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const options =
    academicFaculty?.data.data?.map((item) => {
      return {
        label: item.name || "",
        value: item._id || "",
      };
    }) || [];
  console.log(academicFaculty);
  const onSubmit = async (data: Partial<TAcademicDepartmentDataType>) => {
    const res = await addAcademicDepartment(data).unwrap();

    try {
      if (res?.error) {
        toast.error(res?.error?.message);
      } else if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput label="Name" name="name" type="text" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={options}
            isLoading={isLoading}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;

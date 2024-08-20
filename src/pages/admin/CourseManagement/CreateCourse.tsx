import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Course = () => {
  const { data: allCourses } = useGetAllCoursesQuery(undefined);


  const [createCourse] = useCreateCourseMutation();

  const preRequisiteCoursesOptions =
    allCourses?.data?.map((item: any) => {
      return {
        label: item.title || "",
        value: item._id || "",
      };
    }) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses?.map((item: string) => ({
        course: item,
        isDeleted: false,
      })),
    };
    const res = await createCourse(courseData).unwrap();

    console.log(res)
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
          <PHInput label="Title" name="title" type="text" />
          <PHInput label="Prefix" name="prefix" type="test" />
          <PHInput label="Code" name="code" type="number" />
          <PHInput label="Credits" name="credits" type="Number" />
          <PHSelect
            mode="multiple"
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
            // isLoading={isLoading}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default Course;

import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/golobal";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartmentDataType } from "../../../types/academicManagement.type";
import { toast } from "sonner";

const StudentUpdate = () => {
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const semesterOptions =
    semesterData?.data?.map((item) => ({
      value: item._id || "",
      label: `${item.name} ${item.year}` || "",
    })) || [];

  const { data: aDepartmentData, isLoading: aDIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined, { skip: sIsLoading }); // COOL

  const departmentOptions =
    aDepartmentData?.data.map((item: Partial<TAcademicDepartmentDataType>) => ({
      value: item._id || "",
      label: item.name || "",
    })) || [];

  const [addStudent] = useAddStudentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentData = {
      password: "Passw0rd!",
      student: data,
    };
    console.log(data);
    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData)); 
    formData.append("file", data?.image);

    const res = await addStudent(formData);

    try {
      if(res.data?.success) {
        toast.success(res?.data?.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
    console.log(res);
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput label="First Name" type="text" name="name.firstName" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput label="Middle Name" type="text" name="name.middleName" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput label="Last Name" type="text" name="name.lastName" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHDatePicker label="Date of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      value={value?.fileName}
                      type="file"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider>Contact Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput label="Email" type="email" name="email" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput label="Contact Number" type="text" name="contactNo" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Emergency Contact Number"
                type="text"
                name="emergencyContactNo"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Present Address"
                type="text"
                name="presentAddress"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Permanent Address"
                type="text"
                name="permanentAddress"
              />
            </Col>
          </Row>

          <Divider>Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Father Name"
                type="text"
                name="guardian.fatherName"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Father Occupation"
                type="text"
                name="guardian.fatherOccupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Father Contact Number"
                type="text"
                name="guardian.fatherContactNo"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Mother Name"
                type="text"
                name="guardian.motherName"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Mother Occupation"
                type="text"
                name="guardian.motherOccupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Mother Contact Number"
                type="text"
                name="guardian.motherContactNo"
              />
            </Col>
          </Row>

          <Divider>Local Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Local Guardian Name"
                type="text"
                name="localGuardian.name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Local Guardian Occupation"
                type="text"
                name="localGuardian.occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Local Guardian Contact Number"
                type="text"
                name="localGuardian.contactNo"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHInput
                label="Local Guardian Address"
                type="text"
                name="localGuardian.address"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect
                options={semesterOptions}
                label="Admission Semester"
                name="admissionSemester"
                disable={sIsLoading}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PHSelect
                options={departmentOptions}
                label="Academic Department"
                name="academicDepartment"
                disable={sIsLoading}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;

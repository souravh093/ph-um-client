import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagementApi";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: studentDetails, isFetching } =
    useGetSingleStudentQuery(studentId);
  console.log(studentDetails, isFetching);

  return <div>student Details</div>;
};

export default StudentDetails;

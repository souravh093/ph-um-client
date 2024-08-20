export interface TAcademicSemesterDataType {
  key: React.Key;
  _id: string;
  name: string;
  startMonth: string;
  endMonth: string;
  year: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TAcademicFacultyDataType  {
  key: React.Key;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
} []

export interface TAcademicDepartmentDataType {
  key: React.Key;
  _id: string;
  name: string;
  academicFaculty: TAcademicFacultyDataType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
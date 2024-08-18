import { TQueryParam, TResponseRedux } from "../../../types";
import {
  TAcademicFacultyDataType,
  TAcademicSemesterDataType,
} from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TAcademicSemesterDataType[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AcademicFaculty"],
    }),
    getAllAcademicFaculties: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (
        response: TResponseRedux<TAcademicFacultyDataType[]>
      ) => {
        return {
          data: response,
        };
      },
      providesTags: ["AcademicFaculty"],
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartments: builder.query({
      query: () => {
        return {
          url: "/academic-departments",
          method: "GET",
        };
      }
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentsQuery,
} = academicManagement; 

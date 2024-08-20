import { TQueryParam, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => {
        return {
          url: "/semester-registrations/create-semester-registration",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["SemesterRegistration"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/semester-registrations/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["SemesterRegistration"],
    }),

    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["SemesterRegistration"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Course"]
    }),
    createCourse: builder.mutation({
      query: (data) => {
        return {
          url: `/courses/create-course`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Course"]
    }),
    addFaculties: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args.courseId}/assign-faculties`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["Course"]
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useAddFacultiesMutation,
} = courseManagement;

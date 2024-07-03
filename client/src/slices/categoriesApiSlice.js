import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } =
  userApiSlice;

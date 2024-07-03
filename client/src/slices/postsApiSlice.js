import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//no axios requests to fetch Post all done through redux toolkit
export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: POSTS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5, // chache data for 5 sec
      providesTags: ["POSTS"],
    }),
    getPostDetails: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
      providesTags: ["Post"],
    }),
  }),
});

// export access to these fetch calls like hooks:  use...Query or use...Mutation
export const {
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useUploadPostImageMutation,
  useDeletePostMutation,
} = postsApiSlice;

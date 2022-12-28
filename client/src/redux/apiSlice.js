import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
  tagTypes: ['List'],
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => '/lists',
      providesTags: ['List'],
    }),
    // getPost: builder.query({
    //   query: (postId) => `/posts/${postId}`,
    // }),
    // addNewPost: builder.mutation({
    //   query: (initialPost) => ({
    //     url: '/posts',
    //     method: 'POST',
    //     body: initialPost,
    //   }),
    //   invalidatesTags: ['Post'],
    // }),
  }),
});

export const {
  useGetListsQuery,
//   useGetPostQuery,
//   useAddNewPostMutation,
} = apiSlice;

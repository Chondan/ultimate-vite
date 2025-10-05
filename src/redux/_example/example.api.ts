import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exampleApi = createApi({
    reducerPath: 'exampleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    tagTypes: ['todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (arg) => {
                console.log({ arg });
                return '/todos';
            },
            transformResponse: (response: unknown[]) => response.slice(0, 10),
            providesTags: ['todos'],
        }),
        getTodo: builder.query({
            query: (id) => `/todos/${id}`,
        }),
        createTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['todos'],
        }),
        // Add more endpoints here
    }),
});

export const { useGetTodosQuery, useGetTodoQuery } = exampleApi;

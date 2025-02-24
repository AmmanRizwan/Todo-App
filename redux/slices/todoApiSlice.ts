import { apiSlice } from "./apiSlice";
const TODO_URL = "/api/todos";

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // @desc GET All the Todos
    // @route GET /api/todos
    alltodos: builder.mutation({
      query: () => `${TODO_URL}`,
    }),

    // @desc create a todo
    // @route POST /api/todos
    createtodo: builder.mutation({
      query: (data) => ({
        url: `${TODO_URL}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),

    // @desc get single todo
    // @route GET /api/todos/:id
    singletodo: builder.mutation({
      query: (id: string) => ({
        url: `${TODO_URL}/${id}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // @desc remove todo
    // @route DELETE /api/todos/:id
    removetodo: builder.mutation({
      query: (id: string) => ({
        url: `${TODO_URL}/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // @desc update a todo
    // @route PUT/PATCH /api/todos/:id
    edittodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TODO_URL}/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
  }),
});

export const {
  useAlltodosMutation,
  useCreatetodoMutation,
  useEdittodoMutation,
  useRemovetodoMutation,
  useSingletodoMutation,
} = todosApiSlice;

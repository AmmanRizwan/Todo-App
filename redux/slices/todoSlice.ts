import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const TodoSlice = createSlice({
  name: "todo_data",
  initialState,
  reducers: {
    insertdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { insertdata } = TodoSlice.actions;

export default TodoSlice.reducer;

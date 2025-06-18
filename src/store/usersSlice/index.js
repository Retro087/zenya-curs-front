import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchAuthMe, fetchReg } from "../authSlice";
import services from "../../services";

export const getUsers = createAsyncThunk("users/get", async () => {
  return services.usersAPI.getUsers();
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.list = action.payload.users;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = usersSlice.actions;

export default usersSlice.reducer;

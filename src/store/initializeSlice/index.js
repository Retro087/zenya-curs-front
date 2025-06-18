import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthMe } from "../authSlice";

export let initialize = createAsyncThunk("initial", async (_, thunkApi) => {
  try {
    await Promise.all([thunkApi.dispatch(fetchAuthMe())]);

    thunkApi.dispatch(succesInitialized());
    return true;
  } catch (error) {
    console.error("Initialization failed:", error);
    return thunkApi.rejectWithValue(error.message); // Важно обработать ошибку и вернуть rejectWithValue!
  }
});

export const initSlice = createSlice({
  name: "init",
  initialState: {
    initialized: false,
  },
  reducers: {
    succesInitialized(state) {
      state.initialized = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { succesInitialized } = initSlice.actions;

export default initSlice.reducer;

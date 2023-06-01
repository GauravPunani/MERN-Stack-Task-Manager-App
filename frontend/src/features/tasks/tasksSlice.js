import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../axios-interceptor";
import constants from "../../constants/endpoints";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (data) => {
  try {
    console.log("in request");
    let query = "";
    if (data.limit) query += "limit=" + data.limit;
    if (data.offset) query += "offset=" + data.offset;
    if (data.searchText) query += "q=" + data.searchText;

    const result = await authApi.get(`${constants.tasks_endpoint}?${query}`);
    return result?.data?.response?.data;
  } catch (error) {
    // Handle error, such as displaying an error message
    throw new Error("Failed to fetch tasks");
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (data) => {
  try {
    const result = await authApi.post(constants.tasks_endpoint, data);
    return result.data.response.data;
  } catch (error) {
    // Handle error, such as displaying an error message
    throw new Error("Failed to fetch tasks");
  }
});

export const editTask = createAsyncThunk("tasks/editTask", async (data) => {
  try {
    const result = await authApi.put(
      `${constants.tasks_endpoint}/${data.taskId}`,
      {
        title: data.title,
        description: data.description,
      }
    );
    console.log("after call", result);
    return data;
  } catch (error) {
    // Handle error, such as displaying an error message
    throw new Error("Failed to fetch tasks");
  }
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      const result = await authApi.delete(
        `${constants.tasks_endpoint}/${taskId}`
      );
      console.log("delete task result", result);
      return taskId;
    } catch (error) {
      // Handle error, such as displaying an error message
      throw new Error("Failed to fetch tasks");
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    isLoading: false,
    data: [],
    error: "",
    totalRecords: 0,
    limit: 10,
    offset: 0,
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log("padyload is", action.payload);
        state.isLoading = false;
        state.data = action.payload.tasks;
        state.totalRecords = action.payload.totalRecords;
        state.limit = action.payload.limit;
        state.offset = action.payload.offset;
        state.page = Math.ceil(
          action.payload.totalRecords / action.payload.limit
        );
        state.error = "";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
        state.totalRecords += 1;
        state.page = Math.ceil(state.totalRecords / state.limit);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter((task) => task._id !== action.payload);
        state.totalRecords -= 1;
        state.page = Math.ceil(state.totalRecords / state.limit);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        console.log("paylod is", action.payload);
        const taskIndex = state.data.findIndex(
          (task) => task._id === action.payload.taskId
        );
        console.log("index found is", taskIndex);
        state.data[taskIndex].title = action.payload.title;
        state.data[taskIndex].description = action.payload.description;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.data = [];
      });
  },
});

export default tasksSlice.reducer;

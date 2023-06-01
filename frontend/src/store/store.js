import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/tasksSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

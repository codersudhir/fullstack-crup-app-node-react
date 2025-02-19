import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTask, DeleteTask, Getalltasks, updateTaskStatus } from '../apis/api';
import Task from '../component/Task';

// Async thunks for API calls (replace with your actual API calls)
export const getTasks = createAsyncThunk('tasks/getTasks', async (params:any) => {
  const response = await Getalltasks(params) // Your API endpoint

  return response
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Task) => {
    const response = await createTask(task)
    return response;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: any) => {
  const status =task.status==="completed" ? "pending": "completed"
  const response = await updateTaskStatus(task._id,status)
  return response;
});


export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {

 await DeleteTask(taskId)
 return taskId; // Return the ID for updating the state
});



const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], loading: false, error: null ,currentPage:1, totalpages:1},
  reducers: {}, // You might have other reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        console.log("action",action)
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.currentPage=action.payload.currentPage
        state.totalpages=action.payload.totalPages
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        // state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task:any) => task.id === updatedTask.id);
       
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.tasks = state.tasks.filter((task:any) => task.id !== taskId);
      });

  },
});

export default taskSlice.reducer;
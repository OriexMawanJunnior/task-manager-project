// src/store/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk actions
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`http://localhost:5000/api/tasks?page=${page}&limit=${limit}`);
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData) => {
    const response = await axios.post('http://localhost:5000/api/tasks', taskData);
    return response.data;
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (id) => {
    const response = await axios.patch(`http://localhost:5000/api/tasks/${id}`, { completed: true });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    hasMore: true,
    filter: 'all',
    sidebarOpen: false
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.currentPage === 1) {
          state.items = action.payload;
        } else {
          state.items = [...state.items, ...action.payload];
        }
        state.hasMore = action.payload.length === 10;
        state.currentPage += 1;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      
      // Complete Task
      .addCase(completeTask.fulfilled, (state, action) => {
        const task = state.items.find(task => task._id === action.payload._id);
        if (task) {
          task.completed = true;
        }
      })
      
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task._id !== action.payload);
      });
  }
});

export const { setFilter, toggleSidebar } = taskSlice.actions;
export default taskSlice.reducer;
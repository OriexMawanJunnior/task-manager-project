const API_URL = process.env.REACT_APP_API_URL || '';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`${API_URL}/api/tasks?page=${page}&limit=${limit}`);
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData) => {
    const response = await axios.post(`${API_URL}/api/tasks`, taskData);
    return response.data;
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (id) => {
    const response = await axios.patch(`${API_URL}/api/tasks/${id}`, { completed: true });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    return id;
  }
);
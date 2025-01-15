import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    form: formReducer
  }
});
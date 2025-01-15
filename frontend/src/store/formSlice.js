import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isOpen: false,
    errors: {},
    submitting: false
  },
  reducers: {
    setFormOpen: (state, action) => {
      state.isOpen = action.payload;
      state.errors = {};
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload;
    }
  }
});

export const { setFormOpen, setErrors, setSubmitting } = formSlice.actions;
export default formSlice.reducer;

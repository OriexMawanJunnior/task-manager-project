import React from 'react';
import { Provider } from 'react-redux';
import "./App.css";
import { store } from './store';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
}

export default App;
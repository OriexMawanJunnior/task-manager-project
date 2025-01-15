import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from 'lucide-react';
import { toggleSidebar } from '../store/taskSlice';
import TaskForm from './TaskForm';

const TaskHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
      </div>
      <TaskForm />
    </div>
  );
};

export default TaskHeader;
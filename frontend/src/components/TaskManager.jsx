import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice';
import Sidebar from './Sidebar';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import TaskHeader from './TaskHeader';

const TaskManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({ page: 1 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <TaskHeader />
            <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
              <TaskTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskManager;
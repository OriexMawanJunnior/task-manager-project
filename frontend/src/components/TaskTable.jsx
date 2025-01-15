import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, CheckCircle, Trash2, Clock } from 'lucide-react';
import { completeTask, deleteTask, fetchTasks } from '../store/taskSlice';

const TaskTable = () => {
  const dispatch = useDispatch();
  const { items, status, filter, hasMore } = useSelector(state => state.tasks);

  const filteredTasks = items.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const handleLoadMore = () => {
    if (hasMore && status !== 'loading') {
      dispatch(fetchTasks({ page: Math.ceil(items.length / 10) + 1 }));
    }
  };

  if (status === 'loading' && items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${task.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-3">
                    {!task.completed && (
                      <button
                        onClick={() => dispatch(completeTask(task._id))}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Complete task"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(deleteTask(task._id))}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="flex justify-center p-4 border-t">
          <button
            onClick={handleLoadMore}
            disabled={status === 'loading'}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <div className="flex items-center">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No tasks found</p>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
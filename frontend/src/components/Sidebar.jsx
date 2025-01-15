import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, ListChecks, Clock, CheckCircle2 } from 'lucide-react';
import { setFilter, toggleSidebar } from '../store/taskSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, filter, items } = useSelector(state => state.tasks);

  const filters = [
    { id: 'all', label: 'All Tasks', icon: ListChecks },
    { id: 'incomplete', label: 'Pending', icon: Clock },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 }
  ];

  const getTaskCount = (filterType) => {
    return items.filter(task => {
      if (filterType === 'completed') return task.completed;
      if (filterType === 'incomplete') return !task.completed;
      return true;
    }).length;
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform 
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
    `}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {filters.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                    ${filter === id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  onClick={() => {
                    dispatch(setFilter(id));
                    if (window.innerWidth < 1024) {
                      dispatch(toggleSidebar());
                    }
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{label}</span>
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {getTaskCount(id)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
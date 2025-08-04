// src/components/Sidebar/Sidebar.js

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-200">
        My Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded"
        >
          Users
        </Link>
        <Link
          to="/settings"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded"
        >
          Settings
        </Link>
        <Link
          to="/reports"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded"
        >
          Reports
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
        © 2025 Your Company
      </div>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Binary, CalendarDays, Youtube, Bell, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-[#1E1E1E] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Binary className="w-8 h-8 text-emerald-500" />
            <span className="text-xl font-bold">CodeHelp</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <NavLink to="/" icon={<LayoutDashboard />} active={isActive('/')}>
              Dashboard
            </NavLink>
            <NavLink 
              to="/algorithm-visualizer" 
              icon={<Binary />} 
              active={isActive('/algorithm-visualizer')}
            >
              Algorithm Visualizer
            </NavLink>
            <NavLink 
              to="/task-manager" 
              icon={<CalendarDays />} 
              active={isActive('/task-manager')}
            >
              Task Manager
            </NavLink>
            <NavLink 
              to="/youtube-learning" 
              icon={<Youtube />} 
              active={isActive('/youtube-learning')}
            >
              YouTube Learning
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Bell className="w-5 h-5" />
            </button>
            <Link to="/profile">
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <User className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, active, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors
      ${active ? 'text-emerald-500' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Navbar;

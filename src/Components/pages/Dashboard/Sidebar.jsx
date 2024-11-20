import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaChartPie, 
  FaUsers, 
  FaToolbox, 
  FaBriefcase, 
  FaStar, 
  FaSignOutAlt,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaChartPie className="w-5 h-5" />
    },
    {
      path: '/admin/users',
      name: 'Users',
      icon: <FaUsers className="w-5 h-5" />
    },
    {
      path: '/admin/workers',
      name: 'Workers',
      icon: <FaToolbox className="w-5 h-5" />
    },
    {
      path: '/admin/jobtypes',
      name: 'Job Types',
      icon: <FaBriefcase className="w-5 h-5" />
    },
    {
      path: '/admin/reviews',
      name: 'Reviews',
      icon: <FaStar className="w-5 h-5" />
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Xử lý logout ở đây
    navigate('/login');
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-blue-600 to-blue-400 text-white transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700 transition-all duration-200"
      >
        {isCollapsed ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
      </button>

      {/* Header */}
      <div className={`flex items-center p-6 border-b border-blue-700 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <img src="../../../Assets/logokhotho.png" alt="Logo" className="w-8 h-8" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-white">KhoTho</h1>
            <p className="text-sm text-blue-200">Management System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-blue-700'
                }`}
              >
                <span className={`${isActive(item.path) ? 'text-blue-600' : 'text-white'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-4`}>
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">KT</span>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-white">KhoTho</p>
              <p className="text-xs text-blue-200">khotho.24h@gmail.com</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          } px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700 text-white`}
        >
          <FaSignOutAlt className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
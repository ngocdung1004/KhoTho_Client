import React, { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [workerJobTypes, setWorkerJobTypes] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [jobTypesRes, usersRes, workersRes, workerJobTypesRes] = await Promise.all([
        fetch('https://localhost:7062/api/JobTypes'),
        fetch('https://localhost:7062/api/Users'),
        fetch('https://localhost:7062/api/Workers'),
        fetch('https://localhost:7062/api/WorkerJobTypes')
      ]);

      const jobTypesData = await jobTypesRes.json();
      const usersData = await usersRes.json();
      const workersData = await workersRes.json();
      const workerJobTypesData = await workerJobTypesRes.json();

      setJobTypes(jobTypesData);
      setUsers(usersData);
      setWorkers(workersData);
      setWorkerJobTypes(workerJobTypesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Prepare data for pie chart
  const userTypeData = [
    { name: 'Khách hàng', value: users.filter(u => u.userType === 1).length },
    { name: 'Thợ', value: users.filter(u => u.userType === 2).length },
    { name: 'Admin', value: users.filter(u => u.userType === 0).length }
  ];

  // Prepare data for bar chart
  const jobTypeStats = jobTypes.map(jobType => ({
    name: jobType.jobTypeName,
    value: workerJobTypes.filter(wjt => wjt.jobTypeId === jobType.jobTypeId).length
  }));

  const COLORS = ['#3B82F6', '#F59E0B', '#6366F1', '#EF4444'];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Xin chào, Welcome back 👋</span>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng người dùng</p>
                <h3 className="text-2xl font-bold">{users.length}</h3>
              </div>
              <span className="text-blue-500">👥</span>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng thợ</p>
                <h3 className="text-2xl font-bold">{workers.length}</h3>
              </div>
              <span className="text-purple-500">👷</span>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Loại công việc</p>
                <h3 className="text-2xl font-bold">{jobTypes.length}</h3>
              </div>
              <span className="text-yellow-500">🛠️</span>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Công việc đã đăng ký</p>
                <h3 className="text-2xl font-bold">{workerJobTypes.length}</h3>
              </div>
              <span className="text-red-500">📋</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Phân bố người dùng</h3>
            <div className="flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={userTypeData}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {userTypeData.map((data, index) => (
                <div key={data.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{data.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Thống kê theo loại công việc</h3>
            <div className="h-64">
              <BarChart width={500} height={250} data={jobTypeStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card, Table, Row } from "react-bootstrap";
import axios from "axios";

import Logo from "../common/logo";
import NavBar from "../NavBarLogin/NavBar";
import avatar1 from "../../Assets/user/avatar-1.jpg";
import avatar2 from "../../Assets/user/avatar-2.jpg";
import avatar3 from "../../Assets/user/avatar-3.jpg";
import * as config from "../../config.jsx";
import { API_ENDPOINT } from "../../config";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";

import "./styles/Customer.css";

const Customer = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    axios
      .get(`${API_ENDPOINT}/api/Users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Tìm người đầu tiên có workerId = 0
  const firstUserWithWorkerId0 = users.find((user) => user.userType === 0);
  console.log(firstUserWithWorkerId0);
  // Tính số lượng người dùng
  const totalUsers = users.length;

  // Tính số lượng người dùng có workerId = 2
  const usersWithWorkerId2Count = users.filter(
    (user) => user.userType === 2
  ).length;

  const getAvatar = (userType) => {
    switch (userType) {
      case 0:
        return avatar1;
      case 1:
        return avatar2;
      case 2:
        return avatar3;
      default:
        return avatar1; // ảnh mặc định nếu userType không hợp lệ
    }
  };

  return (
    <div className="w-[85%] m-auto white-color-sl">
      <NavBar />
      {/* <BrowserRouter > */}
      <div className="Customer-flex">
        <div className="flex flex-1 bg-gray-50">
          <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white navbar-vertical">
              <div className="logo-manager">
                <Logo class="logo-nav-vertical" />
              </div>

              <div className="px-4 mt-8">
                <label for="" className="sr-only">
                  {" "}
                  Search{" "}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>

                  <input
                    type="search"
                    name=""
                    id=""
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                    placeholder="Search here"
                  />
                </div>
              </div>

              <div className="px-4 mt-6">
                <hr className="border-gray-200" />
              </div>

              <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                  <nav className="flex-1 space-y-2">
                    <a
                      href="#"
                      title=""
                      className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Dashboard
                    </a>

                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Analytics
                    </a>

                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Agents
                    </a>

                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Members
                      <svg
                        className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>
                  </nav>
                  <hr className="border-gray-200" />
                  <nav className="flex-1 space-y-2">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      Products
                    </a>

                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      Orders
                    </a>

                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                      </svg>
                      Storage
                      <svg
                        className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>
                  </nav>
                  <hr className="border-gray-200" />
                  <nav className="flex-1 space-y-2">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </a>

                    <a
                      onClick={() => navigate("/login")}
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group cursor-pointer"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <main>
              <div className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8"></div>
              </div>
            </main>
          </div>
        </div>

        <div>
          <Row>
            {/* Hiển thị thông tin người đầu tiên có workerId = 0 */}
            {firstUserWithWorkerId0 && (
              <Col
                xl={6}
                xxl={4}
                className="col-navbar-show-gene-body white-color-sl"
              >
                <Card className="navbar-show-gene">
                  <Card.Body className="navbar-show-gene-body">
                    <h6 className="H6-mb-4">Administrator</h6>
                    <h3 className="H3-mb-4 name-Administrator info-Administrator">
                      <img
                        className="rounded-circle "
                        style={{ width: "40px", marginRight: "10px" }}
                        src={avatar1}
                        alt="avatar"
                      />
                      {firstUserWithWorkerId0.fullName}
                    </h3>
                    <p className="info-Administrator">
                      Email: {firstUserWithWorkerId0.email}
                    </p>
                    <p className="info-Administrator">
                      Phone: {firstUserWithWorkerId0.phoneNumber}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            )}

            {/* Hiển thị tổng số người dùng */}
            <Col xl={6} xxl={4} className="white-color-sl">
              <Card className="navbar-show-gene">
                <Card.Body className="navbar-show-content navbar-show-gene-body">
                  <div className="navbar-show-content">
                    <h6 className="H6-mb-4">Total Users</h6>
                    <h3 className="f-w-300">
                      <PeopleAltIcon
                        fontSize="inherit"
                        className="icon-navbar-info"
                      />
                      {totalUsers}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Hiển thị số lượng người dùng có workerId = 2 */}
            <Col xl={6} xxl={4} className="white-color-sl">
              <Card className="navbar-show-gene">
                <Card.Body className="navbar-show-gene-body">
                  <div className="navbar-show-content">
                    <h6 className="H6-mb-4">Total Workers</h6>
                    <h3 className="f-w-300">
                      <EngineeringIcon
                        fontSize="inherit"
                        className="icon-navbar-info"
                      />
                      {usersWithWorkerId2Count}
                    </h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Bảng hiển thị người dùng */}
          <Col style={{ paddingTop: "30px" }} className="white-color-sl">
            <Card className="Recent-Users">
              <Card.Body className="px-0 py-2">
                <Table responsive hover className="recent-users">
                  <thead>
                    <tr>
                      <th>Profile Picture</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId} className="unread">
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ width: "40px" }}
                            src={getAvatar(user.userType)} // Dùng `getAvatar(user.userType)` nếu có nhiều loại avatar
                            alt="profile"
                          />
                        </td>
                        <td>
                          <h6 className="mb-1">{user.fullName}</h6>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Customer;

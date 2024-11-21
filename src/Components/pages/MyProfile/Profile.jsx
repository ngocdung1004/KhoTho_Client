import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import "./Profile.css";

import NavBar from '../../NavBarLogin/NavBar'
import Footer from '../../FooterDiv/Footer'
import avatar1 from '../../../Assets/user/avatar-1.jpg';

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        console.log(userData)
        setUser(userData);
        setFormData(userData);
      }
    } catch (error) {
      setNotification({
        open: true,
        message: "Lỗi khi tải thông tin người dùng",
        severity: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
      setNotification({
        open: true,
        message: "Cập nhật thông tin thành công!",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Lỗi khi cập nhật thông tin",
        severity: "error",
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="w-[85%] m-auto white-color-sl">
      <NavBar/>
      {notification.open && (
        <div className={`notification ${notification.severity}`}>
          <span>{notification.message}</span>
          <button
            className="close-btn"
            onClick={() => setNotification({ ...notification, open: false })}
          >
            X
          </button>
        </div>
      )}

      {!user ? (
        <p className="loading-text">Đang tải dữ liệu...</p>
      ) : (
        <div className="profile-content">
          <div className="block-above">
            <div className="profile-image-container relative inline-block mb-6">
                          <img
                          src={profileImage || avatar1}
                          alt="Profile"
                          className="profile-image w-60 h-60 rounded-full border-4 border-gray-300 shadow-lg transition-all duration-300 hover:scale-105"
                          />
                          <input
                          type="file"
                          id="fileUpload"
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                          />
                          <label
                          htmlFor="fileUpload"
                          className="upload-icon absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-3 cursor-pointer transition-all duration-300 transform hover:scale-110"
                          >
                          📷
                          </label>
                      </div>
            <div className="profile-header">
              <h1>Thông tin cá nhân</h1>
            </div>
          </div>
          <div className="profile-body">
            <div className="info-card">
              <h2>Thông tin chính</h2>
              <div className="info-row">
                <span className="info-label">Họ và tên:</span>
                <span>{user.fullName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Số điện thoại:</span>
                <span>{user.phoneNumber}</span>
              </div>
            </div>

            <div className="info-card">
              <h2>Địa chỉ</h2>
              <p>{user.address}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="form-container">
              <h2>Chỉnh sửa thông tin</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn save-btn">
                    Lưu thay đổi
                  </button>
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button className="btn edit-btn" onClick={() => setIsEditing(true)}>
              Chỉnh sửa thông tin
            </button>
          )}
        </div>
      )}
    {/* <Footer/> */}
    </div>
  );
}

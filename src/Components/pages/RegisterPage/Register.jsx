import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { Snackbar, Alert } from "@mui/material";
import bgrLogin from "../../../Assets/bgr-login.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setNotification({
        open: true,
        message: "Mật khẩu không khớp!",
        severity: "error",
      });
      return;
    }

    try {
      const userData = await authService.register(email, password);
      if (userData && userData.token) {
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("userType", userData.userType);
        localStorage.setItem("userData", JSON.stringify(userData));

        setNotification({
          open: true,
          message: "Đăng ký thành công!",
          severity: "success",
        });

        setTimeout(() => {
          switch (userData.userType) {
            case 0: navigate("/dashboard"); break;
            case 1: navigate("/jobs"); break;
            case 2: navigate("/workers"); break;
            default: navigate("/");
          }
        }, 1000);
      }
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data || "Lỗi khi đăng ký! Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${bgrLogin})`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay',
        filter: 'brightness(1)',
        opacity: 0.85,
      }}
    >
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <img
                className="mx-auto w-24 h-24 object-contain"
                src="../src/Assets/logokhotho.png"
                alt="logo"
              />
              <h4 className="mt-4 text-2xl font-bold text-gray-800">
                VIỆC LÀM GẤP, THỢ TỚI TẤP
              </h4>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <p className="text-center text-gray-600">
                Vui lòng đăng ký tài khoản của bạn
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/80"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/80"
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/80"
                    placeholder="Xác nhận mật khẩu của bạn"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
                onClick={handleRegister}
              >
                Đăng ký
              </button>

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">Bạn đã có tài khoản?</p>
                <button
                  className="px-4 py-2 text-sm font-medium text-pink-500 border-2 border-pink-500 rounded-lg hover:bg-pink-50 transition-colors duration-300"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
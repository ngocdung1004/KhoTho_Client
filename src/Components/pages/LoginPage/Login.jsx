import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { TEInput, TERipple } from "tw-elements-react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const userData = await authService.login(email, password);

      if (userData && userData.token) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("userType", userData.userType);
        localStorage.setItem("userData", JSON.stringify(userData));

        setNotification({
          open: true,
          message: "Đăng nhập thành công!",
          severity: "success",
        });

        // Điều hướng dựa trên userType
        setTimeout(() => {
          switch (userData.userType) {
            case 0:
              navigate("/dashboard");
              break;
            case 1:
              navigate("/jobs");
              break;
            case 2:
              navigate("/workers");
              break;
            default:
              navigate("/");
          }
        }, 1000);
      }
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data || "Lỗi khi đăng nhập! Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-neutral-200 dark:bg-neutral-700">
      {/* Thông báo đăng nhập */}
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

      {/* Form đăng nhập */}
      <div className="w-full max-w-md p-10">
        <div className="bg-white shadow-lg dark:bg-neutral-800 rounded-lg">
          <div className="p-8">
            <div className="text-center mb-8">
              <img
                className="mx-auto w-24"
                src="..\src\Assets\logokhotho.png"
                alt="logo"
              />
              <h4 className="mt-4 text-xl font-semibold">
                VIỆC LÀM GẤP, THỢ TỚI TẤP
              </h4>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <p className="mb-4 text-center">
                Vui lòng đăng nhập vào tài khoản của bạn
              </p>

              {/* Email input */}
              <div className="input-container mb-4">
                <label className="input-label" htmlFor="email">
                  Email
                </label>
                <TEInput
                  type="text"
                  id="email"
                  placeholder="Nhập email của bạn"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="input-container mb-4">
                <label className="input-label" htmlFor="password">
                  Mật khẩu
                </label>
                <div className="relative">
                  <TEInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Nhập mật khẩu của bạn"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      size="small"
                      style={{ color: "#666" }}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </div>
                </div>
              </div>

              {/* Nút Đăng nhập */}
              <div className="text-center mb-4">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    className="inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                    onClick={handleLogin}
                  >
                    Đăng nhập
                  </button>
                </TERipple>
                <a
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-neutral-600 mt-2 inline-block cursor-pointer hover:text-neutral-700"
                >
                  Quên mật khẩu?
                </a>
              </div>

              {/* Đăng ký */}
              <div className="flex items-center justify-between pb-6">
                <p className="mb-0 mr-2 text-sm">Bạn chưa có tài khoản?</p>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded border-2 border-danger px-6 py-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600"
                    onClick={() => navigate("/register")}
                  >
                    Đăng kí
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

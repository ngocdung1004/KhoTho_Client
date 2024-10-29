// ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TEInput, TERipple } from "tw-elements-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp+password
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ForgotPassword.jsx
const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Vui lòng nhập email hợp lệ!");
      return;
    }

    try {
      // Kiểm tra email tồn tại bằng API GetUserByEmail
      const checkEmailResponse = await axios.get(
        `https://localhost:7062/api/Users/email/${encodeURIComponent(email)}`
      );

      if (checkEmailResponse.data) {
        // Email tồn tại, tiến hành gửi OTP
        const response = await axios.post(
          "https://localhost:7062/api/Password/forgot-password",
          { email }
        );
        
        setConfirmedEmail(email);
        setSuccessMessage("Mã OTP đã được gửi đến email của bạn!");
        setStep(2);
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Email không tồn tại trong hệ thống. Vui lòng kiểm tra lại!");
      } else {
        setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại sau!");
      }
    }
};
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7062/api/Password/reset-password",
        {
          email: confirmedEmail,
          otp,
          newPassword,
        }
      );
      setSuccessMessage("Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage("Mã OTP không đúng hoặc đã hết hạn. Vui lòng thử lại!");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="w-full max-w-md p-10">
        <div className="bg-white shadow-lg dark:bg-neutral-800 rounded-lg">
          <div className="p-8">
            <div className="text-center mb-8">
              <img
                className="mx-auto w-24"
                src="..\src\Assets\logokhotho.png"
                alt="logo"
              />
              <h4 className="mt-4 text-xl font-semibold">Quên Mật Khẩu</h4>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 ? (
                <div className="input-container mb-4">
                  <label className="input-label" htmlFor="email">
                    Email
                  </label>
                  <TEInput
                    type="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="text-center mt-4">
                    <TERipple rippleColor="light" className="w-full">
                      <button
                        className="inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out"
                        style={{
                          background:
                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        }}
                        onClick={handleSendOTP}
                      >
                        Gửi mã OTP
                      </button>
                    </TERipple>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                      Đang gửi mã OTP đến email: <strong>{confirmedEmail}</strong>
                    </p>
                  </div>
                  <div className="input-container mb-4">
                    <label className="input-label" htmlFor="otp">
                      Mã OTP
                    </label>
                    <TEInput
                      type="text"
                      id="otp"
                      placeholder="Nhập mã OTP"
                      className="input-field"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="input-container mb-4">
                    <label className="input-label" htmlFor="newPassword">
                      Mật khẩu mới
                    </label>
                    <TEInput
                      type="password"
                      id="newPassword"
                      placeholder="Nhập mật khẩu mới"
                      className="input-field"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <TERipple rippleColor="light" className="w-full">
                      <button
                        className="inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out"
                        style={{
                          background:
                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        }}
                        onClick={handleResetPassword}
                      >
                        Đặt lại mật khẩu
                      </button>
                    </TERipple>
                  </div>
                </>
              )}

              <div className="text-center mt-4">
                <button
                  className="text-sm text-neutral-600 hover:text-neutral-700"
                  onClick={() => navigate("/login")}
                >
                  Quay lại đăng nhập
                </button>
              </div>
            </form>

            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
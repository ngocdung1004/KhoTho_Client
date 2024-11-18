import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";

export default function Profile() {
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

  if (!user) {
    return <Typography variant="h6" textAlign="center">Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4, mx: "auto", maxWidth: 600 }}>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Thông tin cá nhân
          </Typography>

          {!isEditing ? (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Họ và tên:</strong> {user.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Số điện thoại:</strong> {user.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Địa chỉ:</strong> {user.address}
                  </Typography>
                </Grid>
              </Grid>

              <Box textAlign="center" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa thông tin
                </Button>
              </Box>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Box textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mr: 2 }}
                >
                  Lưu thay đổi
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

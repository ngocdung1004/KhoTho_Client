import React from 'react';
import './VietQR.css'; // Import file CSS

const VietQR = ({ bankId, accountNo, amount, description, accountName, template = 'compact' }) => {
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

  return (
    <div className="vietqr-container">
      {/* <h3 className="vietqr-title">Mã QR Thanh Toán</h3> */}
      <div className="vietqr-qr-container">
        <img src={qrUrl} alt="VietQR Payment" className="vietqr-image" />
      </div>
      <div className="vietqr-info-container">
        <p className="vietqr-info"><span>Ngân hàng:</span> {bankId}</p>
        <p className="vietqr-info"><span>Tên tài khoản:</span> {accountName}</p>
        <p className="vietqr-info"><span>Số tài khoản:</span> {accountNo}</p>
        <p className="vietqr-info"><span>Số tiền:</span> {amount ? `${amount.toLocaleString()} VND` : 'Không có số tiền cụ thể'}</p>
        <p className="vietqr-info"><span>Mô tả:</span> {description || 'Không có mô tả'}</p>
      </div>
      {/* <a href={qrUrl} download="VietQR.png" className="vietqr-download-button">
        Tải Mã QR
      </a> */}
    </div>
  );
};

export default VietQR;

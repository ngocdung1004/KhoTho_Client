import React, { useEffect, useState } from 'react';
import Footer from '../../FooterDiv/Footer';
import NavBar from '../../NavBarLogin/NavBar';
import Search from '../../SearchNOFilter/Search'
import axios from "axios";

import { API_ENDPOINT } from "../../../services/config";

import * as config from "../../../services/config";
import "./OrderTracking.css"

import { useParams, useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import { ContactSupportOutlined } from '@mui/icons-material';
import VietQR from './../../VietQR/VietQR';
import wor2 from '../../../Assets/w2.png';

const OrderTracking = () => {
    const [jobTypeMapping, setJobTypeMapping] = useState({});
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRatingStep, setRatingStep] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [isBoxCompleted, setIsBoxCompleted] = useState(false);
    const [isEndRating, setIsEndRating] = useState(false);

    const [loading, setLoading] = useState(true); // Trạng thái loading
    const userDataString = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem('authToken')
    const location = useLocation();
    const booking_id = location.state;

    const [dataBookingOrder, setDataBookingOrder] = useState(null);
    const [dataWorkerOrder, setDataWorkerOrder] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('default-avatar.png');
    const [isCancel, setIsCancel] = useState(false);
    const [isCancelOpen, setCancelOpen] = useState(false);

    const [bankId, setbankId] = useState("ACB");
    const [accountBankNo, setaccountBankNo] = useState("13157957");
    const [accountNameBank, setaccountNameBank] = useState("Ha Khai Hoan");
    const [databookingpayment, setdatabookingpayment] = useState(null)
    const [isConfirmedPayment, setisConfirmedPayment] = useState(false);

    const handleConfirmPayment = () => {
        setisConfirmedPayment(true); // Chuyển trạng thái sang đã xác nhận
      };

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Chuẩn hóa chuỗi Unicode
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
            .replace(/đ/g, "d") // Chuyển đổi chữ đ
            .replace(/Đ/g, "D") // Chuyển đổi chữ Đ
            .replace(/\s+/g, "") // Xóa khoảng trắng
            .toUpperCase(); // Chuyển tất cả chữ thành viết hoa
    };

    const [starttrack, setstarttrack] = useState(null);
    const [endtrack, setendtrack] = useState(null);
    const [daytrack, setdaytrack] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response_book = await axios.get(`${API_ENDPOINT}/api/Booking/${booking_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const response_bookingpayment = await axios.get(`${API_ENDPOINT}/api/BookingPayment/booking/${booking_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setdatabookingpayment(response_bookingpayment.data)
                console.log("+++", response_bookingpayment.data)

                setstarttrack(response_book.data.startTime.split(':')[0]);
                setendtrack(response_book.data.endTime.split(':')[0]);
                setdaytrack(dayjs(response_book.data.bookingDate).format('DD/MM/YYYY'));

                const response_worker = await axios.get(
                    `${API_ENDPOINT}/api/Workers/${response_book.data.workerID}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const imageUrl = response_worker.data.profileImage 
                        ? `${API_ENDPOINT}${response_worker.data.profileImage}` 
                        : '/default-avatar.png'; 
                        setProfileImageUrl(imageUrl);

                const response_jobtype = await axios.get(
                    `${API_ENDPOINT}/api/JobTypes`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const jobTypeData =  response_jobtype.data;

                const mapping = jobTypeData.reduce((acc, job) => {
                    acc[job.jobTypeId] = job.jobTypeName;
                    return acc;
                }, {});

                setJobTypeMapping(mapping);
                setDataBookingOrder(response_book.data);
                setDataWorkerOrder(response_worker.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching booking details:", error);
                setLoading(false);
            }
        };
        fetchBookingDetails()
    }, [booking_id, token]);

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Đang tải dữ liệu...</p>
                {/* Bạn có thể thay thế bằng một spinner hoặc hiệu ứng loading khác */}
            </div>
        );
    }

    if (!dataBookingOrder || !dataWorkerOrder) {
        return (
            <div className="error-screen">
                <p>Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    const WORKER_name = dataWorkerOrder.user.fullName
    const WORKER_address = dataWorkerOrder.user.address
    // const WORKER_jobType = dataWorkerOrder.user.userType
    const WORKER_phone = dataWorkerOrder.user.phoneNumber
    const WORKER_EXP = dataWorkerOrder.experienceYears

    const handleConfirm = () => {
        setIsBoxCompleted(true);
        
    };
    

    const handleOpenModal = () => {
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
        setRatingStep(false);
        setIsBoxCompleted(false)
        setRating(0);
        setComment('');
    };
    const handleCancelOpenModal = () => {
        setCancelOpen(true);

    }



    const handleCancelCloseModal = () => {
        setCancelOpen(false)
    };



    const handleConfirmJob = () => {
        setRatingStep(true);
        setIsCompleted(true);
    }

    const handleCancelConfirmJob = () => {
        setIsCancel(true);
        setRatingStep(true);
        setIsCompleted(true);
        setIsEndRating(true)
    }

    

    const handleExitCancel= () => {
        setIsCancel(false);
        setCancelOpen(false)
        setRatingStep(false);
        setIsCompleted(false);
        setIsEndRating(false)
    }

    const handleSubmitRating = async () => {
        try {

            const payload = {
                workerId: dataBookingOrder.workerID,  
                customerId: dataBookingOrder.customerID,  
                rating: rating,  
                comments: comment,  
            };
    
            // Gửi POST request
            const response_rating = await axios.post(
                `${API_ENDPOINT}/api/Reviews`, 
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            const status = "Completed"; 
            const response_status = await axios.put(
                `${API_ENDPOINT}/api/Booking/${booking_id}/status`,  
                `${status}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',  
                        'Authorization': `Bearer ${token}`,  
                    }
                }
            );

            setIsEndRating(true);  
            handleCloseModal(); 
            window.location.reload()  ///reload page 
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
        }
    };

    const handleSubmitCancel = async () => {
        try {

            const status = "Rejected"; 
            const response_status = await axios.put(
                `${API_ENDPOINT}/api/Booking/${booking_id}/status`,  
                `${status}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',  
                        'Authorization': `Bearer ${token}`,  
                    }
                }
            );
            window.location.reload()

        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
        }
    };

    const getStepClass = (status, step) => {
        if (status === "Rejected") {
          return step === 1 ? "completed" : "rejected"; // Mốc 1 xanh, các mốc còn lại đỏ
        }
      
        if (status === "Completed" && step <= 4) {
          return "completed"; // Tất cả các mốc xanh khi Completed
        }
      
        if (status === "Accepted" && step <= 3) {
          return "completed"; // Mốc 1, 2, 3 xanh khi Accepted
        }
      
        if (status === "Pending" && step === 1) {
          return "completed"; // Mốc 1 xanh khi Pending
        }
      
        return "active"; // Các mốc còn lại chưa hoàn thành
      };
      
      const getStepIcon = (status, step) => {
        if (status === "Rejected") {
          return step === 1 ? "✔" : "✖"; // Mốc 1 dấu ✔, các mốc còn lại dấu X
        }
      
        if (status === "Completed" && step <= 4) {
          return "✔"; // Dấu tích cho tất cả mốc khi Completed
        }
      
        if (status === "Accepted" && step <= 3) {
          return "✔"; // Dấu tích cho mốc 1, 2, 3 khi Accepted
        }
      
        if (status === "Pending" && step === 1) {
          return "✔"; // Dấu tích cho mốc 1 khi Pending
        }
      
        return "!"; // Dấu chấm than cho mốc chưa hoàn thành
      };
      
      const progressStepColor = (status, step) => {
        if (status === "Rejected") {
          return step === 1 ? "green" : "red"; // Mốc 1 xanh, các mốc còn lại đỏ
        }
      
        return "green"; // Màu xanh khi hoàn thành
      };


    return (
        <div className="w-[85%] m-auto white-color-sl">
            <NavBar />

            <div className="body-check">

                <div className='title'>
                    <h2 className="section-title" data-wow-delay="0.3s">THEO DÕI ĐƠN</h2>
                    <div className="symbol-container">
                        <span>🛒</span>  
                    </div>
                </div>

                <div className='progressBlock'>
                    <div className='progressTitle'>
                    <h3 className="progressTitle-content" data-wow-delay="0.3s">Tiến độ</h3>
                    </div>
                    <div className="progressContainer">
                    {[...Array(4)].map((_, index) => {
                        const step = index + 1;
                        const statusClass = getStepClass(dataBookingOrder.status, step);
                        const stepIcon = getStepIcon(dataBookingOrder.status, step);
                        const stepColor = progressStepColor(dataBookingOrder.status);

                        return (
                        <React.Fragment key={step}>
                            <div className={`progressStep ${statusClass}`} style={{ color: stepColor }}>
                            <div className="stepIcon">{stepIcon}</div>
                            <span className="stepLabel">
                                {step === 1 ? "Booking" : step === 2 ? "Đã xác nhận" : step === 3 ? "Đang thực hiện" : "Hoàn thành"}
                            </span>
                            </div>
                            {step < 4 && <div className="connector"></div>}
                        </React.Fragment>
                        );
                    })}
                    </div>
                </div>

                <div className="header">
                    <div className='header-left'>
                        <span className="totalAmount-title">Mã đơn:</span>
                        <span className="totalAmount">{dataBookingOrder.bookingID}-{removeVietnameseTones(WORKER_name)}</span>
                    </div>
                    <div className='header-right'>
                        <div className='Amount-Block'>
                            <span className="totalAmount-title">Tổng số tiền</span>
                            <span className="totalAmount">đ̲{dataBookingOrder.totalAmount}</span>
                        </div>
                        <div className='button-block'>
                        {["Rejected", "Completed"].includes(dataBookingOrder.status) ? null : (
                            <>
                                {!isCompleted && (
                                    <button className="placeOrderButton" onClick={handleConfirm}>
                                        Xác nhận hoàn thành
                                    </button>
                                )}
                                {!isEndRating && databookingpayment.paymentStatus === "Success" && (
                                    <button className="placeOrderButton" onClick={handleOpenModal}>
                                        Đánh giá
                                    </button>
                                    )}

                                {dataBookingOrder.status === "Pending" && !isCancel && databookingpayment.paymentStatus === "Pending" && (
                                    <button className="placeOrderButton placeOrderButtonCancel" onClick={handleCancelOpenModal}>
                                        Hủy
                                    </button>
                                )}
                            </>
                        )}

                        </div>
                    </div>
                </div>
                
                
                <div>
                    <div className='progressTitle'>
                        <h3 className="progressTitle-content" data-wow-delay="0.3s">Thông tin chi tiết</h3>
                    </div>
                    <div className="infoSection">
                        <div className="info-card">
                            <div className="card-header">
                                <span className="card-title">Thông tin của bạn</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="card-content">
                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=x0qTmzjcFRhW&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                    <p>{userDataString.fullName}</p>
                                </div>

                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=X0mEIh0RyDdL&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                    <p>{userDataString.email}</p>
                                </div>

                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=a-NKVP7cWRva&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                    <p>{userDataString.address}</p>
                                </div>

                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=2et9LpHu9Vxh&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                    <p>{userDataString.phoneNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="card-header">
                                <span className="card-title">Thông tin của thợ</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="card-content">
                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=2upK8qlqCAEf&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                    <p>{WORKER_name}</p>
                                </div>
                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=a-NKVP7cWRva&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                    <p>{WORKER_address}</p>
                                </div>
                                <div className="schedule-item">
                                    <img src="https://img.icons8.com/?size=100&id=2et9LpHu9Vxh&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                <p>{WORKER_phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                        <div className="card-header">
                            <span className="card-title">Lịch trình công việc</span>
                        </div>
                        <div className="card-content">
                            <div className="schedule-item">
                            <img src="https://img.icons8.com/?size=100&id=12776&format=png&color=000000" alt="Visa" className="paymentIcon" />
                            <p>{daytrack}</p>
                            </div>
                            <div className="schedule-item">
                            <img src="https://img.icons8.com/?size=100&id=RfNbsrywO87P&format=png&color=000000" alt="Visa" className="paymentIcon" />
                            <p>Bắt đầu: {starttrack}:00 h</p>
                            </div>
                            <div className="schedule-item">
                            <img src="https://img.icons8.com/?size=100&id=Y6SzeUtiLnxL&format=png&color=000000" alt="Visa" className="paymentIcon" />
                            <p>Kết thúc: {endtrack}:00 h</p>
                            </div>
                        </div>
                        <div className="wor2IMAGEbox">
                            <img
                                className="wor2IMAGE"
                                src={wor2}
                                alt="avatar"
                                />
                        </div>

                        </div>


                        <div className="info-card">
                            <div className="card-header">
                                <span className="card-title">Thanh toán</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="card-content">
                            {databookingpayment.paymentStatus === "Pending" ? (
                                <>
                                <VietQR
                                        bankId={bankId} 
                                        accountNo={accountBankNo}
                                        amount={dataBookingOrder.totalAmount} 
                                        description={"TT"+ dataBookingOrder.bookingID}
                                        accountName={accountNameBank}
                                    />
                                {!isConfirmedPayment ? (
                                    <button
                                    className="checkVietQRButton placeOrderButton"
                                    onClick={handleConfirmPayment}
                                    >
                                    Xác nhận đã thanh toán
                                    </button>
                                ) : (
                                    <div className="confirmation-message">
                                    Chúng tôi đã ghi nhận yêu cầu kiểm duyệt thanh toán, vui lòng kiểm tra
                                    lại sau ít phút
                                    </div>
                                )}
                                </>
                            ) : databookingpayment.paymentStatus === "Success" ? (
                                <p className="success-message">Bạn đã thanh toán</p>
                            ) : (
                                <p className="error-message">Không xác định trạng thái thanh toán</p>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="itemSection">
                    <div className="tableHeader">
                        <span>Thợ</span>
                        <span>Địa chỉ</span>
                        <span>Nhóm ngành</span>
                        <span>Tổng giờ</span>
                        <span>Đơn giá</span>
                        <span>Thành tiền</span>
                    </div>

                    <div className="itemRow">
                        <div className="itemInfo">
                            <img src={profileImageUrl} alt="item" className="itemImage" />
                            <div>
                                <p>{WORKER_name}</p>
                                <p>{WORKER_EXP} Năm kinh nghiệm</p>
                                {/* <a href="#" className="removeLink">Remove</a> */}
                            </div>
                        </div>
                        <span>{WORKER_address}</span>
                        <span>{jobTypeMapping[dataBookingOrder.jobTypeID]}</span>
                        <span>{dataBookingOrder.totalHours}</span>
                        <span>{dataBookingOrder.hourlyRate}</span>
                        <span>{dataBookingOrder.totalAmount}</span>
                    </div>
                </div>
            </div>
            <div className='separate-box'>
                <div className='separate'></div>
            </div>
            <div>
                <div className='title'>
                    <h2 className="section-title" data-wow-delay="0.3s">TUYỂN NHIỀU THỢ HƠN</h2>
                </div>
                <Search/>
            </div>
            <div className='margin-box'></div>
            
            {isBoxCompleted && !isCompleted && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <>
                        <h3>Xác nhận công việc đã hoàn thành</h3>
                        <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleConfirmJob}>
                            Xác nhận
                        </button>
                        <button className="cancel-button" onClick={handleCloseModal}>
                            Hủy
                        </button>
                        </div>
                        </>
                    </div>
                </div>
            )};


            {isModalOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    {!isRatingStep && !isCompleted ? (
                    <>
                        <h3>Xác nhận công việc đã hoàn thành</h3>
                        <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleConfirmJob}>
                            Xác nhận
                        </button>
                        <button className="cancel-button" onClick={handleCloseModal}>
                            Hủy
                        </button>
                        </div>
                    </>
                    ) : (
                    <>
                        <h3>Đánh giá công việc</h3>
                        <div className="rating-section">
                        <span>Chọn số sao</span>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? 'selected' : ''}`}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                            ))}
                        </div>
                        </div>
                        <div className="comment-section">
                        <textarea
                            placeholder="Nhập nhận xét của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </div>
                        <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleSubmitRating}>
                            Gửi đánh giá
                        </button>
                        <button className="cancel-button" onClick={handleCloseModal}>
                            Hủy
                        </button>
                        </div>
                    </>
                    )}
                </div>
                </div>
            )}

            {isCancelOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    {!isCancel ? (
                    <>
                        <h3>Xác nhận hủy đơn</h3>
                        <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleCancelConfirmJob}>
                            Xác nhận
                        </button>
                        <button className="cancel-button" onClick={handleCancelCloseModal}>
                            Hủy
                        </button>
                        </div>
                    </>
                    ) : (
                    <>
                        <h3>Lí do hủy</h3>
                        <div className="comment-section">
                        <textarea
                            placeholder="Nhập lí do của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </div>
                        <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleSubmitCancel}>
                            Xác nhận
                        </button>
                        <button className="cancel-button" onClick={handleExitCancel}>
                            Hủy
                        </button>
                        </div>
                    </>
                    )}
                </div>
                </div>
            )}

            <Footer />
            
        </div>
    );
};

export default OrderTracking;
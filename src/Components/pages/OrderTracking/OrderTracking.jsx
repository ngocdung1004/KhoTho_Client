import React, { useEffect, useState } from 'react';
import Footer from '../../FooterDiv/Footer';
import NavBar from '../../NavBar/NavBar';
import Search from '../../SearchNOFilter/Search'
// import axios from "axios";

// import {
//     Container,
//     Grid,
//     Paper,
//     Avatar,
//     Typography,
//     Button,
//     Box,
//     Card,
//     CardContent,
//     Rating,
//     Divider,
//     Chip,
//     Stack,
//     IconButton,
//   } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import * as config from "../../../services/config";
import "./OrderTracking.css"

import { useParams } from "react-router-dom";

const OrderTracking = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [isRatingStep, setRatingStep] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [isBoxCompleted, setIsBoxCompleted] = useState(false);
    const [isEndRating, setIsEndRating] = useState(false);

    const navigate = useNavigate();
    const { bookingID } = useParams();
    
    const handleConfirm = () => {
        setIsBoxCompleted(true);
        
    };

    const handleOpenModal = () => {
        setModalOpen(true);
        setIsEndRating(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
        setRatingStep(false);
        setRating(0);
        setComment('');
    };

    const handleConfirmJob = () => {
        setRatingStep(true);
        setIsCompleted(true);
    }

    const handleSubmitRating = () => {
        console.log('Rating:', rating);
        console.log('Comment:', comment);
        handleCloseModal();

    };

    // const { workerId } = useParams();
    // const [workerData, setWorkerData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [feedbacks, setFeedbacks] = useState([]);

    // useEffect(() => {
    //     const fetchWorkerDetails = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(`${API_ENDPOINT}/api/Workers/${workerId}`);
    //         setWorkerData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching worker details:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    //     };

    //     fetchWorkerDetails();
    // }, [workerId]);

    // const handleAddFeedback = (newFeedback) => {
    //     setFeedbacks([...feedbacks, newFeedback]);
    // };

    // if (loading) {
    //     return (
    //     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    //         <Typography variant="h5">Loading...</Typography>
    //     </Box>
    //     );
    // }

    // if (!workerData) {
    //     return (
    //     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    //         <Typography variant="h5">No worker data found.</Typography>
    //     </Box>
    //     );
    // }

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
                        <div className="progressStep completed">
                            <div className="stepIcon">✔</div>
                            <span className="stepLabel">Booking</span>
                        </div>

                        <div className="connector"></div>

                        <div className="progressStep completed">
                            <div className="stepIcon">✔</div>
                            
                            <span className="stepLabel">Đã xác nhận</span>
                        </div>

                        <div className="connector"></div>

                        <div className="progressStep completed">
                            <div className="stepIcon">✔</div>
                            <span className="stepLabel">Đang thực hiện</span>
                        </div>

                        <div className="connector"></div>

                        <div className={`progressStep ${isCompleted ? "completed" : "active"}`}>
                            <div className="stepIcon">{isCompleted ? "✔" : "4"}</div>
                            <span className="stepLabel">Hoàn thành</span>
                        </div>
                    </div>
                </div>

                <div className="header">
                    <div className='header-left'>
                        <span className="totalAmount-title">Mã đơn:</span>
                        <span className="totalAmount">FHAL3OV0AAT2NF</span>
                    </div>
                    <div className='header-right'>
                        <div className='Amount-Block'>
                            <span className="totalAmount-title">Tổng số tiền</span>
                            <span className="totalAmount">đ̲200.000</span>
                        </div>
                        <div className='button-block'>
                            {!isCompleted && (
                                <button className="placeOrderButton" onClick={handleConfirm}>
                                Xác nhận hoàn thành
                                </button>
                            )}

                            {!isEndRating && (
                            <button className="placeOrderButton" onClick={handleOpenModal}>
                                Đánh giá
                            </button>
                            )}
                        </div>
                    </div>
                </div>
                
                
                <div>
                    <div className='progressTitle'>
                        <h3 className="progressTitle-content" data-wow-delay="0.3s">Thông tin chi tiết</h3>
                    </div>
                    <div className="infoSection">
                        <div className="infoCard">
                            <div className="cardHeader">
                                <span>Thông tin của bạn</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="cardContent">
                                <p>Hà Khải Hoàn</p>
                                <p>hoan21012003@gmail.com</p>
                            </div>
                        </div>

                        <div className="infoCard">
                            <div className="cardHeader">
                                <span>Thông tin của thợ</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="cardContent">
                                <p>Trần Anh Tuấn</p>
                                <p>Xóm Dừa</p>
                                <p>Thôn Nam Tượng 1</p>
                                <p>Xã Nhơn Tân - Thị Xã An Nhơn - Tỉnh Bình Định</p>
                                <p>Việt Nam</p>
                                <p>0987654321</p>
                            </div>
                        </div>

                        <div className="infoCard">
                            <div className="cardHeader">
                                <span>Địa chỉ của bạn</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="cardContent">
                                <p>Xóm Phúc Hậu</p>
                                <p>Thôn Nam Tượng 3</p>
                                <p>Xã Nhơn Tân - Thị Xã An Nhơn - Tỉnh Bình Định</p>
                                <p>Việt Nam</p>
                                <p>0356295910</p>
                            </div>
                        </div>

                        <div className="infoCard">
                            <div className="cardHeader">
                                <span>Phương thức thanh toán</span>
                                {/* <a href="#" className="editLink">Edit</a> */}
                            </div>
                            <div className="cardContent">
                                <img src="https://img.icons8.com/?size=100&id=aMTIdm5CdddP&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                <p>Visa card ending in 1234</p>
                                <img src="https://img.icons8.com/?size=100&id=p2scHNLP9nSb&format=png&color=000000" alt="Visa" className="paymentIcon" />
                                <p>Thanh toán bằng tiền mặt</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="itemSection">
                    <div className="tableHeader">
                        <span>Thợ</span>
                        <span>Khu vực</span>
                        <span>Nhóm ngành</span>
                        <span>Số lượng</span>
                        <span>Đơn giá</span>
                        <span>Thành tiền</span>
                    </div>

                    <div className="itemRow">
                        <div className="itemInfo">
                            <img src="src\Assets\about\worker.png" alt="item" className="itemImage" />
                            <div>
                                <p>Trần Tuấn Anh</p>
                                <p>5 Năm kinh nghiệm</p>
                                {/* <a href="#" className="removeLink">Remove</a> */}
                            </div>
                        </div>
                        <span>Bình Định</span>
                        <span>Sửa chữa</span>
                        <span>10</span>
                        <span>đ̲20.000</span>
                        <span>đ̲200.000</span>
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

            <Footer />
            
        </div>
    );
};

export default OrderTracking;
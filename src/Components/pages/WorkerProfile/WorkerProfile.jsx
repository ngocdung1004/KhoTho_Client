import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { BiStar } from "react-icons/bi";

import { API_ENDPOINT } from "../../../config";

import FeedbackSection from '../../FeedbackSection/FeedbackSection';

import NavBar from '../../NavBar/NavBar';
import Footer from '../../FooterDiv/Footer';
import defaultImage from '../../../Assets/about/worker.png';

import feedbackImage from '../../../Assets/testimonial/img1.jpg';

import "./WorkerProfile.css";




const WorkerProfile = () => {
  const { workerId } = useParams();
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [feedbacks, setFeedbacks] = useState([
    {
      userName: "Nguyễn Văn A",
      userAvatar: feedbackImage,
      rating: 5,
      text: "Thợ làm rất tốt và chuyên nghiệp. Tôi rất hài lòng!",
      date: "2024-10-20",
    },
    {
      userName: "Trần Thị B",
      userAvatar: feedbackImage,
      rating: 4,
      text: "Thợ có tay nghề nhưng đến hơi trễ.",
      date: "2024-10-21",
    },
  ]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks([...feedbacks, {
      userName: "Khách hàng mới",
      userAvatar: defaultAvatar, // Replace with user's avatar if available
      ...newFeedback,
    }]);
  };

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Workers/${workerId}`);
        setWorkerData(response.data);
      } catch (error) {
        console.error("Error fetching worker details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (!workerData) return <p className="text-center text-lg font-semibold">No worker data found.</p>;

  return (
    <div className='w-[85%] m-auto'>
      <NavBar/>
      
      <section className="relative bg-white py-16 shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row start-info">
            <div className="block_left">
              <div className="w-450">
                <Avatar
                  src={workerData.user.profileImage || defaultImage}
                  alt="Profile picture"
                  variant="circular"
                  className="h-full w-full"
                />
              </div>
              <div className="fullname_verify">
                <h2 className="fullname">{workerData.user.fullName}</h2>
                {workerData.verified && (
                  <p className="verify">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Đã xác minh
                  </p>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">Bình Định</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">Thợ sửa chữa đồ dân dụng</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">Kinh nghiệm {workerData.experienceYears} năm</Typography>
                </div>
              </div>
            </div>

            <div className="block_right">
              <div className="messenger_book_box">
                <Button className="book">Đặt lịch</Button>
                
                <div className="rating_success">
                <div className="text-center">
                  <Typography variant="h5" className="font-bold">
                    {workerData.rating || 0}
                  </Typography>
                  <Typography variant="small" className="text-blue-gray-500">
                    <BiStar className="text-yellow-400" />
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" className="font-bold">10</Typography>
                  <Typography variant="small" className="text-blue-gray-500">Hoàn thành</Typography>
                </div>
              </div>
              </div>
              
              <div className="biography">
                <Typography>{workerData.bio || "Thông tin tiểu sử không có sẵn."}</Typography>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      <FeedbackSection feedbacks={feedbacks} onSubmitFeedback={handleAddFeedback} />
      <Footer />
    </div>
  );
};

export default WorkerProfile;

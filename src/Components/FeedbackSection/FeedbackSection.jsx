import React, { useState } from 'react';
import { Typography, Avatar, Button, Textarea } from "@material-tailwind/react";
import { BiStar } from "react-icons/bi";
import './FeedbackSection.css';

import Search from '../SearchNOFilter/Search'

const FeedbackSection = ({ feedbacks, onSubmitFeedback }) => {
  const [newFeedback, setNewFeedback] = useState('');
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = () => {
    if (newFeedback && newRating > 0) {
      onSubmitFeedback({ text: newFeedback, rating: newRating, date: new Date() });
      setNewFeedback('');
      setNewRating(0);
    }
  };

  return (
    <div className="feedback-section">
      <Typography  className="feedback-header">PHẢN HỒI TỪ KHÁCH HÀNG</Typography>

      <div className="space-y-4">
        {Array.isArray(feedbacks) && feedbacks?.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <Avatar src={feedback.userAvatar || defaultAvatar} alt="Customer Avatar" size="xs" className="feedback-avatar" />
            <div className="feedback-info">
              <div className="flex items-center justify-between mb-1">
                <Typography className="feedback-name">{feedback.userName}</Typography>
                <Typography variant="small" className="feedback-date">{new Date(feedback.date).toLocaleDateString()}</Typography>
              </div>
              <div className="feedback-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <BiStar key={i} className={`feedback-star ${i < feedback.rating ? '' : 'inactive'}`} />
                ))}
              </div>
              <Typography className="feedback-text">{feedback.text}</Typography>
            </div>
          </div>
        ))}
      </div>

      <Typography  className="feedback-header">CÁC THỢ BẠN CÓ THỂ CHỌN</Typography>

        <Search/>

    </div>




  );
};

export default FeedbackSection;

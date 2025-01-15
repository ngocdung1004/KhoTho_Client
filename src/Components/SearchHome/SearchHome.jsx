import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchHome.css"

const SearchHome = () => {

  return (
    <div className= "MainAll w-full">
    <div className="blockSearchHome relative w-full h-[500px] flex items-center justify-center">
      <img
        src="https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Background"
        className="BackgroundSearchHome absolute inset-0 w-full h-full object-cover"
      />

      <div className="blockMain relative z-10 w-full max-w-7xl flex items-center">
        <div className="w-1/2 text-white p-6">
          <h1 className="text-6xl font-bold leading-tight drop-shadow-lg">
            Tìm kiếm thợ tại khu vực của bạn
          </h1>
          <p className="mt-4 text-lg drop-shadow-md text-white">
            Lựa chọn những thợ sẽ hỗ trợ tốt nhất cho vấn đề mà bạn đang gặp phải
          </p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full">
            <form>
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm..."
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <button
                type="submit"
                className="w-full mt-4 p-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default SearchHome;

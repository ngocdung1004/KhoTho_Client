import React, { useEffect, useState } from 'react';
import Footer from '../../FooterDiv/Footer';
import NavBar from '../../NavBarLogin/NavBar';
import './RegisterWorker.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as config from "../../../services/config";
import { API_ENDPOINT } from "../../../services/config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import { Input } from "antd";
import { Link } from 'react-router-dom';

const RegisterWorker = () => {
    const USERnow = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");
    // Sử dụng useState để khởi tạo giá trị cho các trường
    const [name, setName] = useState(USERnow ? USERnow.fullName : "");
    const [phone, setPhone] = useState(USERnow ? USERnow.phoneNumber : "");
    const [email, setEmail] = useState(USERnow ? USERnow.email : "");
    const [address, setAddress] = useState(USERnow ? USERnow.address : "");
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [activeTab, setActiveTab] = useState('basicInfo'); // State to track active tab
    const [frontCCCD, setFrontCCCD] = useState(null);  // State for front image
    const [backCCCD, setBackCCCD] = useState(null);    // State for back image

    const [nationality, setNationality] = useState('Vietnam'); // default value
    const [industryGroup, setIndustryGroup] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [yearsExperience, setYearsExperience] = useState(0);
    const [selfIntroduction, setSelfIntroduction] = useState('');

    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);


    // Thêm state để lưu trữ file ảnh thực tế
const [profileImageFile, setProfileImageFile] = useState(null);
const [frontCCCDFile, setFrontCCCDFile] = useState(null);
const [backCCCDFile, setBackCCCDFile] = useState(null);


    const [Workers, setWorkers] = useState(null)

    const [jobTypes, setJobTypes] = useState([]); // Lưu trữ danh sách job types
    const API_KEY = "KBGL0ihukFkc3MeOxPxktzGM2eY82Ow9KB5xswAI";
    const handleAddressChange = async (location) => {
      
      setAddress(location); 
  
      if (address.length > 0) {
          const response = await axios.get(
            "https://rsapi.goong.io/Place/AutoComplete",
            {
              params: {
                api_key: API_KEY,
                input: address,
              },
            }
          );
          setSuggestions(response.data.predictions); 
      }
    };
  

    // Lấy dữ liệu job types từ API
    useEffect(() => {
      const fetchJobTypes = async () => {
          try {
              const response = await axios.get(`${API_ENDPOINT}/api/JobTypes`, {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
              });
              setJobTypes(response.data); // Lưu dữ liệu job types vào state
          } catch (error) {
              console.error("Error fetching job types:", error);
          }
      };
      fetchJobTypes();
  }, [token]);

  const handleSubmit_ = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Bạn cần đăng nhập để thực hiện thao tác này!', { position: "top-left", autoClose: 3000 });
        return;
      }
  
      const userData = localStorage.getItem('userData');
      if (!userData) {
        toast.error('Không tìm thấy userData. Vui lòng đăng nhập lại!', { position: "top-left", autoClose: 3000 });
        return;
      }
  
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.userId;
      if (!userId) {
        toast.error('Không tìm thấy userId. Vui lòng đăng nhập lại!', { position: "top-left", autoClose: 3000 });
        return;
      }
  
      // Tạo FormData object
      const formData = new FormData();
      formData.append('UserId', userId);
      formData.append('ExperienceYears', yearsExperience);
      formData.append('Rating', 0);
      formData.append('Bio', selfIntroduction);
      formData.append('Verified', true);
      formData.append('JobTypeIds', industryGroup);
  
      // Thêm file ảnh nếu có
      if (profileImageFile) {
        formData.append('ProfileImage', profileImageFile);
      }
      if (frontCCCDFile) {
        formData.append('FrontIdcard', frontCCCDFile);
      }
      if (backCCCDFile) {
        formData.append('BackIdcard', backCCCDFile);
      }
  
      const response = await axios.post(
        `${API_ENDPOINT}/api/Workers`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Đăng ký thành công!", { position: "top-left", autoClose: 3000 });
      setTimeout(() => navigate("/workers"), 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại!', { position: "top-left", autoClose: 3000 });
    }
  };
  

  // Hàm xử lý upload ảnh Profile
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    setProfileImageFile(file); // Lưu file ảnh thực tế
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl); // Lưu URL preview
  }
};

// Hàm xử lý upload ảnh CCCD
const handleCCCDUpload = (event, type) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    if (type === 'front') {
      setFrontCCCDFile(file); // Lưu file gốc
      setFrontCCCD(imageUrl); // Lưu URL preview
    } else if (type === 'back') {
      setBackCCCDFile(file); // Lưu file gốc
      setBackCCCD(imageUrl); // Lưu URL preview
    }
  }
};


  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  return (
    <div className="w-[85%] m-auto white-color-sl">
      <ToastContainer position="top-right" autoClose={3000} />
        <NavBar />
        <div className='body'>
            <div className='title'>
              <h2 className="section-title" data-wow-delay="0.3s">Đăng ký thông tin để bắt đầu nhận việc</h2>
              <div className="symbol-container">
                  <span>★</span>  
                  <span>★</span>  
                  <span>★</span> 
              </div>
            </div>
            <div className='flex'>

                <div className="profile-details text-center left-block">
                {/* Profile Picture */}
                    <div className="profile-image-container relative inline-block mb-6">
                        <img
                        src={profileImage || "default-profile.png"}
                        alt="Profile"
                        className="profile-image w-60 h-60 rounded-full border-4 border-gray-300 shadow-lg transition-all duration-300 hover:scale-105"
                        />
                        <input
                        type="file"
                        id="fileUpload"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                        />
                        <label
                        htmlFor="fileUpload"
                        className="upload-icon absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-3 cursor-pointer transition-all duration-300 transform hover:scale-110"
                        >
                        📷
                        </label>
                    </div>
                </div>

                <div className="right-block">
            {/* Settings Tabs */}
            <div className="settings-tabs flex justify-around mt-6 mb-4 border-b border-gray-200">

              <div
                className={`tab cursor-pointer pb-2 ${activeTab === 'basicInfo' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => handleTabChange('basicInfo')}
              >
                Thông tin cơ bản
              </div>

              <div
                className={`tab cursor-pointer pb-2 ${activeTab === 'introductionInfo' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => handleTabChange('introductionInfo')}
              >
                Giới thiệu
              </div>

              <div
                className={`tab cursor-pointer pb-2 ${activeTab === 'cccd' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => handleTabChange('cccd')}
              >
                CCCD
              </div>

            </div>

            {/* Form for Account Settings (Basic Info) */}
            {activeTab === 'basicInfo' && (
              <div className="form-container">
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Tên</label>
                  <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Số điện thoại</label>
                  <input type="text" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Email</label>
                  <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <div className="form-row mb-4">
                    <label className="block text-gray-600">Nơi thường trú</label>
                    <input
                      type="text"
                      className="input-field"
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                    />
                    {suggestions?.length > 0 && (
                      <ul className="suggestion-list">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="suggestion-item cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() => {
                              setAddress(suggestion.description);
                              setSuggestions([]); 
                            }}
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="form-row mb-4">
                  <label className="block text-gray-600">Quốc tịch</label>
                  <select className="input-field" value={nationality} onChange={(e) => setNationality(e.target.value)}>
                    <option value="Vietnam">Việt Nam</option>
                    <option value="America">America</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            )}

            {/* Form for Account Settings (Introduction Info) */}
            {activeTab === 'introductionInfo' && (
                <div className="form-container max-h-screen overflow-y-auto p-4 bg-white rounded shadow-md h-[600px]">
                {/* Option for Industry Group (Dropdown) */}
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Nhóm ngành</label>
                  <select
                    className="input-field"
                    value={industryGroup}
                    onChange={(e) => setIndustryGroup(e.target.value)}
                  >
                    <option value="">Chọn nhóm ngành</option>
                    {jobTypes.map((jobType) => (
                      <option key={jobType.jobTypeId} value={jobType.jobTypeId}>
                        {jobType.jobTypeName}
                      </option>
                    ))}
                  </select>
                </div>
              
                {/* Text Input for Specialization */}
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Chuyên môn</label>
                  <input
                    type="text"
                    placeholder="Sửa chữa máy giặt"
                    className="input-field"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </div>
              
                {/* Number Input for Years of Experience */}
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Số năm kinh nghiệm</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="input-field"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                  />
                </div>
              
                {/* Text Input for Self Introduction */}
                <div className="form-row mb-6">
                  <label className="block text-gray-600">Giới thiệu bản thân</label>
                  <textarea
                    placeholder="Hãy nhập giới thiệu bản thân bạn..."
                    rows="8"
                    className="input-field"
                    value={selfIntroduction}
                    onChange={(e) => setSelfIntroduction(e.target.value)}
                  ></textarea>
                </div>
              
                {/* Thông tin thanh toán */}
                <div>
                  <div className="text-lg font-semibold mb-4">Thông tin thanh toán</div>
              
                  {/* Image ngân hàng */}
                  <div className="mb-4 flex justify-center">
                    <img
                      src="https://i.imgur.com/lLvi0Si.png"
                      alt="Ngân hàng"
                      className="h-80 object-contain"
                    />
                  </div>
              
                  {/* Tên ngân hàng */}
                  <div className="form-row mb-4">
                    <label className="block text-gray-600">Ngân Hàng</label>
                    <input
                      type="text"
                      placeholder="MBBank"
                      className="input-field w-full border p-2 rounded"
                    />
                  </div>
              
                  {/* Số tài khoản */}
                  <div className="form-row mb-4">
                    <label className="block text-gray-600">Số tài khoản</label>
                    <input
                      type="text"
                      placeholder="7979797979"
                      className="input-field w-full border p-2 rounded"
                    />
                  </div>
                </div>
              </div>
              
                )}

            {/* Form for CCCD (Citizen ID) */}
            {activeTab === 'cccd' && (
              <div className="form-container maskA">
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Mặt trước CCCD</label>
                  <input 
                    type="file" 
                    className="input-field"
                    onChange={(e) => handleCCCDUpload(e, 'front')} 
                  />
                  {/* Display preview of front CCCD image */}
                  {frontCCCD && (
                    <div className="image-preview mt-2">
                      <img src={frontCCCD} alt="Mặt trước CCCD" className="w-48 h-48 object-cover border rounded-md" />
                    </div>
                  )}
                </div>
                <div className="form-row mb-4">
                  <label className="block text-gray-600">Mặt sau CCCD</label>
                  <input 
                    type="file" 
                    className="input-field"
                    onChange={(e) => handleCCCDUpload(e, 'back')} 
                  />
                  {/* Display preview of back CCCD image */}
                  {backCCCD && (
                    <div className="image-preview mt-2">
                      <img src={backCCCD} alt="Mặt sau CCCD" className="w-48 h-48 object-cover border rounded-md" />
                    </div>
                  )}
                </div>

                  {/* Checkbox điều khoản */}
                  <div className="form-row mb-4 flex gap-2">
                    <label className="flex text-sm text-gray-700 gap-2">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={() => setAgreeTerms(!agreeTerms)}/>

                      Tôi đồng ý với{" "}
                      <span
                        className="text-blue-600 underline cursor-pointer"
                        onClick={() => setShowTermsModal(true)}
                      >
                        điều khoản sử dụng
                      </span>
                    </label>
                  </div>

                {/* Nút xác nhận */}
                <button
                  className={`update-button rounded-md px-4 py-2 w-full mt-2 ${
                    agreeTerms
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  onClick={handleSubmit_}
                  disabled={!agreeTerms}
                >
                  Xác nhận thông tin
                </button>

                {/* Modal điều khoản */}
                {showTermsModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
                      {/* Nút đóng */}
                  
                      <div className="bg-white rounded-lg p-8 w-full max-w-8xl max-h-[75vh] overflow-y-auto relative shadow-lg">
                        
                      <button
                          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
                          onClick={() => setShowTermsModal(false)}
                        >
                          &times;
                        </button>

                        {/* Tiêu đề */}
                        <h2 className="text-2xl font-bold mb-6 text-center">Điều khoản sử dụng</h2>

                        {/* Nội dung điều khoản từ file KHOTHO */}
                        <div className="text-gray-700 text-base space-y-4 text-justify leading-relaxed">
                          <h2>Quy định chung</h2>
                          <h1>Quy chế hoạt động website</h1>
                          <p>
                            1. Người dùng: là một cá nhân lao động như được định nghĩa dưới đây, và bao gồm bất kỳ người nào duyệt và/hoặc xem Website, cũng như bất kỳ người lao động nào trên Website phù hợp với các quy định của pháp luật, quy định và chính sách khác của Kho Thợ. “Cá nhân” – Các dịch vụ chỉ được cung cấp cho các cá nhân có khả năng tham gia vào một thỏa thuận có hiệu lực pháp lý theo luật Việt Nam.
                          </p>
                          <p>
                            - Khi đăng ký tài khoản, người dùng được xem là Thành viên của Kho Thợ (“Thành viên”). Người dùng hiểu rằng:
                            <br />+ Người dùng có thể tạo một tài khoản cá nhân của mình để sử dụng.
                            <br />+ Người dùng có thể đăng tin theo đúng quy chuẩn, cam kết của thành viên hợp pháp đã công bố trên sàn.
                          </p>
                          <p>
                            2. Kho Thợ có thể sửa đổi Quy chế tùy từng thời điểm vì các lý do liên quan đến luật pháp hay quy định, hoặc để đảm bảo Website hoạt động đúng cách và suôn sẻ.
                            Nếu người dùng tiếp tục sử dụng Website sau ngày các sửa đổi bắt đầu có hiệu lực, Người dùng sẽ được cho là đã đồng ý bị ràng buộc bởi quy chế sửa đổi. Trong trường hợp Người dùng không đồng ý với các sửa đổi, Người dùng không được tiếp tục sử dụng Website và các dịch vụ.
                          </p>
                          <p>
                            3. Dịch vụ tham gia giao dịch giữa thợ và người dùng phải đáp ứng đầy đủ các quy định của pháp luật có liên quan, không thuộc các trường hợp cấm kinh doanh, cấm quảng cáo theo quy định của pháp luật.
                          </p>
                          <p>
                          4. Hoạt động sử dụng dịch vụ qua Kho Thợ phải được thực hiện công khai, minh bạch, đảm bảo quyền lợi của người tiêu dùng. Nội dung không phù hợp thì có quyền xóa, chỉnh sửa hoặc từ chối tin đăng nếu nội dung không phù hợp với quy định.
                          </p>
                          <br />
                          <br />

                          <h1>Hình thức thanh toán và giao nhận</h1>
                          <p>1. Người dùng tự thoả thuận về hình thức thanh toán.</p>
                          <p>2. Kho Thợ không tham gia vào quy trình thanh toán hay vận chuyển hàng hóa.</p>
                          <br />
                          <br />

                          <h1>Dịch vụ bị cấm</h1>
                          <p>1. Cung cấp thiết bị là hàng giả, hàng nhái, hàng kém chất lượng.</p>
                          <p>2. Trao đổi Vũ khí, ma túy, thuốc lá và các chất gây nghiện.</p>
                          <p>3. Các dịch vụ phạm pháp như cho vay nặng lãi, cờ bạc.</p>
                          <br />
                          <br />

                          <h1>Chấm dứt quyền sử dụng</h1>
                          <p>1. Các nội dung vi phạm quyền sở hữu trí tuệ.</p>
                          <br />
                          <br />

                          <h2>Quy định đối với người thợ</h2>
                          <h1>Quy trình đăng ký làm thợ để được quảng bá trên website</h1>
                          <p>1. Khi một người thợ muốn được lên website, họ cần phải đăng kí tài khoản trên KhoTho và cung cấp thông tin cá nhân bao gồm: Sơ yếu lí lịch, nơi cư trú, hình ảnh CCCD hai mặt, hình ảnh chân dung, list công việc, xác nhận số điện thoại, giấy xác nhận là người bình thường (không có tiền án tiền sự hay vấn đề về sức khẻo). Thợ phải đóng tiền cho sàn để được quản bá theo phí quy định bởi sàn.</p>
                          <p>2. Khi một người thợ có được người dùng book, họ phải trao đổi thông tin về cá nhân lại với người dùng. Sau khi biết được người dùng muốn book công việc gì thì đưa ra khoảng giá phù hợp với thị trường.Khi cả hai đi đến thoả thuận đồng ý, thì mới được phép thực hiện công việc. Nếu trong quá trình làm việc có pháp sinh vấn đề, thợ phải chủ động báo cáo với người dùng không được tự ý thực hiện mà không được sự đồng ý của người dùng. Khi đó bên sàn sẽ tạo một hợp đồng online để hai bên cam kết để đảm bảo quyền lợi khách hàng và cam kết thợ làm đúng đạo đức và hoàn thiện công việc đã nhận.</p>
                          <br />- Sau khi hoàn thành công việc thì phải chụp ảnh/ video bằng chứng đã hoàn thành công việc lên website.
                          <br />
                          <br />

                          <h1>Chính sách đăng tin</h1>
                          <p>1.Khi thợ đăng kí thông tin cá nhân lên sàn, những thông tin đó phải chính xác, minh bạch, không gian dối, gây nhầm lẫn.</p>
                          <p>2. Không được đăng tin liên quan đến các dịch vụ bị cấm (ví dụ: mại dâm, giao dịch ma tuý,...).</p>
                          <br />
                          <br />

                          <h2>Quy định đối với người dùng</h2>
                          <h1>Quy trình đăng kí của người dùng trên website</h1>
                          <p>1. Khi người dùng muốn tìm kiếm thợ để làm việc, học cần phải đăng ký tại khoản và cung cấp một số thông tin cá nhân bao gồm: sơ yếu lí lịch, nơi cư trú, số điện thoại. Thực hiện các bước đăng ký xong, thì người dùng có thể book thợ để làm việc bằng cách sử dụng bộ lọc, đọc thông tin của thợ. Sau đó trao đổi trực tiếp với thợ để hai bên đi đến thoả thuận và chấp thuận họp đồng online.</p>
                          <br />- Sau khi thợ hoàn thành công việc, người dùng có thể Feedback và đánh giá thông qua website.
                          <br />
                          <br />

                          <h2>Đối với KHOTHO</h2>
                          <h1>Trách nhiệm và quyền hạn của KHOTHO</h1>
                          <p>1. Kho Thợ chỉ cung cấp nền tảng để kết nối người thợ và người dùng, không chịu trách nhiệm về nội dung các tin đăng hoặc chất lượng sản phẩm/dịch vụ.</p>
                          <p>2. Kho Thợ có quyền từ chối cung cấp dịch vụ đối với những trường hợp vi phạm chính sách hoặc quy định pháp luật.</p>
                          <p>3. Kho Thợ có thể cung cấp thông tin người dùng cho các cơ quan chức năng nếu có yêu cầu hợp pháp.</p>
                          <br />
                          <br />

                          <h1>Chính sách bảo mật thông tin</h1>
                          <p>1. Kho Thợ cam kết bảo vệ thông tin cá nhân của người dùng theo quy định về bảo mật.</p>
                          <p>2. Người dùng có trách nhiệm bảo mật tài khoản của mình, không chia sẻ thông tin tài khoản cho người khác.</p>
                          <p>3. Kho Thợ không chịu trách nhiệm về việc mất mát thông tin cá nhân nếu do người dùng chia sẻ thông tin tài khoản không an toàn.</p>
                          <br />
                          <br />

                          <h1>Giải quyết tranh chấp</h1>
                          <p>1. Kho Thợ không trực tiếp tham gia vào các giao dịch giữa người thợ và người dùng, tuy nhiên có thể hỗ trợ trong việc giải quyết tranh chấp.</p>
                          <p>2. Người dùng cần chủ động liên hệ với nhau để giải quyết các vấn đề phát sinh từ giao dịch.</p>
                          <p>3. Trong trường hợp xảy ra tranh chấp, Kho Thợ có thể cung cấp thông tin liên lạc giữa các bên dựa trên quy định pháp luật.</p>

                        </div>
                      </div>
                    </div>
                  )}



                
              </div>
            )}

          </div>

            </div>
        </div>
        <Footer />
    </div>
  );
};

export default RegisterWorker;
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { MdWorkOutline, MdVerified } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { BiStar } from "react-icons/bi";
import { API_ENDPOINT } from "../../services/config";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
>>>>>>> efd02e0aa208b7717ce08e7602d9a6cdcd6c16a8
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a

const Search = () => {
  
  const [jobTypes, setJobTypes] = useState([]);
  const [workers, setWorkers] = useState([]);
<<<<<<< HEAD
<<<<<<< HEAD
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [searchResults, setSearchResults] = useState([]);
=======
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [workerJobTypes, setWorkerJobTypes] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const workersPerPage = 8;

  const navigate = useNavigate();
  const handleViewProfile = (workerId) => {
    navigate(`/worker-profile/${workerId}`);
  };

  const ratingRanges = [
    { label: "1-2 sao", min: 1, max: 2 },
    { label: "2-3 sao", min: 2, max: 3 },
    { label: "3-4 sao", min: 3, max: 4 },
    { label: "4-5 sao", min: 4, max: 5 },
  ];
<<<<<<< HEAD
>>>>>>> efd02e0aa208b7717ce08e7602d9a6cdcd6c16a8
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
<<<<<<< HEAD
        const response = await fetch('https://localhost:7062/api/JobTypes');
        const data = await response.json();
        setJobTypes(data);
=======
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
        const [jobTypesResponse, workersResponse, workerJobTypesResponse] =
          await Promise.all([
            axios.get(`${API_ENDPOINT}/api/JobTypes`),
            axios.get(`${API_ENDPOINT}/api/Workers`),
            axios.get(`${API_ENDPOINT}/api/WorkerJobTypes`),
          ]);

        setJobTypes(jobTypesResponse.data);
        setWorkers(workersResponse.data);
        setWorkerJobTypes(workerJobTypesResponse.data);
        setFilteredWorkers(workersResponse.data);
<<<<<<< HEAD
>>>>>>> efd02e0aa208b7717ce08e7602d9a6cdcd6c16a8
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
<<<<<<< HEAD
    const fetchWorkers = async () => {
      try {
        const response = await fetch('https://localhost:7062/api/Workers');
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchJobTypes();
    fetchWorkers();
=======
    fetchData();
>>>>>>> efd02e0aa208b7717ce08e7602d9a6cdcd6c16a8
=======
    fetchData();
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = workers;

    if (selectedLocation) {
      filtered = filtered.filter((worker) =>
        worker.user.address
          .toLowerCase()
          .includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedExperience) {
      const years = parseInt(selectedExperience);
      filtered = filtered.filter((worker) => worker.experienceYears === years);
    }

    if (selectedRating) {
      const [min, max] = selectedRating.split("-").map(Number);
      filtered = filtered.filter(
        (worker) => worker.rating >= min && worker.rating <= max
      );
    }

    if (selectedJobType) {
      filtered = filtered.filter((worker) => {
        // Tìm các worker job type của worker này
        const workerJobs = workerJobTypes.filter(
          (wjt) => wjt.workerId === worker.workerId
        );
        // Tìm job type tương ứng
        const jobType = jobTypes.find(
          (jt) =>
            workerJobs.some((wj) => wj.jobTypeId === jt.jobTypeId) &&
            jt.jobTypeName === selectedJobType
        );
        return jobType !== undefined;
      });
    }

    setFilteredWorkers(filtered);
    setCurrentPage(1);
  };

  const SearchBox = ({
    icon: Icon,
    label,
    value,
    onChange,
    options,
    type = "select",
    onClear,
  }) => (
    <div className="relative flex-1">
      <div className="relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="flex items-center p-3 border border-gray-200 rounded-lg">
          <Icon className="text-gray-400 text-xl mr-2" />
          {type === "select" ? (
            <select
              className="w-full bg-transparent focus:outline-none text-gray-600"
              value={value}
              onChange={onChange}
            >
              <option value="">{label}</option>
              {options.map((option, index) => (
                <option
                  key={index}
                  value={
                    typeof option === "object"
                      ? option.jobTypeName || `${option.min}-${option.max}`
                      : option
                  }
                >
                  {typeof option === "object"
                    ? option.jobTypeName || option.label
                    : `${option} năm`}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder={label}
              className="w-full bg-transparent focus:outline-none text-gray-600"
              value={value}
              onChange={(e) => onChange(e.target.value)} // Thay đổi ở đây
            />
          )}
          {value && (
            <AiOutlineCloseCircle
              className="text-gray-400 text-xl cursor-pointer hover:text-gray-600 transition-colors"
              onClick={onClear}
            />
          )}
        </div>
      </div>
    </div>
  );

  const WorkerCard = ({ worker }) => {
    const { user, experienceYears, bio, rating, verified } = worker;

    return (
      <div className="bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-start gap-4">
          <img
            src="src\Assets\images\thodien.jpg"
            alt={`${user.fullName}'s profile`}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {user.fullName}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <CiLocationOn className="text-gray-400" />
              <span className="text-sm">
                {user.address || "Chưa cập nhật địa chỉ"}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <BsBriefcase className="text-blue-500" />
                <span className="text-sm text-gray-600">
                  {experienceYears} năm kinh nghiệm
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BiStar className="text-yellow-400" />
                <span className="text-sm text-gray-600">
                  {rating}/5 đánh giá
                </span>
              </div>
              {verified && (
                <div className="flex items-center gap-1 text-green-500">
                  <MdVerified />
                  <span className="text-sm">Đã xác minh</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{bio}</p>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Liên hệ ngay
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          onClick={() => handleViewProfile(worker.workerId)}>
            Xem hồ sơ
          </button>
        </div>
      </div>
    );
  };

  const PaginationButton = ({ page, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 mx-1 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-600 hover:bg-blue-50"
      }`}
    >
      {page}
    </button>
  );

  // Tính toán phân trang
  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = filteredWorkers.slice(
    indexOfFirstWorker,
    indexOfLastWorker
  );
  const totalPages = Math.ceil(filteredWorkers.length / workersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
<<<<<<< HEAD

  // Filter workers based on selected criteria
  const handleSearch = () => {
    const filteredWorkers = workers.filter(worker => {
      const matchesJobType = selectedJobType ? worker.jobType === selectedJobType : true;
      const matchesLocation = selectedLocation ? worker.user.address === selectedLocation : true;
      const matchesExperience = selectedExperience ? worker.experienceYears === parseInt(selectedExperience) : true;
      return matchesJobType && matchesLocation && matchesExperience;
    });
    setSearchResults(filteredWorkers);
  };

  return (
<<<<<<< HEAD
    <div className="searchDiv grid gap-10 bg-greyIsh rounded-[10px] p-[3rem]">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
        {/* Dịch vụ Dropdown */}
        <div className="flex gap-2 items-center">
          <select
            className="bg-transparent text-blue-500 focus:outline-none"
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
          >
            {selectedJobType === '' && <option value="">Dịch vụ</option>}
            {jobTypes.map((job) => (
              <option key={job.jobTypeId} value={job.jobTypeName}>{job.jobTypeName}</option>
            ))}
          </select>
          <button
            className="text-[#a5a6a6] hover:text-textColor"
            onClick={() => setSelectedJobType('')}
          >
            &times;
          </button>
        </div>

        {/* Vị trí Dropdown */}
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="text-[20px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <select
            className="bg-transparent text-blue-500 focus:outline-none"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {selectedLocation === '' && <option value="">Vị trí</option>}
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
          <button
            className="text-[#a5a6a6] hover:text-textColor"
            onClick={() => setSelectedLocation('')}
          >
            &times;
          </button>
        </div>

        {/* Kinh nghiệm Dropdown */}
        <div className="flex gap-2 items-center">
          <select
            className="bg-transparent text-blue-500 focus:outline-none"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            {selectedExperience === '' && <option value="">Kinh nghiệm</option>}
            {uniqueExperienceYears.map((year, index) => (
              <option key={index} value={year}>{year} years</option>
            ))}
          </select>
          <button
            className="text-[#a5a6a6] hover:text-textColor"
            onClick={() => setSelectedExperience('')}
          >
            &times;
          </button>
        </div>

        <button
          type="button"
          className="bg-blueColor px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-blue-300"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>

      {/* Display search results */}
      <div className="results mt-5">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((worker) => (
              <li key={worker.id} className="p-3 bg-white shadow rounded mb-3">
                <p><strong>Tên:</strong> {worker.user.name}</p>
                <p><strong>Dịch vụ:</strong> {worker.jobType}</p>
                <p><strong>Vị trí:</strong> {worker.user.address}</p>
                <p><strong>Kinh nghiệm:</strong> {worker.experienceYears} years</p>
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
=======
=======

  return (
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Tìm kiếm dịch vụ
        </h2>

        <form className="space-y-6" onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <SearchBox
              icon={BsBriefcase}
              label="Chọn dịch vụ"
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              options={jobTypes}
              onClear={() => setSelectedJobType("")}
            />

            <SearchBox
              icon={CiLocationOn}
              label="Nhập địa điểm"
              value={selectedLocation}
              onChange={(value) => setSelectedLocation(value)} // Thay đổi ở đây
              type="text"
              options={[]}
              onClear={() => setSelectedLocation("")}
            />

            <SearchBox
              icon={MdWorkOutline}
              label="Kinh nghiệm"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              options={Array.from({ length: 20 }, (_, i) => i + 1)}
              onClear={() => setSelectedExperience("")}
            />

            <SearchBox
              icon={FaStar}
              label="Đánh giá"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              options={ratingRanges}
              onClear={() => setSelectedRating("")}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <AiOutlineSearch className="text-xl" />
              Tìm kiếm
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">Gợi ý tìm kiếm:</span>
          {jobTypes.slice(0, 4).map((job) => (
            <button
              key={job.jobTypeId}
              onClick={() => setSelectedJobType(job.jobTypeName)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              {job.jobTypeName}
            </button>
          ))}
        </div>
      </div>

      {/* Kết quả tìm kiếm */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-6">
          Kết quả tìm kiếm ({filteredWorkers.length})
        </h3>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentWorkers.map((worker) => (
                <WorkerCard key={worker.workerId} worker={worker} />
              ))}
            </div>

            {filteredWorkers.length === 0 && (
              <div className="text-center text-gray-600 py-8">
                Không tìm thấy thợ phù hợp với tìm kiếm của bạn
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white text-gray-600 hover:bg-blue-50 disabled:opacity-50"
                >
                  <IoIosArrowBack />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationButton
                    key={index + 1}
                    page={index + 1}
                    isActive={currentPage === index + 1}
                    onClick={() => paginate(index + 1)}
                  />
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white text-gray-600 hover:bg-blue-50 disabled:opacity-50"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </>
<<<<<<< HEAD
>>>>>>> efd02e0aa208b7717ce08e7602d9a6cdcd6c16a8
=======
>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
        )}
      </div>
    </div>
  );
};

export default Search;
import React, { useEffect, useState } from 'react';

const Search = () => {
  // State variables for API data and search form values
  const [jobTypes, setJobTypes] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch job types and worker data on component mount
  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await fetch('https://localhost:7062/api/JobTypes');
        const data = await response.json();
        setJobTypes(data);
      } catch (error) {
        console.error('Error fetching job types:', error);
      }
    };

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
  }, []);

  // Extract unique experience years and locations for dropdowns
  const uniqueExperienceYears = [...new Set(workers.map(worker => worker.experienceYears))];
  const uniqueLocations = [...new Set(workers.map(worker => worker.user.address).filter(address => address))];

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
        )}
      </div>
    </div>
  );
};

export default Search;
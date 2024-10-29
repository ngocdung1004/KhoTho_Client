import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios';

const Search = () => {
  // State variables for API data and search form values
  const [jobTypes, setJobTypes] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  // Fetch job types and worker data on component mount
  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get('https://localhost:7062/api/JobTypes');
        setJobTypes(response.data);
      } catch (error) {
        console.error('Error fetching job types:', error);
      }
    };

    const fetchWorkers = async () => {
      try {
        const response = await axios.get('https://localhost:7062/api/Workers');
        setWorkers(response.data);
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

  return (
    <div className='searchDiv grid gap-10 bg-greyIsh rounded-[10px] p-[3rem]'>
      <form>
        <div className='firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-greyIsh-700'>
          
          {/* Dịch vụ Dropdown */}
          <div className='flex gap-2 items-center'>
            <select
              className='bg-transparent text-blue-500 focus:outline-none w-[100%]'
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
            >
              {selectedJobType === '' && <option value=''>Dịch vụ</option>}
              {jobTypes.map((job) => (
                <option key={job.jobTypeId} value={job.jobTypeName}>{job.jobTypeName}</option>
              ))}
            </select>
            <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' onClick={() => setSelectedJobType('')}/>
          </div>

          {/* Vị trí Dropdown */}
          <div className='flex gap-2 items-center'>
            <CiLocationOn className='text-[25px] icon'/>
            <select
              className='bg-transparent text-blue-500 focus:outline-none w-[100%]'
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {selectedLocation === '' && <option value=''>Vị trí</option>}
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' onClick={() => setSelectedLocation('')}/>
          </div>

          {/* Kinh nghiệm Dropdown */}
          <div className='flex gap-2 items-center'>
            <select
              className='bg-transparent text-blue-500 focus:outline-none w-[100%]'
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              {selectedExperience === '' && <option value=''>Kinh nghiệm</option>}
              {uniqueExperienceYears.map((year, index) => (
                <option key={index} value={year}>{year} years</option>
              ))}
            </select>
            <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' onClick={() => setSelectedExperience('')}/>
          </div>

          <button className='bg-blueColor h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-blue-300'>Tìm kiếm</button>
        </div>
      </form>
    </div>
  );
};

export default Search;

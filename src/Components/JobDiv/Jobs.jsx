import React, { useEffect, useState } from 'react'
import { BiTimeFive } from 'react-icons/bi'


const Jobs = () => {
  const [workers, setWorkers] = useState([])

  useEffect(() => {
    fetch('https://localhost:7062/api/Workers')
      .then(response => response.json())
      .then(data => setWorkers(data))
      .catch(error => console.error('Error fetching workers:', error))
  }, [])

  return (
    <div>
      <div className="jobContainer flex gap-10 justify-center flex-wrap items-center py-10">
        {
          workers.map(({ workerId, user, experienceYears, bio, rating, verified }) => (
            <div key={workerId} className="group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
              <span className='flex justify-between items-center gap-4'>
                <h1 className='text-[16px] font-semibold text-textColor group-hover:text-white'>{user.fullName}</h1>
                <span className='flex items-center text-[#ccc] gap-1'>
                  <BiTimeFive /> {experienceYears} năm
                </span>
              </span>
              <img
                src="src\Assets\images\thodien.jpg"
                alt={`${user.fullName}'s profile`}
                className="w-[60px] h-[60px] rounded-full object-cover mb-4"
              />
              <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white'>
                {bio}
              </p>

              <div className='company flex items-center gap-2'>
                <span className='text-[14px] py-[1rem] block group-hover:text-white'>Rating: {rating}</span>
                <span className='text-[14px] py-[1rem] block group-hover:text-white'>Xác minh: {verified ? 'Yes' : 'No'}</span>
              </div>
              <button className='border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-textColor'>
                Xem hồ sơ
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Jobs

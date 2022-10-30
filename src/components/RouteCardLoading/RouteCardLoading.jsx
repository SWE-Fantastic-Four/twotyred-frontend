import { motion } from 'framer-motion'
import React from 'react'

const RouteCardLoading = ({ className }) => {
  return (
    <motion.div
      className={`wholecard sm:w-[337px] w-[288px] sm:h-[328px] h-[280.31px] rounded-[5px] border-[2px] border-solid border-black shadow-lg hover:cursor-pointer hover:outline-black ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: 1,
      }}
    >
      <div className="map sm:h-[216px] h-[184.59px] overflow-x-hidden">
        <div className="h-full w-full animate-pulse bg-light-gray flex justify-center items-center">
          <svg className="w-12 h-12 text-gray" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
        </div>
      </div>
      <div className="stats w-full sm:h-[112px] h-[95.72px] sm:pl-[15px] pl-[12.82px] sm:pr-[12px] pr-[10.26px] sm:pt-[12px] pt-[10.25px] sm:pb-[14px] flex flex-col">
        <div className="first animate-pulse flex justify-between items-center sm:text-[20px] text-[16.9139px] sm:leading-[23px] leading-[19.82px]">
          <div className="bg-light-gray rounded-full dark:bg-gray-700 w-48 h-[20px]"></div>
          <div className="bg-light-gray icons flex items-center h-full w-[57px] rounded-full">
          </div>
        </div>
        <div className="second animate-pulse flex sm:mt-[5px] mt-[4.27px] sm:text-[10px] text-[8.26px] sm:leading-[12px] leading-[10px] text-[#6B6B6B] font-normal whitespace-nowrap items-center">
          <div className="bg-light-gray h-[12px] w-48 rounded-full"/>
          <div className="bg-light-gray h-full w-[57px] ml-auto rounded-full" />
        </div>
        <div className="third flex sm:mt-[11px] mt-[8px] items-center">
          <div className="profilepic sm:w-[34px] sm:h-[34px] w-[29px] h-[29px] bg-light-gray rounded-full flex justify-center items-center">
          <svg className="w-3 h-3 text-gray" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
          </div>
          <div className="userinfo pl-[5px] animate-pulse">
            <div className="bg-light-gray h-[12px] rounded-full w-[54px] mb-[4px]" />
            <div className="bg-light-gray h-[10px] rounded-full w-[54px]" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RouteCardLoading

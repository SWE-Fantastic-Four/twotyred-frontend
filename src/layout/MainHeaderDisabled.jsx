import React from 'react'

const MainHeaderDisabled = () => {
  return (
    <nav className="flex w-full justify-center shadow-lg h-[98px] sticky top-0 bg-white z-50 cursor-default">
      <div className="flex flex-row-reverse items-center max-w-[var(--max-screen-width)] w-full text-dark-gray text-[24px] font-medium">
        <div className="h-full mr-[24px] flex items-center border-dark-gray relative group">
          <div className="rounded-full h-[50px] w-[50px] border" />
        </div>
        <div className="h-full mr-[41px] flex items-center border-dark-gray relative group">
          <p>Create New Route</p>
        </div>
        <div className="h-full mr-[40px] flex items-center border-dark-gray">
          <p>Dashboard</p>
        </div>
      </div>
    </nav>
  )
}

export default MainHeaderDisabled

import React from 'react'
import MainHeader from './MainHeader'

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[var(--max-screen-width)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout

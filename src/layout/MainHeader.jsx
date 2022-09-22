import React from 'react'
import { NavLink } from 'react-router-dom'
import P from '../constants/paths'

const MainHeader = () => {
  return (
    <nav className="flex w-full justify-center shadow-lg h-[98px] sticky top-0 bg-white z-50">
      <div className="flex flex-row-reverse items-center max-w-[var(--max-screen-width)] w-full text-dark-gray font-[24px]">
        <NavLink to={P.PROFILE} className={({ isActive }) => isActive ? "text-black" : undefined } >
          <div className="rounded-full border h-[50px] w-[50px] mr-[24px]" />
        </NavLink>
        <NavLink to={P.CREATEROUTE} className={({ isActive }) => (isActive ? "text-black" : "hover:border-b-[3px]") + " h-full mr-[41px] flex items-center border-dark-gray" }>
          <p>Create New Route</p>
        </NavLink>
        <NavLink to={P.DASHBOARD} className={({ isActive }) => (isActive ? "text-black" : "hover:border-b-[3px]") + " h-full mr-[40px] flex items-center border-dark-gray" }>
          <p>Dashboard</p>
        </NavLink>
      </div>
    </nav>
  )
}

export default MainHeader

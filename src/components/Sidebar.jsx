import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)

    return (
        <div className='min-h-screen w-72 bg-white border-r shadow-lg flex flex-col py-6 px-4'>

            {aToken && (
                <ul className='text-gray-700 space-y-4'>

                    {/* ✅ Dashboard */}
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-5 rounded-md text-lg font-semibold transition-all duration-300 
                            ${isActive ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg' : 'hover:bg-gray-200 hover:text-gray-900'}`
                        }
                        to={'/admin-dashboard'}
                    >
                        <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6 opacity-80" />
                        <p>Dashboard</p>
                    </NavLink>

                    {/* ✅ Appointments */}
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-5 rounded-md text-lg font-semibold transition-all duration-300 
                            ${isActive ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg' : 'hover:bg-gray-200 hover:text-gray-900'}`
                        }
                        to={'/all-appointment'}
                    >
                        <img src={assets.appointment_icon} alt="Appointments" className="w-6 h-6 opacity-80" />
                        <p>Appointments</p>
                    </NavLink>

                    {/* ✅ Add Venue */}
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-5 rounded-md text-lg font-semibold transition-all duration-300 
                            ${isActive ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg' : 'hover:bg-gray-200 hover:text-gray-900'}`
                        }
                        to={'/add-station'}
                    >
                        <img src={assets.add_icon} alt="Add Venue" className="w-6 h-6 opacity-80" />
                        <p>Add Venue</p>
                    </NavLink>

                    {/* ✅ Venue List */}
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-5 rounded-md text-lg font-semibold transition-all duration-300 
                            ${isActive ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg' : 'hover:bg-gray-200 hover:text-gray-900'}`
                        }
                        to={'/station-list'}
                    >
                        <img src={assets.people_icon} alt="Venues List" className="w-6 h-6 opacity-80" />
                        <p>Venues List</p>
                    </NavLink>

                </ul>
            )}
        </div>
    )
}

export default Sidebar;
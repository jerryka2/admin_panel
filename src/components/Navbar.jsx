import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
    };

    return (
        <div className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 bg-white border-b border-gray-200 shadow-sm">
            {/* Logo & Role Badge */}
            <div className="flex items-center gap-3 sm:gap-4">
                <h1
                    className="text-xl sm:text-2xl font-bold text-orange-600 cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => navigate(aToken ? '/admin-dashboard' : '/')}
                >
                    SaaHitt
                </h1>
                <span className="bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full border border-orange-600 shadow-sm">
                    {aToken ? 'Admin' : 'Guest'}
                </span>
            </div>

            {/* Log Out Button */}
            {aToken && (
                <button
                    onClick={logout}
                    className="bg-orange-600 text-white text-sm sm:text-base px-6 sm:px-8 py-2 rounded-lg font-medium shadow-md hover:bg-orange-700 hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-orange-300"
                >
                    Log Out
                </button>
            )}
        </div>
    );
};

export default Navbar;
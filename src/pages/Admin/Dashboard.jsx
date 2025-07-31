import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
    const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext);
    const [canceledAppointments, setCanceledAppointments] = useState({});

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    // ✅ Handle Cancel Button Click
    const handleCancel = async (appointmentId) => {
        await cancelAppointment(appointmentId);
        setCanceledAppointments((prev) => ({ ...prev, [appointmentId]: true }));
    };

    return dashData && (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
                📊 Admin Dashboard
            </h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Stations Card */}
                <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between border border-gray-200 hover:shadow-xl transition-transform duration-300">
                    <img src={assets.people_icon} alt="Stations" className="w-16 h-16 opacity-90" />
                    <div className="text-right">
                        <p className="text-5xl font-bold text-blue-600">{dashData.stations}</p>
                        <p className="text-gray-600 text-lg">Total Stations</p>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between border border-gray-200 hover:shadow-xl transition-transform duration-300">
                    <img src={assets.appointments_icon} alt="Appointments" className="w-16 h-16 opacity-90" />
                    <div className="text-right">
                        <p className="text-5xl font-bold text-green-600">{dashData.appointments}</p>
                        <p className="text-gray-600 text-lg">Total Appointments</p>
                    </div>
                </div>

                {/* Customers Card */}
                <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between border border-gray-200 hover:shadow-xl transition-transform duration-300">
                    <img src={assets.patients_icon} alt="Customers" className="w-16 h-16 opacity-90" />
                    <div className="text-right">
                        <p className="text-5xl font-bold text-purple-600">{dashData.user}</p>
                        <p className="text-gray-600 text-lg">Total Customers</p>
                    </div>
                </div>
            </div>

            {/* View Appointments Section */}
            <div className="mt-12 bg-white shadow-lg rounded-xl p-6 flex items-center justify-between border border-gray-200 hover:shadow-xl transition-transform duration-300 cursor-pointer">
                <img src={assets.list_icon} alt="List Appointments" className="w-12 h-12 opacity-90" />
                <p className="text-xl font-medium text-gray-700">View Appointments</p>
            </div>

            {/* Booking Details */}
            <div className="pt-8 border-t mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    📅 Latest Appointments
                </h2>

                {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                    <div className="space-y-6">
                        {dashData.latestAppointments.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 p-6 bg-white shadow-lg rounded-xl border border-gray-200">

                                {/* Appointment Image */}
                                <img
                                    src={item.stationData?.image || "https://via.placeholder.com/100"}
                                    alt={item.stationData?.name || "Station"}
                                    className="w-20 h-20 object-cover rounded-md"
                                />

                                {/* Appointment Details */}
                                <div className="flex-1">
                                    <p className="text-xl font-medium text-gray-800">
                                        {item.stationData?.name || "N/A"}
                                    </p>
                                    <p className="text-md text-gray-600">
                                        📅 {item.slotDate} | 🕒 {item.slotTime}
                                    </p>
                                </div>

                                {/* Cancel Button */}
                                <div>
                                    {item.isCancelled || canceledAppointments[item._id] ? (
                                        <span className="text-red-500 font-semibold">🚫 Cancelled</span>
                                    ) : (
                                        <button
                                            onClick={() => handleCancel(item._id)}
                                            className="px-5 py-2 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-600 transition-transform"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-lg text-center">No recent appointments.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

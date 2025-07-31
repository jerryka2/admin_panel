import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
    const [canceledAppointments, setCanceledAppointments] = useState({});

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }

        // ✅ Load canceled appointments from localStorage
        const storedCancellations = JSON.parse(localStorage.getItem("canceledAppointments")) || {};
        setCanceledAppointments(storedCancellations);
    }, [aToken]);

    // ✅ Convert `slotData` (2025_02_28) to "Feb 28, 2025"
    const formatDateTime = (slotData, slotTime) => {
        if (!slotData) return "Invalid Date";
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const [year, month, day] = slotData.split("_");
        return `📅 ${months[Number(month) - 1]} ${day}, ${year} | 🕒 ${slotTime}`;
    };

    // ✅ Handle Cancel Button Click (Updates LocalStorage)
    const handleCancel = async (appointmentId) => {
        await cancelAppointment(appointmentId);

        const updatedCancellations = { ...canceledAppointments, [appointmentId]: true };
        setCanceledAppointments(updatedCancellations);

        // ✅ Store in localStorage so it persists after refresh
        localStorage.setItem("canceledAppointments", JSON.stringify(updatedCancellations));
    };

    return (
        <div className="w-full max-w-7xl mx-auto mt-10 px-8">
            {/* 📋 Title Section */}
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">📋 All Appointments</h1>

            <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 p-8">
                {/* ✅ Card Layout with Enhanced Styling */}
                {appointments.length > 0 ? (
                    <div className="space-y-8">
                        {appointments.map((appointment, index) => (
                            <div key={appointment._id} className="bg-gray-50 shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-all duration-300">

                                {/* Appointment Info */}
                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    {/* Venue Image */}
                                    <img
                                        src={appointment.stationData?.image || "https://via.placeholder.com/100"}
                                        alt={appointment.stationData?.name || "Venue Image"}
                                        className="w-24 h-24 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                                    />

                                    {/* Details */}
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900">{appointment.userData?.name || "N/A"}</p>
                                        <p className="text-base font-medium text-gray-700">{appointment.stationData?.name || "N/A"}</p>
                                        <p className="text-sm text-gray-500">{formatDateTime(appointment.slotData, appointment.slotTime)}</p>
                                    </div>
                                </div>

                                {/* Price & Cancel Button */}
                                <div className="flex items-center gap-8 mt-4 sm:mt-0">
                                    <p className="text-xl font-bold text-orange-600">${appointment.amount}</p>

                                    {appointment.isCancelled || canceledAppointments[appointment._id] ? (
                                        <span className="text-red-600 font-semibold text-lg">🚫 Cancelled</span>
                                    ) : (
                                        <button
                                            onClick={() => handleCancel(appointment._id)}
                                            className="px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-sm"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="py-10 text-center text-gray-600 font-semibold text-xl">No appointments found.</p>
                )}
            </div>
        </div>
    );
};

export default AllAppointments;
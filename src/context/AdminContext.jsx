import axios from 'axios';
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [stations, setStations] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Ensure `.env` is correctly set

    /** ✅ Fetch all charging stations */
    const getAllStations = async () => {
        try {
            console.log("📡 Fetching stations from API...");
            const response = await axios.get(`${backendUrl}/api/admin/all-stations`, {
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (response.data.success) {
                setStations(response.data.stations);
                console.log("✅ Fetched Stations:", response.data.stations);
            } else {
                console.error("🚨 API Error:", response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("🚨 Failed to fetch stations:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to fetch stations.");
        }
    };

    /** ✅ Fetch all appointments */
    const getAllAppointments = async () => {
        try {
            console.log("📡 Fetching appointments from API...");
            const response = await axios.get(`${backendUrl}/api/admin/all-appointments`, {
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (response.data.success) {
                setAppointments(response.data.appointments);
                console.log("✅ Fetched appointments:", response.data.appointments);
            } else {
                console.error("🚨 API Error:", response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("🚨 Failed to fetch appointments:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to fetch appointments.");
        }
    };

    /** ✅ Cancel an appointment */
    const cancelAppointment = async (appointmentId) => {
        if (!appointmentId) {
            toast.error("❌ Appointment ID is missing!");
            return;
        }

        try {
            console.log("🔴 Cancelling appointment:", appointmentId);

            const { data } = await axios.delete(
                `${backendUrl}/api/admin/cancel-appointment/${appointmentId}`,
                { headers: { Authorization: `Bearer ${aToken}` } }
            );

            if (data.success) {
                toast.success("✅ Appointment cancelled successfully!");

                // ✅ Fetch Updated Appointments from Database
                getAllAppointments();

            } else {
                toast.error("⚠️ Failed to cancel appointment");
            }
        } catch (error) {
            console.error("❌ API Error:", error.response?.data?.message || error.message);
            toast.error("❌ Error cancelling appointment");
        }
    };

    const getDashData = async () => {
        try {
            console.log("Fetching dashboard data...");
            console.log("Admin Token Before Sending:", aToken);

            const { data } = await axios.get(
                `${backendUrl}/api/admin/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${aToken}` // ✅ Ensure actual token is here
                    }
                }
            );

            console.log("Raw API Response:", data);

            if (data.success) {
                setDashData(data.dashData);
                console.log("Dashboard Data:", data.dashData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                toast.error(error.response.data.message || "Server error occurred");
            } else {
                console.error("Request Failed:", error.message);
                toast.error("Network error occurred");
            }
        }
    };

    return (
        <AdminContext.Provider value={{
            aToken, setAToken,
            backendUrl,
            stations, getAllStations,
            appointments, setAppointments, getAllAppointments,
            cancelAppointment, dashData, getDashData
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;

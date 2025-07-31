import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const StationList = () => {
    const { stations, aToken, getAllStations } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            console.log("📡 Token found! Fetching stations...");
            getAllStations();
        } else {
            console.log("🚨 No authentication token found! Please log in.");
        }
    }, [aToken]);

    console.log("📦 Stations Data:", stations);

    return (
        <div className="px-10 py-8 bg-gradient-to-b from-gray-100 to-white min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                🏙️ All Venues
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {stations.map((station, index) => (
                    <div
                        key={station._id || index}
                        className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                        <img
                            src={station.image}
                            alt={`Venue ${index + 1}`}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{station.name}</h2>
                            <p className="text-gray-500 text-sm mb-4">
                                📍 {station.address.line1}, {station.address.line2}
                            </p>
                            <p className="text-lg text-gray-700 font-semibold">
                                Capacity: {station.power_capacity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StationList;

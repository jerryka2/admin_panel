import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';

const AddStation = () => {
    const [statImg, setStatImg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [chargingType, setChargingType] = useState('Wedding');
    const [brand, setBrand] = useState('Classic');
    const [powerCapacity, setPowerCapacity] = useState('');
    const [pricingPerKwh, setPricingPerKwh] = useState('');
    const [availability, setAvailability] = useState('Custom');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [aboutStation, setAboutStation] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            console.log("🚀 Form Submitted!");

            if (!statImg) {
                toast.error('⚠️ Image Not Selected');
                console.log("❌ No image selected.");
                return;
            }

            if (!aToken) {
                toast.error("❌ Authentication required!");
                console.log("🚨 No authentication token found!");
                return;
            }

            // ✅ Creating FormData
            const formData = new FormData();
            formData.append('image', statImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('charging_type', chargingType);
            formData.append('brand', brand);
            formData.append('power_capacity', powerCapacity);
            formData.append('pricing_per_kWh', Number(pricingPerKwh));
            formData.append('availability', availability);
            formData.append('address', JSON.stringify({ line1: addressLine1, line2: addressLine2 }));
            formData.append('about', aboutStation);

            // ✅ Debugging - Check what is being sent
            console.log("📡 Sending API Request to:", `${backendUrl}/api/admin/add-station`);
            console.log("🛠️ Request Headers:", { Authorization: `Bearer ${aToken}` });
            console.log("📦 Form Data Entries:");
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            // ✅ Sending API Request with Correct Headers
            const { data } = await axios.post(
                `${backendUrl}/api/admin/add-station`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                setStatImg(null);
                setName('');
                setPassword('');
                setEmail('');
                setAddressLine1('');
                setAddressLine2('');
                setBrand('Classic');
                setAboutStation('');
                setPowerCapacity('');
                setPricingPerKwh('');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("🚨 Error in form submission:", error);
            if (error.response) {
                console.log("❌ Server Response:", error.response.data);
            }
            toast.error(`❌ Error: ${error.response?.data?.message || "Something went wrong!"}`);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-8 w-full flex flex-col items-center">
            {/* 🚀 Title */}
            <div className="text-center mb-8">
                <p className="text-base text-gray-600 font-semibold tracking-wide">
                    Add New <span className="text-orange-600 font-bold">Event</span>
                </p>
                <h1 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                    Event & <span className="text-teal-600">Details</span>
                </h1>
            </div>

            {/* 🚀 Form Container */}
            <div className="bg-white px-12 py-10 border border-gray-200 rounded-3xl w-full max-w-5xl max-h-[85vh] overflow-y-auto shadow-xl transition-all duration-300 hover:shadow-2xl">
                {/* 🚀 Upload Image Section */}
                <div className="flex items-center gap-8 mb-8">
                    <label htmlFor="station-img" className="cursor-pointer flex items-center gap-4">
                        <img
                            className="w-24 h-24 bg-gray-100 rounded-full shadow-lg object-cover transition-transform duration-300 hover:scale-110 hover:ring-4 hover:ring-orange-300"
                            src={statImg ? URL.createObjectURL(statImg) : assets.upload_area}
                            alt="Upload Event"
                        />
                    </label>
                    <input onChange={(e) => setStatImg(e.target.files[0])} type="file" id="station-img" hidden />
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Upload Event Picture</p>
                        <p className="text-sm text-gray-500">Choose a vibrant image to showcase your event</p>
                    </div>
                </div>

                {/* 🚀 Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Organizer Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Enter Name"
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Organizer Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter Email"
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Event Type</label>
                        <select
                            onChange={(e) => setChargingType(e.target.value)}
                            value={chargingType}
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        >
                            <option value="Wedding">💍 Wedding</option>
                            <option value="Birthday">🎂 Birthday</option>
                            <option value="Corporate">💼 Corporate</option>
                            <option value="Festival">🎆 Festival</option>
                            <option value="Concert">🎤 Concert</option>
                        </select>
                    </div>
                </div>

                {/* 🚀 Brand, Capacity, and Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Event Theme</label>
                        <select
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        >
                            <option value="Classic">🎨 Classic</option>
                            <option value="Modern">🏙️ Modern</option>
                            <option value="Rustic">🌾 Rustic</option>
                            <option value="Vintage">🕰️ Vintage</option>
                            <option value="Thematic">🎭 Thematic</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Capacity (Guests)</label>
                        <input
                            onChange={(e) => setPowerCapacity(e.target.value)}
                            value={powerCapacity}
                            type="number"
                            placeholder="e.g. 100"
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold mb-2 block">Pricing Per Person (NPR)</label>
                        <input
                            onChange={(e) => setPricingPerKwh(e.target.value)}
                            value={pricingPerKwh}
                            type="number"
                            placeholder="e.g. 500"
                            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                            required
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <label className="text-gray-700 font-semibold mb-2 block">Availability</label>
                    <select
                        onChange={(e) => setAvailability(e.target.value)}
                        value={availability}
                        className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                    >
                        <option value="Custom">🕒 Custom</option>
                        <option value="Evening">🌙 Evening</option>
                        <option value="Daytime">☀️ Daytime</option>
                        <option value="Weekend">📅 Weekend</option>
                    </select>
                </div>

                {/* 🚀 Address Fields */}
                <div className="mt-8">
                    <label className="text-gray-700 font-semibold mb-2 block">Venue Address</label>
                    <input
                        onChange={(e) => setAddressLine1(e.target.value)}
                        value={addressLine1}
                        type="text"
                        placeholder="Address Line 1"
                        className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        required
                    />
                    <input
                        onChange={(e) => setAddressLine2(e.target.value)}
                        value={addressLine2}
                        type="text"
                        placeholder="Address Line 2"
                        className="w-full p-4 border border-gray-300 rounded-lg mt-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        required
                    />
                </div>

                {/* 🚀 About Station */}
                <div className="mt-8">
                    <label className="text-gray-700 font-semibold mb-2 block">About Event</label>
                    <textarea
                        onChange={(e) => setAboutStation(e.target.value)}
                        value={aboutStation}
                        placeholder="Describe your event"
                        rows={4}
                        className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        required
                    />
                </div>

                {/* 🚀 Submit Button */}
                <button
                    type="submit"
                    className="mt-8 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-semibold text-base hover:scale-105 transition-transform duration-300 hover:from-orange-600 hover:to-orange-700 shadow-lg"
                >
                    🎊 Add Event
                </button>
            </div>
        </form>
    );
};

export default AddStation;
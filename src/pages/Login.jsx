import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';

const Login = () => {
    const { backendUrl, token, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
            const { data } = response;

            if (data.success) {
                const bearerToken = data.token;
                localStorage.setItem('aToken', bearerToken);
                setAToken(bearerToken);
                toast.success(data.message);
                navigate('/admin-dashboard');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("🔴 Auth Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("aToken");
        if (storedToken) {
            navigate('/admin-dashboard');
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Access the event management dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 shadow-sm"
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a href="#" className="text-sm text-orange-600 font-medium hover:underline transition-all duration-200">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-orange-600 text-white py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 shadow-md ${
                            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700 hover:scale-105 focus:ring-4 focus:ring-orange-300'
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            '🔓 Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
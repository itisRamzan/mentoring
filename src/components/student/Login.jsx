import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [formData, setFormData] = useState({
        rollNo: '',
        password: '',
    });

    useEffect(() => {
        localStorage.removeItem('auth-token')
    }, [])

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:80/api/student/auth/login', formData);
            const { success, authToken } = response.data;

            if (success) {
                localStorage.setItem('auth-token', authToken);
                navigate('/home');
            } else {
                toast.error('Incorrect Credentials.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Student Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="rollNo" className="block mb-1">
                            Roll Number
                        </label>
                        <input
                            type="text"
                            id="rollNo"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md border w-full px-3 py-2"
                            placeholder="Enter Roll Number"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md border w-full px-3 py-2"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <button
                            type="submit"
                            className="bg-black text-white p-2 rounded hover:bg-blue-800"
                        >
                            Login
                        </button>
                        <p>
                            Register as Student?
                            <Link
                                className="bg-black text-white p-2 ml-2 rounded hover:bg-blue-800"
                                to="/studentRegister"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
                <br />
                <p className="w-fit mx-auto my-2">
                    Are you Mentor?
                    <Link className="bg-black text-white p-2 ml-2 rounded-l-lg hover:bg-blue-800" to="/mentorRegister">Register</Link>
                    <Link className="bg-black text-white p-2 rounded-r-lg hover:bg-blue-800" to="/mentorLogin">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;

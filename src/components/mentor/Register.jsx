import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
function MentorRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/api/mentor/auth/signup', formData);
            const { success, authToken } = response.data;

            if (success) {
                localStorage.setItem('authToken', authToken);
                navigate('/mentorLogin');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Mentor Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md border w-full px-3 py-2"
                            placeholder="Enter Name"
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
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.branch}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md border w-full px-3 py-2"
                            placeholder="Enter Branch"
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <button
                            type="submit"
                            className="bg-black text-white p-2 rounded hover:bg-blue-800"
                        >
                            Register
                        </button>
                        <span>
                            Already Registered?
                            <Link className="bg-black text-white p-2 ml-2 rounded hover:bg-blue-800" to="/mentorLogin">Login</Link>
                        </span>
                    </div>
                </form>
                <br />
                <p className="w-fit mx-auto my-2">
                    Are you Student?
                    <Link className="bg-black text-white ml-2 p-2 rounded-l-lg hover:bg-blue-800" to="/studentRegister">Register</Link>
                    <Link className="bg-black text-white p-2 rounded-r-lg hover:bg-blue-800" to="/studentLogin">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default MentorRegister;

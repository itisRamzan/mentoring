import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MentorNavbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mentor, setMentor] = useState({});
    const navbarRef = useRef(null);
    const token = localStorage.getItem("auth-token");
    const logout = () => {
        localStorage.removeItem('auth-token');
        navigate('/mentorLogin');
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(()=>{
        const fetchMentorData = async () => {
            const token = localStorage.getItem("auth-token");
            if (token) {
                try {
                    const response = await fetch("http://localhost:80/api/mentor/auth/getMentorDetails",
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": token,
                            },
                        })
                    const jsonData = await response.json();
                    setMentor(jsonData.mentor)
                }
                catch (e) {
                    alert("Error fetching Mentor data ", e);
                }
            } else {
                console.log("no token available");
            }
        };
        fetchMentorData();
    }, [])

    return (
        <nav ref={navbarRef} className="sticky w-full overflow-auto z-10 top-0 border border-b-black text-black bg-gray-200 p-4" >
            <div className={`justify-between items-center ${isMenuOpen ? "flex flex-col items-center text-center lg:flex lg:flex-row" : "lg:flex lg:flex-row"}`}>
                <div className={`flex flex-row items-center` + isMenuOpen ? "w-full flex flex-row justify-between items-center lg:w-fit" : ""}>
                    {/* Logo or title */}
                    <h1 className="text-3xl font-bold">CBIT</h1>
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg
                                    className="w-6 h-6 "
                                    fill="none"
                                    stroke="black"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                        stroke="black"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="black"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={`lg:flex lg:w-fit ${isMenuOpen ? "block" : "hidden"}`}>
                    {/* Navbar options */}
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-4">
                        <Link
                            to="/mentorHome"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Home
                        </Link>
                        <Link
                            to="/mentorProfile"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Profile
                        </Link>

                    </div>
                </div>
                <div className={`lg:flex lg:w-fit items-center justify-center ${isMenuOpen ? "block" : "hidden"}`}>
                    {/* Logout button */}
                    <p className="m-2">Welcome, {mentor.name}</p>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-800 hover:text-white transition duration-300" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MentorNavbar;

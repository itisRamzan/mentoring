import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const logout = () => {
        localStorage.removeItem('auth-token');
        console.log("logged out")
        toast.success("Logged out successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        navigate('/');
    }

    useEffect(() => { // Close the menu when clicked outside
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

    return (
        <nav ref={navbarRef} className="sticky w-full overflow-auto z-10 top-0 border border-b-black text-black bg-gray-200 p-4">
            <ToastContainer/>
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
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        <Link
                            to="/home"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Home
                        </Link>
                        <Link
                            to="/undertakingForm"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Undertaking Form
                        </Link>
                        <Link
                            to="/concerns"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Addressing Concerns
                        </Link>
                        <Link
                            to="/lateArrival"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Late Arrival
                        </Link>
                        <Link
                            to="/profile"
                            className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
                        >
                            Profile
                        </Link>
                    </div>
                </div>
                <div className={`lg:flex lg:w-fit items-center justify-center ${isMenuOpen ? "block" : "hidden"}`}>
                    {/* Logout button */}
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-800 hover:text-white transition duration-300" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

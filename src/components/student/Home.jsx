import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [resultConcern, setResultConcern] = useState(0);
    const [resultUndertaking, setResultUndertaking] = useState(0);
    const [noOfLateArrivals, setNoOfLateArrivals] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        const fetchData = async () => {
            try {
                if (token) {
                    const response1 = await axios.get(
                        "http://localhost:80/api/student/undertakingForm/getHistory",
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                    const response2 = await axios.get(
                        "http://localhost:80/api/student/concerns/getHistory",
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                    // const response3 = await axios.get("http://localhost:80/api/student/activities/lateArrivals",{headers:{"auth-token":token}});
                    const { success, message } = response1.data;
                    const { success2, message2 } = response2.data;
                    if (success || success2) {

                        let result1 = message.undertakingForm.reduce((acc, obj) => {
                            if (obj.approvalStatus === false) {
                                return acc + 1;
                            }
                            return acc
                        }, 0);
                        let result2 = message2.addressingConcerns.reduce((acc, obj) => {
                            if (obj.approvalStatus === false) {
                                return acc + 1;
                            }
                            return acc
                        }, 0);
                        // let result3 = response3.data.lateArrivals.reduce((acc, obj) => {
                        //     if (obj.status === "pending") {
                        //         return acc + 1;
                        //     }
                        // }, 0);
                        setResultUndertaking(result1);
                        setResultConcern(result2);
                        // setNoOfLateArrivals(result3);
                    }
                    else {
                        console.log("No data found");
                    }
                }
                else {
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        console.log("first")
        console.log(token)
        const fetchData = async () => {
            if (token) {
                console.log("Inside else")
                try {
                    const response = await fetch("http://localhost:80/api/student/activities/lateArrivals", {
                        method: "GET",
                        headers: {
                            "auth-token": token,
                        }
                    })
                    const data = await response.json();
                    setNoOfLateArrivals(data.lateArrivals.length);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="bg-gray-200 h-screen overflow-auto">
                {/* Navigation */}
                <Navbar />
                <div className="flex flex-col w-4/5 mx-auto">
                    {/* Carousel */}
                    <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-8">
                        <div class="flex justify-center items-center">
                            <div class="carousel">
                                <img
                                    src="https://d2n36fr2627nzy.cloudfront.net/test/images/logo.png"
                                    alt="CBIT logo Image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main content */}

                    {/* Undertaking Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="undertakingForm" >
                        <h2 className="text-2xl font-bold mb-4">
                            <Link
                                to="/undertakingForm"
                                className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800"
                            >
                                Undertaking Form
                            </Link>
                        </h2>
                        {resultUndertaking !== undefined && resultUndertaking !== null ? (
                            <span className="px-3">
                                You have{" "}
                                <strong className="text-red-500">{resultUndertaking}</strong>{" "}
                                forms which are not approved
                            </span>
                        ) : (
                            <span className="text-green-500">No pending forms.</span>
                        )}
                    </div>

                    {/* Addressing Concerns */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="addressingConcerns" >
                        <h2 className="text-2xl font-bold mb-4">
                            <Link
                                to="/concerns"
                                className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800"
                            >
                                Addressing Concerns
                            </Link>
                        </h2>

                        {resultConcern !== undefined && resultConcern !== null ? (
                            <span className="px-3">
                                You have <strong className="text-red-500">{resultConcern}</strong>{" "}
                                forms which are not approved
                            </span>
                        ) : (
                            <span className="text-green-500">No pending forms.</span>
                        )}
                    </div>

                    {/* Late Arrival */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="achievements" >
                        <h2 className="text-2xl font-bold mb-4">
                            <Link
                                to="/lateArrival"
                                className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800"
                            >
                                Late Arrival
                            </Link>
                        </h2>
                        {noOfLateArrivals !== undefined && noOfLateArrivals > 0 ? (
                            <span className="px-3">
                                You have <strong className="text-red-500">{noOfLateArrivals}</strong>{" "}
                                forms which are not approved
                            </span>
                        ) : (
                            <span>No pending forms.</span>
                        )}
                    </div>

                    {/* Marks */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="marks">
                        <h2 className="text-2xl font-bold mb-4">
                            <Link
                                to="/marks"
                                className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800"
                            >
                                Marks
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

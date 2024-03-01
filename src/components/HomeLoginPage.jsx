import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeLoginPage = () => {
    const [loginType, setLoginType] = useState("");
    const nav = useNavigate();

    const handleLoginTypeChange = (e) => {
        console.log(e.target.value)
        if (e.target.value === "student") {
            nav("/studentLogin");
        } else if (e.target.value === "mentor") {
            nav("/mentorLogin");
        }
        else if (e.target.value === "admin") {
            nav("/adminLogin");
        }
        else{
            console.log("I am nothing")
        }
    };

    return (
        <>
            <div className="bg-gray-400 w-full min-h-screen overflow-auto flex flex-col items-center justify-center">
                <p className="m-2 p-2 text-xl">
                    Welcome to Student Mentoring System
                </p>
                <select
                    value={loginType}
                    onChange={handleLoginTypeChange}
                    className="p-2 rounded border border-gray-500"
                >
                    <option value="">Select Login Type</option>
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </>
    );
};

export default HomeLoginPage
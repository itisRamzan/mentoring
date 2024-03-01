import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const MentorProfile = () => {
    const [mentor, setMentor] = useState(null);
    const [students, setStudents] = useState(null);
    useEffect(() => {
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
                    const studentsResponse = await fetch("http://localhost:80/api/mentor/auth/getStudents", 
                    { 
                        method: "GET", 
                        headers: {
                            "Content-Type": "application/json", 
                            "auth-token": token, 
                        }, 
                    });
                    const jsonData = await response.json();
                    const studentsJsonData = await studentsResponse.json();
                    setMentor(jsonData.mentor);
                    setStudents(studentsJsonData.students);
                }
                catch (e) {
                    alert("Error fetching Mentor data ", e);
                }
            } else {
                console.log("no token available");
            }
        };
        fetchMentorData();
    }, []);

    if (!mentor) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-200 overflow-auto h-screen">
                <div className="w-3/5 lg:w-2/5 overflow-auto mx-auto my-4 p-4 bg-gray-100 rounded shadow">
                    <h1 className="text-2xl font-bold mb-4">Mentor Profile</h1>
                    <p className="mb-2">
                        <span className="font-bold">Name:</span> {mentor.name}
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">EMail:</span> {mentor.email}
                    </p>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-2">Assigned Students</h2>
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-black text-center p-2">Roll Number</th>
                                    <th className="border border-black text-center p-2">Name</th>
                                    <th className="border border-black text-center p-2">Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length === 0 && (
                                    <tr>
                                        <td className="border border-black p-2 text-center" colSpan="5">
                                            No Students Assigned
                                        </td>
                                    </tr>
                                )}
                                {students.length > 0 &&
                                    students.map((student) => (
                                        <tr key={student._id}>
                                            <td className="border border-black text-center p-2">{student.rollNo}</td>
                                            <td className="border border-black text-center p-2">{student.name}</td>
                                            <td className="border border-black text-center p-2">{student.branch}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MentorProfile;
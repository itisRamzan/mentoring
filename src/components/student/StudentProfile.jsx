import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    useEffect(() => {
        const fetchStudentData = async () => {
            const token = localStorage.getItem("auth-token");
            if (token) {
                try {
                    const response = await axios.get(
                        "http://localhost:80/api/student/auth/getStudentDetails",
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                    setStudent(response.data.student);
                } catch (e) {
                    alert("Error fetching student data:", e);
                }
            } else {
                console.log("no token available");
            }
        };
        fetchStudentData();
    }, []);

    if (!student) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-200 overflow-auto h-screen">
                <div className="w-4/5 lg:w-2/5 overflow-auto mx-auto my-4 p-4 bg-gray-100 rounded shadow">
                    <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
                    <p className="mb-2">
                        <span className="font-bold">Roll No:</span> {student.rollNo}
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Name:</span> {student.name}
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">College:</span> {student.college}
                    </p>
                    <p className="mb-4">
                        <span className="font-bold">Branch:</span> {student.branch}
                    </p>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-2">Marks</h2>
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-black text-center p-2">Semester</th>
                                    <th className="border border-black text-center p-2">GPA</th>
                                    <th className="border border-black text-center p-2">Backlogs</th>
                                    <th className="border border-black text-center p-2">Subject</th>
                                    <th className="border border-black text-center p-2">Overall GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.marks.length === 0 && (
                                    <tr>
                                        <td className="border border-black p-2 text-center" colSpan="5">
                                            No marks available
                                        </td>
                                    </tr>
                                )}
                                {student.marks.map((mark, index) => (
                                    <tr key={index}>
                                        <td className="border border-black text-center p-2">{mark.semester}</td>
                                        <td className="border border-black text-center p-2">{mark.gpa}</td>
                                        <td className="border border-black text-center p-2">{mark.backlogs}</td>
                                        <td className="border border-black text-center p-2">{mark.subject}</td>
                                        <td className="border border-black text-center p-2">{mark.overallgpa}</td>
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

export default StudentProfile;

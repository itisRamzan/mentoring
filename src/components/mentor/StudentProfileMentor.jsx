import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MentorNavbar from "./Navbar";
const StudentProfileMentor = () => {
    let rollNo = useParams();
    rollNo = parseInt(rollNo.rollNo);
    const [forms, setForms] = useState();
    const [cgpa, setCgpa] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("auth-token");
                if (token) {
                    const response = await axios.post(
                        "http://localhost:80/api/mentor/auth/getParticularStudent",
                        {
                            rollNo,
                        },
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                    const { success, message } = response.data;
                    if (success) {
                        setForms(message);
                        if (message && message.marks && message.marks.length > 0) {
                            let latestCgpa = message.marks[message.marks.length - 1].overallgpa;
                            setCgpa(latestCgpa);
                        } else {
                            setCgpa("Null");
                        }
                    } else {
                        setForms(message);
                    }
                } else {
                    console.log("No token available!!!");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <MentorNavbar />
            <div className="mx-auto py-8 bg-gray-200 min-h-screen overflow-auto">
                {forms && ( // Check if forms is available before rendering
                    <div className="pb-3 border border-black mx-auto w-3/4 flex flex-col items-center justify-center">
                        <h3 className="text-xl font-semibold text-center m-3 lg:m-5">Student Profile</h3>
                        <div>
                            <p className="pb-3"><strong>Name :</strong> {forms.name}</p>
                            <p className="pb-3"><strong>Roll No :</strong> {forms.rollNo}</p>
                            <p className="pb-3"><strong>Branch :</strong> {forms.branch}</p>
                            <p className="pb-3"><strong>College :</strong> {forms.college}</p>
                            <p className="pb-3"><strong>CGPA :</strong> {cgpa}</p>
                        </div>
                    </div>
                )}
                <div className="py-5">
                    <table className="mx-auto border border-black w-3/4">
                        <thead>
                            <tr>
                                <th className="text-center border border-black py-2">Semester</th>
                                <th className="text-center border border-black py-2">GPA</th>
                                <th className="text-center border border-black py-2">Backlog</th>
                                <th className="text-center border border-black py-2">
                                    Backlog Subjects
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms && forms.marks && forms.marks.length > 0 ? (
                                forms.marks.map((mark, index) => (
                                    <tr key={index}>
                                        <td className="text-center border border-black p-2">{mark.semester}</td>
                                        <td className="text-center border border-black p-2">{mark.gpa}</td>
                                        <td className="text-center border border-black p-2">{mark.backlogs}</td>
                                        <td className="text-center border border-black p-2">{mark.subject}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-2">No History Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default StudentProfileMentor;

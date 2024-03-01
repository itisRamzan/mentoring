import React, { useEffect, useState } from "react";
import MentorNavbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const MentorHome = () => {
    const [students, setStudents] = useState();
    const [rollno, setRollNo] = useState('');
   
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("auth-token");
            if (token) {
                try {
                    const response = await axios.get(
                        "http://localhost:80/api/mentor/auth/getStudents",
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                    const { success, students } = response.data;
                    if (success) {
                        setStudents(students);
                    }
                    else {
                        console.log("Error fetching students")
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
    }, []);

    const countPending = (student) => {
        let count = 0;
        if (student.lateArrivals) {
            student.lateArrivals.forEach((lateArrival) => {
                if (lateArrival.status === "pending") {
                    count++;
                }
            });
        }
        if (student.achievements) {
            student.achievements.forEach((achievement) => {
                if (achievement.status === "pending") {
                    count++;
                }
            });
        }
        // console.log(student)
        if(student.undertakingForm){
            student.undertakingForm.forEach((undertaking)=>{
                if(undertaking.approvalStatus===false){
                    count++;
                }
            })
        }
        return count;
    };

    return (
        <>
            <MentorNavbar />
            <div className="bg-gray-200 overflow-auto" >
                <div className="flex flex-col w-4/5 mx-auto min-h-screen">
                    {/* Carousel */}
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-8">
                        <div className="flex justify-center items-center">
                            <div className="carousel">
                                <img
                                    src="https://d2n36fr2627nzy.cloudfront.net/test/images/logo.png"
                                    alt="CBIT logo Image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Approvals Table */}
                    <table>
                        <thead>
                            <tr>
                                <th className="border p-2 border-black text-center">S.No</th>
                                <th className="border p-2 border-black text-center">RollNo</th>
                                <th className="border p-2 border-black text-center">Name</th>
                                <th className="border p-2 border-black text-center">
                                    Approvals Left
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Adjust mapping here */}
                            {students ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td className="border p-2 border-black text-center">{index + 1}</td>
                                        <td className="border p-2 border-black text-center"><button className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded" ><Link to={`/combineLinks/${student.rollNo}`}>{student.rollNo}</Link></button></td>
                                        <td className="border p-2 border-black text-center"><button className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"><Link to={`/profile/${student.rollNo}`}>{student.name}</Link></button></td>
                                        <td className="border p-2 border-black text-center text-red-500">{countPending(student)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border border-black p-2 text-center">
                                        No Students Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MentorHome;
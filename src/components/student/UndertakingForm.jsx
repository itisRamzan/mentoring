import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";
import Navbar from "./Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UndertakingForm() {
  const [reason, setReason] = useState("");
  const [address, setAddress] = useState("");
  const [findForm, setFindForm] = useState({});

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await axios.get(
          "http://localhost:80/api/student/undertakingForm/getHistory",
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const { success, message } = response.data;
        if (success) {
          setFindForm(message);
        } else {
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchHistory();
  });
  const fetchData = async () => {
    if (reason && address) {
      const today = new Date().toISOString().split("T")[0];
      const newForm = {
        date: today,
        reason,
        address,
      };

      try {
        const token = localStorage.getItem("auth-token");
        const response = await axios.post(
          "http://localhost:80/api/student/undertakingForm",
          newForm,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const { success, message } = response.data;
        if (success) {
          toast.success("Letter Submitted Successfully!!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setReason("");
          setAddress("");
        } else {
          toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Please provide Reason and Address.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleDownloadPDF = (date) => {
    if (findForm && findForm.undertakingForm) {
      const form = findForm.undertakingForm.find((ele) => ele.date === date);

      if (form) {
        const content = `
          <div>
            <h2>Attendance Form</h2><br/><br/>
            <p><strong>RollNo:</strong>${findForm.rollNo}</p><br/><br/>
            <p><strong>Name:</strong>${findForm.name}</p><br/><br/>
            <p><strong>Reason for Low Attendance:</strong> ${form.reason}</p><br/><br/>
            <p><strong>Address:</strong> ${form.address}</p><br/><br/>
          </div>
        `;

        const pdfOptions = {
          margin: 10,
          filename: `Undertaking_Form_${form.date}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(content).set(pdfOptions).save();
      } else {
        console.error("Form not found for the specified date");
      }
    } else {
      console.error("No form data available");
    }
  };

  return (
    <>
      <Navbar />
      <div className=" mx-auto py-8 bg-gray-200 h-screen">
        <div className="p-4 w-3/5 mx-auto" id="pdf-content">
          <h2 className="text-2xl font-bold mb-4 text-center">Attendance Form</h2>
          <div className="mb-4">
            <label className="block mb-2">Reason for Low Attendance:</label>
            <textarea
              value={reason}
              onChange={handleReasonChange}
              className="border rounded p-2 w-full"
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address:</label>
            <textarea
              value={address}
              onChange={handleAddressChange}
              className="border rounded p-2 w-full"
              rows="3"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Submit
          </button>
          <h3 className="text-xl font-semibold my-4">Previous Forms</h3>
          <table className="min-w-full border border-black">
            <thead>
              <tr>
                <th className="border p-2 border-black text-center">Date</th>
                <th className="border p-2 border-black text-center">Download PDF</th>
                <th className="border p-2 border-black text-center">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {findForm &&
              findForm.undertakingForm &&
              findForm.undertakingForm.length > 0 ? (
                findForm.undertakingForm.map((ele, index) => (
                  <tr key={index}>
                    <td className="border p-2 border-black text-center">
                      {ele.date}
                    </td>
                    <td className="border p-2 border-black text-center">
                      <button
                        onClick={() => handleDownloadPDF(ele.date)}
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                      >
                        Download
                      </button>
                    </td>
                    <td className="border p-2 border-black text-center">
                      {ele.approvalStatus ? (
                        <p className="text-green-500">Approved</p>
                      ) : (
                        <p className="text-red-500">Pending</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border p-2 text-center" colSpan="3">
                    No History Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UndertakingForm;

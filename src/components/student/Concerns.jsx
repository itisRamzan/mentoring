import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Concerns = () => {
    const [query,setQuery]=useState('');
    const [findForm,setFindForm]=useState([])
    const handleQueryChange=(e)=>{
        setQuery(e.target.value)
    }
    useEffect(()=>{
      const fetchHistory=async()=>{
        try{
        const token=localStorage.getItem('auth-token')
        const response=await axios.get('http://localhost:80/api/student/concerns/getHistory',{
          headers:{
            'auth-token':token
          }
        })
        const {success2,message2}=response.data;
        if(success2){
          setFindForm(message2)
        }
        else{
          toast.error(message2, {
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
      }
      catch(err){
        console.log(err)
      }
    }
      fetchHistory()
    })
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const today=new Date().toISOString().split("T")[0];
        const newForm={
            date:today,
            query:query
        }
        if(query){
            try{
            const token=localStorage.getItem('auth-token')
            const response=await axios.post('http://localhost:80/api/student/concerns',{
                newForm
            },{
                headers:{
                    'auth-token':token
                }
            })
            const {success2,message2}=response.data
            // console.log(success2)
            if(success2){
                toast.success("Query Submitted successfully!!!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                setQuery('')
            }
            else{
                toast.error(message2, {
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
        }
        catch(err){
            console.log(err)
        }}
        else{
            toast.error('Please fill the Query', {
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
    }

    const handleDownloadPDF = (date) => {
        if (findForm && findForm.addressingConcerns) {
          const form = findForm.addressingConcerns.find((ele) => ele.date === date);
    
          if (form) {
            const content = `
              <div>
                <h2>Attendance Form</h2><br/><br/>
                <p><strong>RollNo:</strong>${findForm.rollNo}</p><br/><br/>
                <p><strong>Name:</strong>${findForm.name}</p><br/><br/>
                <p><strong>Query:</strong> ${form.query}</p><br/><br/> <br/> <br/>
              </div>
            `;
    
            const pdfOptions = {
              margin: 10,
              filename: `Undertaking_Form_${''}.pdf`,
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
    <div className='overflow-auto bg-slate-200'>
      
      <Navbar/>
      <div className="mx-auto py-8 bg-gray-200 h-screen overflow-auto">
        <div className="p-4 w-3/5 mx-auto" id="pdf-content">
          <h2 className="text-2xl font-bold mb-4 text-center">Addressing Concerns</h2>
          <div className="mb-4">
            <label className="block mb-2">Your Query:</label>
            <textarea
              value={query}
              onChange={handleQueryChange}
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
              findForm.addressingConcerns &&
              findForm.addressingConcerns.length > 0 ? (
                findForm.addressingConcerns.map((ele, index) => (
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
      <ToastContainer/>
      </div>
    </>
  )
}

export default Concerns

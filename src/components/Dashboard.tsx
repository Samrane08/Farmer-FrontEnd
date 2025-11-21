import React, { useRef, useState } from "react";
import Header from "./Header";
import aaplesarkar from "../../src/Images/aaple-sarkar.jpg";
import enb from "../../src/Images/enbI1.png";
import noimage from "../../src/Images/no_image_available.jpg";
import your from "../../src/Images/Right-Serve.png";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("registration");
  const [otpSent, setOtpSent] = useState(false);

  const [aadhaarNo, setAadhaarNo] = useState("");
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
   const divToPrintRef = useRef<HTMLDivElement>(null);

   function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
  }

  const handleRequestOtp = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: implement OTP request logic with aadhaarNo
    setOtpSent(true);
  };

  const handleVerifyOtp = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: implement OTP verification logic with aadhaarOtp
  };

  const policeVerify = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: implement police verification logic
  };

  const handleRegistrationSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: handle registration submit logic
  };

  const handlePrint = () => {
    const content = divToPrintRef.current;
    if (!content) return;

    // Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Write into the iframe properly
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Div</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            img {
              max-width: 100%;
            }
          </style>
        </head>
        <body>${content.outerHTML}</body>
      </html>
    `);
    iframeDoc.close();

    // Wait until the iframe finishes rendering
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    };
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card bggblue">
            <div className="card-body">
               <h5 className="card-title">Expected Loan Amount</h5>
               <div className="d-flex justify-content-between">
                <i className="bi bi-currency-rupee"></i>
                 <h2 className="card-text">54,470</h2>
               </div>
             
            </div>
          </div>
          </div>
           <div className="col">
             <div className="card bggreen">
            <div className="card-body">
               <h5 className="card-title">Uploaded Loan Amount</h5>
                 <div className="d-flex justify-content-between">
               <div>
                 <i className="bi bi-currency-rupee"></i>
                <i className="bi bi-cloud-upload-fill" style={{marginLeft: "-12px", fontSize: "2rem"}}></i>
               </div>
                 <h2 className="card-text">54,145</h2>
               </div>
             
            </div>
          </div>
          </div>
           <div className="col">
             <div className="card bggorange">
            <div className="card-body">
               <h5 className="card-title">Pending Loan Amount</h5>
                 <div className="d-flex justify-content-between">
               <div>
                 <i className="bi bi-currency-rupee"></i>
               <i className="bi bi-hourglass-top" style={{marginLeft: "-12px", fontSize: "2rem"}}></i>
               </div>
                 <h2 className="card-text">325</h2>
               </div>
             
            </div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;

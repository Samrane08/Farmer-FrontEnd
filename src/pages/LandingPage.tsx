/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileContract, FaHandHoldingUsd } from "react-icons/fa";
import mahaitlogo from "../Images/Maha_IT_LogoB.png";

import emblemLogo from "../Images/emblemLogo.png";
import sg from "../Images/maharashtralogo.png";



const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure any previous session data is cleared on landing
    localStorage.clear();
  }, []);

  return (
    <div className="bg">
    
      <div className="loginmob">
        
   <div className="d-flex justify-content-center align-items-center ps-2 pt-3 position-relative">
         <div style={{position: "absolute", left: "10px"}}>
          <a href="https://www.india.gov.in/" target="_blank" >
             <img
                  src={emblemLogo}
                  alt=""
                  className="enb"
                  style={{ width: "40px" }}
                />
          </a>
           
                  <a href="https://www.maharashtra.gov.in" target="_blank" >
                <img
                  src={sg}
                  alt=""
                  className="sg ms-lg-1"
                  style={{ width: "65px" }}
                />
                </a>
         </div>
               <div>
                 <h1 className="text-center m-0 pt-4 heading">
          शेतकरी कर्ज संकट निवारण योजना
        </h1>
            <h3 className="text-center m-0 heading m-0 p-0">  महाराष्ट्र शासन</h3>
               </div>
        </div>
        <div className="auth-box mt-5">
          <h2 className="my-4 mt-0 text-white text-center">Schemes</h2>

          <div className="d-flex flex-column flex-sm-row align-items-stretch justify-content-center gap-3 mb-4">
            <div className="w-100 w-sm-auto">
              <button
                type="button"
                className="btn btn-waiver btn-lg w-100 d-flex align-items-center justify-content-center px-4 py-3"
                onClick={() => navigate("/waiver-login")}
                aria-label="Waiver Login"
              >
                <FaFileContract className="me-2 fs-4" />
                <div className="text-start">
                  <div className="fw-bold">Waiver Login</div>
                  <small className="text-white-50">Access Waiver Portal</small>
                </div>
              </button>
            </div>

            <div className="w-100 w-sm-auto">
              <button
                type="button"
                className="btn btn-incentive btn-lg w-100 d-flex align-items-center justify-content-center px-4 py-3"
                onClick={() => navigate("/incentive-login")}
                aria-label="Incentive Login"
              >
                <FaHandHoldingUsd className="me-2 fs-4" />
                <div className="text-start">
                  <div className="fw-bold">Incentive Login</div>
                  <small className="text-white-50">Access Incentive Portal</small>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center copyrightlogin">
         Copyright © 2025. Design and Developed By MAHAIT.
        <a href="https://mahait.org/" target="_blank" rel="noopener noreferrer">
          <img src={mahaitlogo} alt="MAHAIT Logo" className="mahaitlogo" />
        </a>
      </div>
    </div>
  );
};

export default Landing;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from "react";
import Footer from "./footer";
import LeftPannel from "../components/template-parts/leftPannel";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation("App.Appliacation");
  const navigate = useNavigate();
  const location = useLocation();

  const [showPage, setShowPage] = useState(false);
  const [showProgressSteps, setShowProgressSteps] = useState(true);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true); // State for left panel

 

  useEffect(() => {

    if (location.pathname === '/school/teacher-details' || location.pathname === '/school/teacher-map' || location.pathname === '/school/dashboard' || location.pathname === '/school/application-status' || location.pathname === '/ChangePassword' || location.pathname.toLocaleLowerCase() === '/grievance' || location.pathname.toLocaleLowerCase() === '/grievance-support') {
      setShowProgressSteps(false);
    }
    else {
      setShowProgressSteps(true);
    }
  }, [location.pathname])

  return (
    <>
     
    
        <div>
          <Header />
          <main className="d-flex justify-content-start" style={{ marginTop: '-1px' }}>
            {/* {
              bearerToken !== "" && isAadharVerified && isEmailVerified && isMobileVerified && (
                <LeftPannel 
                isOpen={isLeftPanelOpen}
                onToggle={setIsLeftPanelOpen} // Pass the state and setter
              />
              )
            } */}
             <LeftPannel 
                isOpen={isLeftPanelOpen}
                onToggle={setIsLeftPanelOpen} // Pass the state and setter
              />

              <div className={`mainContent ${!isLeftPanelOpen ? 'mainContentToggle' : ''}`}>
              
              <div className="">
                <div>
                  {children}
                </div>
              </div>
            </div>


          </main>
          <Footer />
        </div>
      
    </>
  );
};

export default Layout;

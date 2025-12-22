import React from 'react';
import logo from '../Images/TenantClearanceLogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { parseToken } from '../Services/jwtDecode';

const Header: React.FC = () => {

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const bearerToken = useSelector((state: RootState) => state.authenticate.token);
  let bankName = "";
  let userName = "";

  if (bearerToken) {
    try {
      debugger
      const decoded = parseToken(bearerToken);
      bankName = decoded.BankName;
      userName = decoded.UserName;
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Hide header if on login page regardless of login state
  if (location.pathname === "/login") {
    return null;
  }

  // Optionally hide if not logged in (if desired)
  // if (!isLoggedIn) {
  //   return null;
  // }
  return (
    <header className="headers mb-8 px-3">
      <div className="row align-items-center ">
        <div className="col-2 col-md-auto text-start">
          <h6 className="text-center logotext colorwhite" >शेतकरी कर्ज संकट निवारण योजना</h6>
        </div>
        <div className="col text-start">
        </div>
        {/* BANK + USER together */}
        <div className="col-md-auto d-flex align-items-center gap-1">
          <h6 className="logotext colorwhite mb-0">{bankName}</h6>
          <h6 className="logotext colorwhite mb-0">( {userName} )</h6>
        </div>
        <div className="col-auto text-end">
          <button onClick={handleLogout} className='btn btn-warning btn-sm'>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

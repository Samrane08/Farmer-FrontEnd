import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { parseToken } from "../Services/jwtDecode";
import { RootState } from "../store/index";

const StatCard: React.FC<{
  title: string;
  iconLeft?: string;
  iconRight?: string;
  value: string | number;
  className?: string;
}> = ({ title, iconLeft, iconRight, value, className }) => (
  <div className="col-12 col-md-4 mb-4">
    <div className={`card ${className}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            {iconRight && (
              <i
                className={iconRight}
                
              ></i>
            )}
            {/* style={{ marginLeft: "-12px", fontSize: "2rem" }} */}
          </div>
          <h2 className="card-text">{value}</h2>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const token = useSelector((state: RootState) => state.authenticate.token);

  let fullName = "N/A";
  let roleId = 0;
  let bankId = 0;
  let districtId = 0;

  if (token) {
    try {
      const decoded = parseToken(token);
      fullName = decoded.Name;
      roleId = decoded.RoleId;
      bankId = decoded.BankId;
      districtId = decoded.DistrictId;
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  return (
    <div className="container-fluid">
      {/* <div className="text-center mt-3">
        <h3>
          Test (delete later): FullName: {fullName} | RoleId: {roleId} | BankId: {bankId} | DistrictId: {districtId}
        </h3>
      </div> */}

      <div className="row justify-content-center align-items-center mt-3">
        <StatCard title="Expected Loan Acounts" value={54470} className="bggblue" />
        <StatCard
          title="Uploaded Loan Acounts"
          value={54145}
          className="bggreen"
          iconRight="bi bi-cloud-upload-fill"
        />
        <StatCard
          title="Pending Loan Acounts"
          value={325}
          className="bggorange"
          iconRight="bi bi-hourglass-top"
        />
      </div>

        <div className="row justify-content-start align-items-center mt-3">
<div className="col-12 col-md-4 mb-4">
    <div className="card bggyellow">
      <div className="card-body">
        <h5 className="card-title">Demographics Accounts</h5>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            {/* <i className="bi bi-currency-rupee"></i> */}
           <i className="bi bi-pie-chart-fill"></i>

          
          </div>
          <h2 className="card-text">51000</h2>
        </div>
        
      </div>
    </div>
  </div>

  <div className="col-12 col-md-4 mb-4">
    <div className="card bggcyan">
      <div className="card-body">
        <h5 className="card-title">Non-Demographics Accounts</h5>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            {/* <i className="bi bi-currency-rupee"></i> */}
           <i className="bi bi-pie-chart-fill"></i>
            <i
                className="bi bi-x-circle"
                style={{ marginLeft: "2px", fontSize: "1rem" }}
              ></i>
              
          </div>
          <h2 className="card-text">3145</h2>
        </div>
      </div>
    </div>
  </div>

        </div>
    </div>
  );
};

export default Dashboard;

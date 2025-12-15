import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { parseToken } from "../Services/jwtDecode";
import { RootState } from "../store/index";



const DeletedDataDashboard: React.FC = () => {
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
      <div className="text-center mt-3">
        <h3>
          Test (delete later): FullName: {fullName} | RoleId: {roleId} | BankId: {bankId} | DistrictId: {districtId}
        </h3>
      </div>

      <div className="row justify-content-center align-items-center mt-3">
       
      </div>
    </div>
  );
};

export default DeletedDataDashboard;

import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Dashboard: React.FC = () => {
  const { fullName, token, roleId, bankId } = useSelector(
    (state: any) => state.authenticate
  );

  return (
    <div className="container-fluid">
      <Header />

      <div className="row justify-content-center align-items-center mt-3">
        <h3>
          Test (delete later): FullName: {fullName} | RoleId: {roleId} | BankId:{" "}
          {bankId}
        </h3>

        {/* Card 1 */}
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

        {/* Card 2 */}
        <div className="col">
          <div className="card bggreen">
            <div className="card-body">
              <h5 className="card-title">Uploaded Loan Amount</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <i className="bi bi-currency-rupee"></i>
                  <i
                    className="bi bi-cloud-upload-fill"
                    style={{ marginLeft: "-12px", fontSize: "2rem" }}
                  ></i>
                </div>
                <h2 className="card-text">54,145</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col">
          <div className="card bggorange">
            <div className="card-body">
              <h5 className="card-title">Pending Loan Amount</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <i className="bi bi-currency-rupee"></i>
                  <i
                    className="bi bi-hourglass-top"
                    style={{ marginLeft: "-12px", fontSize: "2rem" }}
                  ></i>
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

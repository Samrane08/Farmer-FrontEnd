import React from "react";
import Header from "./Header";

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
            <i className="bi bi-currency-rupee"></i>
            {iconRight && (
              <i
                className={iconRight}
                style={{ marginLeft: "-12px", fontSize: "2rem" }}
              ></i>
            )}
          </div>
          <h2 className="card-text">{value}</h2>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  // Hardcoded values for initial testing
  const fullName = "John Doe";
  const roleId = 1;
  const bankId = 4;

  return (
    <div className="container-fluid">
      <Header />

      {/* Test Info */}
      <div className="text-center mt-3">
        <h3>
          Test (delete later): FullName: {fullName} | RoleId: {roleId} | BankId: {bankId}
        </h3>
      </div>

      {/* Cards Row */}
      <div className="row justify-content-center align-items-center mt-3">
        <StatCard
          title="Expected Loan Amount"
          value={54470}
          className="bggblue"
        />

        <StatCard
          title="Uploaded Loan Amount"
          value={54145}
          className="bggreen"
          iconRight="bi bi-cloud-upload-fill"
        />

        <StatCard
          title="Pending Loan Amount"
          value={325}
          className="bggorange"
          iconRight="bi bi-hourglass-top"
        />
      </div>
    </div>
  );
};

export default Dashboard;

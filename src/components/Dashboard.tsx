import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { parseToken } from "../Services/jwtDecode";
import { RootState } from "../store/index";
import { apiCall, buildQueryParams } from "../Services/api";
import { getDashboardData } from "../Services/apiEndPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const bearerToken = useSelector((state: RootState) => state.authenticate.token);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      debugger
      const response = await apiCall<any>(`${getDashboardData}`, bearerToken, "GET");
      if (response.status === 200) {
        if (Array.isArray(response?.data?.Data) && response?.data?.Data?.length > 0)
          setData(Array.isArray(response?.data?.Data) ? response?.data?.Data : []);
      } else if (response.status === 401) {
        toast("Unauthorized", { type: "error" });
        navigate("/logout", { replace: true });
      } else {
        toast("Failed to load data", { type: "error" });
      }
    } catch {
      toast("Some error occurred", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <>
          {" "}
          <div className="loader">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      )}
      <div className="container-fluid">
        {/* <div className="text-center mt-3">
        <h3>
          Test (delete later): FullName: {fullName} | RoleId: {roleId} | BankId: {bankId} | DistrictId: {districtId}
        </h3>
      </div> */}

        <div className="row justify-content-center align-items-center mt-3">
          <StatCard title="Expected Loan Acounts" value={data[0]?.EstLoanAccounts} className="bggblue" />
          <StatCard
            title="Uploaded Loan Acounts"
            value={data[0]?.UploadedCount}
            className="bggreen"
            iconRight="bi bi-cloud-upload-fill"
          />
          <StatCard
            title="Pending Loan Acounts"
            value={data[0]?.EstLoanAccounts - data[0]?.UploadedCount}
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
                  <h2 className="card-text">{data[0]?.DemographicsAccounts}</h2>
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
                  <h2 className="card-text">{data[0]?.NonDemographicsAccounts}</h2>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;

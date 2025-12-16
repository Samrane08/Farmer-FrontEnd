import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { parseToken } from "../Services/jwtDecode";
import { RootState } from "../store/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCall, buildQueryParams } from "../Services/api";
import { getDeletedBankDataResponse } from "../Services/apiEndPoint";



const DeletedDataDashboard: React.FC = () => {
  const token = useSelector((state: RootState) => state.authenticate.token);

  let fullName = "N/A";
  let roleId = 0;
  let bankId = 0;
  let districtId = 0;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [previewData, setPreviewData] = useState<any>({});
    const [rows, setRows] = useState<Record<string, any>[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
  

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

      useEffect(() => {
        getDeletedBankData();
      }, []);

    const getDeletedBankData = async () => {
        debugger
        setIsLoading(true);
            try {
              const params = {
                pageNo: pageNo,
                pageSize: pageSize,
              };
              const query = buildQueryParams(params);
              const response = await apiCall<any>(`${getDeletedBankDataResponse}?${query}`, "", "GET");
              if (response.status === 200) {
                debugger
                 setRows(response.data);
                setTotalCount(response.data.TotalRecords ?? 0);
                if (response.data.length > 0) setPreviewData(response.data ?? {});
                else toast(response.data.Message, { type: "error", position: "top-center" });
              } else if (response.status === 401) {
                toast(response.data.Message, { type: "error" });
                navigate("/logout", { replace: true });
              } else {
                toast(response.data.Message, { type: "error" });
              }
            } catch {
              toast("Some Error occurred", { type: "error", position: "top-right" });
            } finally {
              setIsLoading(false);
            }
        // Implement the logic to fetch deleted bank data
    }

    if (rows.length === 0) return <p>No data</p>;

    const columns = Object.keys(rows[0]).filter(
    c => c !== "TotalCount"
    );

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPageNo(p)}
            disabled={p === pageNo}
            style={{ marginRight: "5px" }}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
};

export default DeletedDataDashboard;

import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { parseToken } from "../Services/jwtDecode";
import { RootState } from "../store/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCall, buildQueryParams } from "../Services/api";
import { getDeletedBankDataResponse } from "../Services/apiEndPoint";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';



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
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
      const hiddenColumns = ["BRID","BankId"];
  const sortableColumns = ["BranchName","IFSCCode","LoanHolderName"];
  const [first, setFirst] = useState(0);
  

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
}, [pageNo, pageSize]);
    const getDeletedBankData = async () => {
        setIsLoading(true);
            try {
              const params = {
                pageNo: pageNo,
                pageSize: pageSize,
              };
              const query = buildQueryParams(params);
              const response = await apiCall<any>(`${getDeletedBankDataResponse}?${query}`, "", "GET");
              if (response.status === 200) {
                 setRows(Array.isArray(response.data.data) ? response.data.data : []);
                setTotalCount(response.data.totalCount ?? 0);
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

    const dynamicColumns = useMemo(() => {
        if (!rows.length) return [];
        return Object.keys(rows[0])
          .filter((col) => !hiddenColumns.includes(col))
          .map((col) => ({
            field: col,
            header: col.replace(/_/g, " "),
            sortable: sortableColumns.includes(col)
          }));
      }, [rows]);
        const bodyTemplate = (rowData: any, column: any) => {
    const value = rowData[column.field];
    return value !== null && value !== undefined ? value : "-";
  };





  const onPageChange = (event: any) => {
  setFirst(event.first);
  setPageNo(event.page + 1); // API expects 1-based page
  setPageSize(event.rows); // ✅ user-selected page size
};
useEffect(() => {
  setPageNo(1);
  setFirst(0);
}, [pageSize]);

  return (
    <div className="application-preview form">
          <h5 className="mb-3">Uploaded Bank Data</h5>
          <DataTable
                value={rows}
                loading={isLoading}
                paginator
                lazy
                first={first}
                rows={pageSize}
                totalRecords={totalCount}
                onPage={onPageChange}
                rowsPerPageOptions={[10, 25, 50, 100]}
                scrollable
                stripedRows
                showGridlines
                emptyMessage="No records found"
>
            {dynamicColumns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable={col.sortable}
                body={bodyTemplate}
              />
            ))}
    
          </DataTable>
        </div>
  );
};

export default DeletedDataDashboard;

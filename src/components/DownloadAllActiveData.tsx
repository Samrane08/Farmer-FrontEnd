import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../Services/api";
import { getActiveData } from "../Services/apiEndPoint";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { exportToExcel } from "../Services/exportToExcel";

const DownloadAllActiveData: React.FC = () => {
  const navigate = useNavigate();
  const bearerToken = useSelector((state: RootState) => state.authenticate.token);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const hiddenColumns = ["BRID", "BankId", "DistrictCode", "TalukaCode", "VillageCode", "CreatedBy", "CreatedOn", "ModifyBy", "ModifyOn", "IsActive"];
  const sortableColumns = ["AadharNo", "PACSMembershipNo", "FarmerName"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setIsLoading(true);
    try {
      const response = await apiCall<any>(`${getActiveData}`, bearerToken, "GET");
      if (response.status === 200) {
        if (Array.isArray(response?.data?.Data) && response?.data?.Data?.length > 0)
          setRows(Array.isArray(response?.data?.Data) ? response?.data?.Data : []);
        else
          toast("No records found", { type: "success" });
      } else if (response.status === 401) {
        toast("Unauthorized", { type: "error" });
        navigate("/logout", { replace: true });
      } else {
        toast("Failed to load data", { type: "error" });
      }
    } catch {
      toast("Some error occurred", { type: "error" });
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setIsLoading(true);
    try {
      const res = await apiCall<any>(`${getActiveData}`, bearerToken, "GET");
      if (res.status === 200) {
        const arrHeaders: string[] = [];
        const resp = res?.data?.Data;
        for (var key in resp[0]) {
          if (key.length > 0) {
            try {
              arrHeaders.push(key.replace(/([A-Z])/g, " $&").trim());
            } catch (error) {
              arrHeaders.push(key);
            }
          }
        }
        const Headers: any[] = [];
        Headers.push(arrHeaders);
        setIsLoading(false);
        setLoading(false);
        const cuurentDate = new Date();
        const month = cuurentDate.getMonth() + 1;
        const year = cuurentDate.getFullYear();
        const date = cuurentDate.getDate();
        const today = `${date}-${month}-${year}`;
        exportToExcel(res?.data?.Data, `Active_Bank_Data_${today}`, Headers);
      }
    } catch {
      toast("Some Error occurred", { type: "error", position: "top-right" });
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  /**
   * Extract dynamic column names
   */
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

  /* ============================= */
  /* CELL TEMPLATE */
  /* ============================= */
  const bodyTemplate = (rowData: any, column: any) => {
    const value = rowData[column.field];
    return value !== null && value !== undefined ? value : "-";
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
      <div className="application-preview form">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Download All Active Data</h5>
          <Button
            label="Download File"
            icon="pi pi-download"
            className="p-button-success"
            onClick={handleDownload}
            disabled={loading}
          />
        </div>
        <DataTable
          value={rows}
          loading={loading}
          paginator
          rows={10}
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
    </>
  );
};

export default DownloadAllActiveData;

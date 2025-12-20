import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCall, buildQueryParams } from "../Services/api";
import { getDownloadFiles, getFormerUploadedBankData } from "../Services/apiEndPoint";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useSelector } from "react-redux";
import { RootState } from "../store";

const FormerUploadedBankData: React.FC = () => {
  const navigate = useNavigate();
  const bearerToken = useSelector((state: RootState) => state.authenticate.token);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const hiddenColumns = ["AFSID"];
  const sortableColumns = ["Bank_Name", "User_FileName"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setIsLoading(true);
    try {
      const response = await apiCall<any>(`${getFormerUploadedBankData}`, bearerToken, "GET");
      if (response.status === 200) {
        if(Array.isArray(response.data) && response.data.length > 0)
          setRows(Array.isArray(response.data) ? response.data : []);
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

  const handleDownload = async (row: Record<string, any>) => {
    console.log("Download row:", row);
    setLoading(true);
    setIsLoading(true);
    try {
      const res = await apiCall<Blob>(getDownloadFiles, bearerToken, "GET", undefined, "blob");
      if (res.isBlob && res.data instanceof Blob) {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = "BankData.zip";
        link.click();
        window.URL.revokeObjectURL(url);
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
        <h5 className="mb-3">Uploaded Bank Data</h5>
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

          {/* Action Column */}
          <Column
            header=""
            body={(rowData) => (
              <Button
                label="Download"
                icon="pi pi-download"
                className="p-button-sm p-button-primary"
                onClick={() => handleDownload(rowData)}
              />
            )}
            style={{ minWidth: "140px" }}
          />
        </DataTable>
      </div>
    </>
  );
};

export default FormerUploadedBankData;

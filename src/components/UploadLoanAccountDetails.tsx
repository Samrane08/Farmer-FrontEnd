import React, { useMemo, useState } from "react";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import { apiCall } from "../Services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { DownloadIFSCCode, DownloadPACS, UploadWaiverExcel } from "../Services/apiEndPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { saveAs } from 'file-saver';
import ExcelFile from '../asset/files/SampleLoanDetailsFile.xlsx';

const UploadLoanAccountDetails: React.FC = () => {
    const navigate = useNavigate();
    const bearerToken = useSelector((state: RootState) => state.authenticate.token);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rows, setRows] = useState<Record<string, any>[]>([]);
    const hiddenColumns = ["AFSID"];
    const sortableColumns = ["Bank_Name", "User_FileName"];
    const visibleColumns = ["SrNo", "Response","Checksum"];


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire("Warning", "Please select a file to upload", "warning");
            return;
        }

        setUploading(true);
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await apiCall<any>(UploadWaiverExcel, bearerToken, "POST", formData);
            if (response.status === 200) {
                const { Message, Data } = response.data;
                toast(Message, { type: "success" });
                // ✅ CASE 1: Success message – DO NOT set rows
                if ((Array.isArray(Data) && Data[0]?.Response === "SUCCESS")) {
                    setRows([]); // optional: clear table
                    return;
                }

                // ❌ CASE 2: Validation / error rows – show in table
                if (Array.isArray(Data)) {
                    const filteredRows = Data.filter(
                        (row) => row?.Response !== "SUCCESS"
                    );
                    setRows(filteredRows);
                } else {
                    setRows([]);
                }
            } else if (response.status === 401) {
                toast("Unauthorized", { type: "error" });
                navigate("/logout", { replace: true });
            } else {
                toast("Failed to load data", { type: "error" });
            }
        } catch {
            toast("Some error occurred", { type: "error" });
        } finally {
            setUploading(false);
            setIsLoading(false)
        }
    };

    const handleDownload = () => {
        saveAs(ExcelFile, 'SampleLoanDetailsFile.xlsx');
    };

    const downloadFiles = async () => {

        setIsLoading(true);
        try {
            const res = await apiCall<Blob>(DownloadIFSCCode, bearerToken, "GET", undefined, "blob");
            if (res.isBlob && res.data instanceof Blob) {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = url;
                link.download = "DownloadIFSC.xlsx";
                link.click();
                window.URL.revokeObjectURL(url);
            }
        } catch {
            toast("Some Error occurred", { type: "error", position: "top-right" });
        } finally {
            setIsLoading(false);
        }
    };


    const downloadPACS = async () => {
        setIsLoading(true);
        try {
            const res = await apiCall<Blob>(DownloadPACS, bearerToken, "GET", undefined, "blob");
            if (res.isBlob && res.data instanceof Blob) {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = url;
                link.download = "DownloadPACS.xlsx";
                link.click();
                window.URL.revokeObjectURL(url);
            }
        } catch {
            toast("Some Error occurred", { type: "error", position: "top-right" });
        } finally {
            setIsLoading(false);
        }
    };

    /**
      * Extract dynamic column names
      */
    // const dynamicColumns = useMemo(() => {
    //     if (!rows.length) return [];
    //     return Object.keys(rows[0])
    //         .filter((col) => !hiddenColumns.includes(col))
    //         .map((col) => ({
    //             field: col,
    //             header: col.replace(/_/g, " "),
    //             sortable: sortableColumns.includes(col)
    //         }));
    // }, [rows]);

    const dynamicColumns = useMemo(() => {
        if (!rows.length) return [];

        return visibleColumns
            .filter((col) => col in rows[0]) // safety check
            .map((col) => ({
                field: col,
                header: col.replace(/_/g, " "),
                sortable: sortableColumns.includes(col),
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
            <div className="card p-3">
                <h5 className="mb-3">Upload Loan Account Details</h5>
                <hr />

                {/* Instructions Box */}
                <div
                    style={{
                        backgroundColor: "#fff9c4",
                        border: "1px solid #f0e68c",
                        padding: "15px",
                        borderRadius: "4px",
                        fontSize: "14px",
                        marginBottom: "15px"
                    }}
                >
                    <p>Please follow the instructions below for uploading loan data.</p>
                    <ul style={{ paddingLeft: "18px" }}>
                        <li>Click "Download Sample Loan Details File" to download the Excel sample file.</li>
                        <li>File format should be <b>xlsx</b>.</li>
                        <li>Loan information must be filled as per the provided template.</li>
                        <li>Maximum rows allowed: <b>4000</b>, file size: <b>5 MB</b>.</li>
                        <li>Internet speed should be minimum <b>8 MBPS</b>.</li>
                        <li>Select the Excel file and click Upload.</li>
                        <li>Check result column and click Save.</li>
                        <li>Download result file for failed records.</li>
                        <li>
                            File name should contain only English alphabets, numbers, underscores
                            and extension xls/xlsx.
                        </li>
                        <li>
                            Upload deceased case data in a separate file. Do not mix cases.
                        </li>
                    </ul>
                </div>

                {/* Download Buttons */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button
                        label="Download Sample Loan Details File"
                        icon="pi pi-download"
                        className="p-button-primary"
                        onClick={handleDownload}
                    />

                    <div className="d-flex gap-2">
                        <Button
                            label="Download IFSC Master"
                            icon="pi pi-download"
                            className="p-button-warning"
                            onClick={downloadFiles}
                        />
                        <Button
                            label="Download PACS Master"
                            icon="pi pi-download"
                            className="p-button-warning"
                            onClick={downloadPACS}
                        />
                    </div>
                </div>

                {/* Upload Section */}
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <label className="form-label">Upload File</label>
                        <input
                            type="file"
                            className="form-control"
                            accept=".xlsx"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="col-md-2 mt-4">
                        <Button
                            label="Upload"
                            className="p-button-success"
                            onClick={handleUpload}
                            loading={uploading}
                        />
                    </div>
                </div>

                <DataTable
                    value={rows}
                    loading={isLoading}
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

export default UploadLoanAccountDetails;
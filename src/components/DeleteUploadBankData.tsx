import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

import { apiCall, buildQueryParams } from "../Services/api";
import {
  BranchList,
  searchUploadedBankData,
  deleteUploadedBankData
} from "../Services/apiEndPoint";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const DeleteUploadedBankData: React.FC = () => {
  /* ============================= */
  /* STATE */
  /* ============================= */
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("Aadhar Number");
  const [searchValue, setSearchValue] = useState("");

  const [rows, setRows] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ============================= */
  /* LOAD BRANCHES */
  /* ============================= */
  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const query = buildQueryParams({ bankId: "1" });
      const res = await apiCall<any>(`${BranchList}?${query}`, "", "GET");
      if (res.status === 200) {
        setBranches(res.data || []);
      }
    } catch {
      toast("Failed to load branches", { type: "error" });
    }
  };

  /* ============================= */
  /* SEARCH */
  /* ============================= */
  const handleSearch = async () => {
    if (!searchValue) {
      toast("Please enter search value", { type: "warning" });
      return;
    }

    setLoading(true);
    setRows([]);
    setSelectedRows([]);

    try {
      const query = buildQueryParams({
        BranchID: selectedBranch || 0,
        SearchBy: selectedOption.split(" ")[0],
        SearchValue: searchValue
      });

      const res = await apiCall<any>(
        `${searchUploadedBankData}?${query}`,
        "",
        "GET"
      );

      if (res.status === 200) {
        setRows(Array.isArray(res.data) ? res.data : []);
      } else {
        toast("No Record Found", { type: "info" });
      }
    } catch {
      toast("Search failed", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ============================= */
  /* DELETE */
  /* ============================= */
  const handleDelete = async () => {
    if (!selectedRows.length) return;

    const ids = selectedRows.map((r) => r.ID).join(",");

    try {
      let requestModel = {
        Ids: ids
      };
      setLoading(true);
      const res = await apiCall<any>(deleteUploadedBankData, "", "POST", requestModel);
      if (res.status === 200) {
        toast("Deleted successfully", { type: "success" });
        handleSearch();
      }
    } catch {
      toast("Delete failed", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ============================= */
  /* DYNAMIC COLUMNS */
  /* ============================= */
  const columns = useMemo(() => {
    if (!rows.length) return [];
    return Object.keys(rows[0]).map((key) => ({
      field: key,
      header: key.replace(/_/g, " ")
    }));
  }, [rows]);

  /* ============================= */
  /* RENDER */
  /* ============================= */
  return (
    <div className="card">
      <h5 className="mb-3">Delete Uploaded Bank Data</h5>

      <div
        style={{
          backgroundColor: "#d9f1f4",
          padding: "12px 16px",
          borderRadius: "4px",
          marginBottom: "12px",
          fontSize: "13px"
        }}
      >
        <div>
          # Search the loan account holder data according to following criteria and
          press delete button to delete the record.
        </div>
        <div>
          # If one joint loan account record is deleted then any joint loan accounts
          associated with it will be deleted as well. If joint loan accounts are 72
          hours old (uploaded three days ago) or Vishishta Kramank has been generated
          then such loan accounts cannot be deleted.
        </div>
        <div>
          # The uploaded loan accounts can be deleted up to 72 hours after uploaded
          and then upload again.
        </div>

        <div className="mt-2 flex align-items-center">
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#f5b7b1",
              border: "1px solid #999",
              marginRight: "6px"
            }}
          />
          This color indicates Joint Loan Account
        </div>

        <div className="flex align-items-center">
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#a9dfbf",
              border: "1px solid #999",
              marginRight: "6px"
            }}
          />
          Joint loan account uploaded before 72 hours and cannot be deleted.
        </div>
      </div>

      {/* ================= SEARCH ROW ================= */}
      <div className="row">

        <div className="col-md-3 form-group">
          {/* Branch Select */}
          <label>Select Branch</label>
          <select
            className="form-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="0">All</option>
            {branches.map((b) => (
              <option key={b.BranchID} value={b.BranchID}>
                {b.Branch}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 form-group">
          {/* Search Option */}
          <label>Select Option</label>
          <select
            className="form-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Aadhar Number">Aadhar Number</option>
            <option value="Loan Account Number">Loan Account Number</option>
            <option value="Saving Account Number">Saving Account Number</option>
          </select>
        </div>

        <div className="col-md-3 form-group">

          {/* Input */}
          <InputText
            className="form-control"
            value={searchValue}
            keyfilter="int"
            placeholder="Enter number"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-md-3 form-group">


          {/* Search Button */}
          <Button
            label="Search"
            icon="pi pi-search"
            onClick={handleSearch}
          />
        </div>

      </div>

      {/* ================= DELETE BUTTON ================= */}
      {selectedRows.length > 0 && (
        <Button
          label="Delete Selected"
          icon="pi pi-trash"
          className="p-button-danger mb-2"
          onClick={handleDelete}
        />
      )}

      {/* ================= TABLE ================= */}
      <DataTable
        value={rows}
        loading={loading}
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        dataKey="ID"
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        stripedRows
        showGridlines
        emptyMessage="No Record Found"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        />

        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default DeleteUploadedBankData;
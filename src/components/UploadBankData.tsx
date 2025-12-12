import React, { useState } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { renderToString } from "react-dom/server";
import {  postOfflineExistingApplicant } from "../Services/OfflineApplicantDL";

interface AadhaarData {
  BankName: string;
  BankBranchIFSCCode: string;
  BranchName: string;
  PACsId: string;
  PACsMembershipId: string;
  AadharNumber: string;
  FarmerNameAsPerAadhar: string;
  GenderAsPerAadhar: string;
  Category: string;
  MobileNo: string;
  ResidentialAddressAsPerAadhar: string;
  District: string;
  Taluka: string;
  GramPanchayatNagarPalikaMahaNagarPalika: string;
  PinCode: string;
  AgriStackFarmerRegistryNumber: string;
  LandRecordType: string;
  CustomerIdCIF: string;
  LinkedSavingAccountNumber: string;
  LoanAccountNumber: string;
  LoanAmountOrLimitSanctioned: string;
  FreshOrRestructured: string;
  DateOfDisbursementOrRestructure: string;
  LoanAmountDisbursedOrRestructured: string;
  LoanType: string;
  LoanTakenJointly: string;
  PurposeOfLoan: string;
  TenureOfLoanMonths: string;
  DueDateOfRepayment: string;
  OutstandingAmountAsOn30June2025: string;
  OverdueJune2025: string;
  OverduePrincipalAsOn30June2025: string;
  OverdueInterestAsOn30June2025: string;
  TotalOverdueAsOn30June2025: string;
  NPAJune2025: string;
  NPADateJune2025: string;
  PrincipalOnNPADateJune2025: string;
  InterestReceivableOnNPADateJune2025: string;
  NpaTotalAmountJune2025: string;
  PrincipalOn30June25OfNPA: string;
  InterestOn30June25OfNPA: string;
  NpaTotalAmountAsOn30June2025: string;
  OutstandingAmountAsOn30Sept2025: string;
  OverdueSept2025: string;
  OverduePrincipalAsOn30Sept2025: string;
  OverdueInterestAsOn30Sept2025: string;
  TotalOverdueAsOn30Sept2025: string;
  NPASept2025: string;
  NPADateSept2025: string;
  PrincipalOnNPADateSept2025: string;
  InterestReceivableOnNPADateSept2025: string;
  NpaTotalAmountSept2025: string;
  PrincipalOn30Sept25OfNPA: string;
  InterestOn30Sept25OfNPA: string;
  NpaTotalAmountAsOn30Sept2025: string;
}

const UploadFarmerData = () => {
    const bearerToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZGY3NTE0MC1mZmYzLTQ5MTYtOTJhZS1mM2U3OWFjNmFhZWQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImZkZjc1MTQwLWZmZjMtNDkxNi05MmFlLWYzZTc5YWM2YWFlZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcHJpbWFyeXNpZCI6IjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjVlYjVmODZjLTg2NjgtNDE2OS1iZTdmLTc3MmIyM2NiMDJmZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDkvMDkvaWRlbnRpdHkvY2xhaW1zL2FjdG9yIjoiRmFybWVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9ncm91cHNpZCI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcHJpbWFyeWdyb3Vwc2lkIjoiMCIsImp0aSI6IjY2MGIwODRjLTZlNzgtNGIxNC1hNDg4LWM2YWE5MzNjMTZlZSIsIm5iZiI6MTc2NTE5MzcwMSwiZXhwIjoxNzk2NzI5NzAxLCJpc3MiOiJGYXJtZXJVc2VyIiwiYXVkIjoiRmFybWVyVXNlciJ9.favz4N6-YpZSYQ4SS4tQkHe2hVTD1S9bqzThxyDYALU";
  
  const [fileToUpload, setFileToUpload] = useState<File | undefined>();
  const [randomStr, setRandomStr] = useState("");

  const [isLoading, setLoading] = useState(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
    }
  };



  const excelToJson = async (file: File) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData;
  };

  const uploadFile = async () => {

    debugger
  if (!fileToUpload) {
    toast.error("Please upload Aadhaar file");
    return;
  }

  try {
    const excelData: any = await excelToJson(fileToUpload);
    const dataWithoutHeader = excelData.filter((row: any) => row[0] !== "Bank Name");


    const aadharData: AadhaarData[] = dataWithoutHeader.map((row: any) => ({
      BankName: row[0],
      BankBranchIFSCCode: row[1],
      BranchName: row[2],
      PACsId: row[3],
      PACsMembershipId: row[4],
      AadharNumber: row[5],
      FarmerNameAsPerAadhar: row[6],
      GenderAsPerAadhar: row[7],
      Category: row[8],
      MobileNo: row[9],
      ResidentialAddressAsPerAadhar: row[10],
      District: row[11],
      Taluka: row[12],
      GramPanchayatNagarPalikaMahaNagarPalika: row[13],
      PinCode: row[14],
      AgriStackFarmerRegistryNumber: row[15],
      LandRecordType: row[16],
      CustomerIdCIF: row[17],
      LinkedSavingAccountNumber: row[18],
      LoanAccountNumber: row[19],
      LoanAmountOrLimitSanctioned: row[20],
      FreshOrRestructured: row[21],
      DateOfDisbursementOrRestructure: row[22],
      LoanAmountDisbursedOrRestructured: row[23],
      LoanType: row[24],
      LoanTakenJointly: row[25],
      PurposeOfLoan: row[26],
      TenureOfLoanMonths: row[27],
      DueDateOfRepayment: row[28],
      OutstandingAmountAsOn30June2025: row[29],
      OverdueJune2025: row[30],
      OverduePrincipalAsOn30June2025: row[31],
      OverdueInterestAsOn30June2025: row[32],
      TotalOverdueAsOn30June2025: row[33],
      NPAJune2025: row[34],
      NPADateJune2025: row[35],
      PrincipalOnNPADateJune2025: row[36],
      InterestReceivableOnNPADateJune2025: row[37],
      NpaTotalAmountJune2025: row[38],
      PrincipalOn30June25OfNPA: row[39],
      InterestOn30June25OfNPA: row[40],
      NpaTotalAmountAsOn30June2025: row[41],
      OutstandingAmountAsOn30Sept2025: row[42],
      OverdueSept2025: row[43],
      OverduePrincipalAsOn30Sept2025: row[44],
      OverdueInterestAsOn30Sept2025: row[45],
      TotalOverdueAsOn30Sept2025: row[46],
      NPASept2025: row[47],
      NPADateSept2025: row[48],
      PrincipalOnNPADateSept2025: row[49],
      InterestReceivableOnNPADateSept2025: row[50],
      NpaTotalAmountSept2025: row[51],
      PrincipalOn30Sept25OfNPA: row[52],
      InterestOn30Sept25OfNPA: row[53],
      NpaTotalAmountAsOn30Sept2025: row[54],
    }));

    setRandomStr(Math.random().toString());
    setFileToUpload(undefined);

    Swal.fire({
      title: "Existing And New Student Aadhaar",
      text: `Please confirm below details`,
      width: `60%`,
      html: renderToString(
<>
    {aadharData.length > 0 && (
      <div
        className="card mt-1"
        style={{ width: "100%", maxHeight: "300px", overflow: "auto"}}
      >
         <div style={{ width: "100%", overflowX: "auto" }}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Bank Name</th>
              <th>IFSC Code</th>
              <th>Branch Name</th>
              <th>PACs ID</th>
              <th>PACs Membership ID</th>
              <th>Aadhaar Number</th>
              <th>Farmer Name (Aadhaar)</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Mobile No</th>
              <th>Address</th>
              <th>District</th>
              <th>Taluka</th>
              <th>Gram Panchayat / Nagar Palika</th>
              <th>Pincode</th>
              <th>Farmer Registry No</th>
              <th>Land Record Type</th>
              <th>Customer ID (CIF)</th>
              <th>Saving A/C Number</th>
              <th>Loan A/C Number</th>
              <th>Loan Sanction Amount</th>
              <th>Fresh / Restructured</th>
              <th>Disbursement / Restructure Date</th>
              <th>Loan Amount Disbursed</th>
              <th>Loan Type</th>
              <th>Joint Loan?</th>
              <th>Loan Purpose</th>
              <th>Loan Tenure (Months)</th>
              <th>Due Date</th>

              {/* June 2025 Section */}
              <th>Outstanding (30 Jun 2025)</th>
              <th>Overdue (Jun 2025)</th>
              <th>Overdue Principal (Jun 2025)</th>
              <th>Overdue Interest (Jun 2025)</th>
              <th>Total Overdue (Jun 2025)</th>
              <th>NPA (Jun 2025)</th>
              <th>NPA Date (Jun 2025)</th>
              <th>Principal on NPA Date (Jun 2025)</th>
              <th>Interest on NPA Date (Jun 2025)</th>
              <th>Total NPA Amount (Jun 2025)</th>
              <th>Principal (30 Jun 2025)</th>
              <th>Interest (30 Jun 2025)</th>
              <th>Total NPA (30 Jun 2025)</th>

              {/* Sept 2025 Section */}
              <th>Outstanding (30 Sep 2025)</th>
              <th>Overdue (Sep 2025)</th>
              <th>Overdue Principal (Sep 2025)</th>
              <th>Overdue Interest (Sep 2025)</th>
              <th>Total Overdue (Sep 2025)</th>
              <th>NPA (Sep 2025)</th>
              <th>NPA Date (Sep 2025)</th>
              <th>Principal on NPA Date (Sep 2025)</th>
              <th>Interest on NPA Date (Sep 2025)</th>
              <th>Total NPA Amount (Sep 2025)</th>
              <th>Principal (30 Sep 2025)</th>
              <th>Interest (30 Sep 2025)</th>
              <th>Total NPA (30 Sep 2025)</th>
            </tr>
          </thead>

          <tbody>
            {aadharData.map((e: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.BankName}</td>
                <td>{e.BankBranchIFSCCode}</td>
                <td>{e.BranchName}</td>
                <td>{e.PACsId}</td>
                <td>{e.PACsMembershipId}</td>
                <td>{e.AadharNumber}</td>
                <td>{e.FarmerNameAsPerAadhar}</td>
                <td>{e.GenderAsPerAadhar}</td>
                <td>{e.Category}</td>
                <td>{e.MobileNo}</td>
                <td>{e.ResidentialAddressAsPerAadhar}</td>
                <td>{e.District}</td>
                <td>{e.Taluka}</td>
                <td>{e.GramPanchayatNagarPalikaMahaNagarPalika}</td>
                <td>{e.PinCode}</td>
                <td>{e.AgriStackFarmerRegistryNumber}</td>
                <td>{e.LandRecordType}</td>
                <td>{e.CustomerIdCIF}</td>
                <td>{e.LinkedSavingAccountNumber}</td>
                <td>{e.LoanAccountNumber}</td>
                <td>{e.LoanAmountOrLimitSanctioned}</td>
                <td>{e.FreshOrRestructured}</td>
                <td>{e.DateOfDisbursementOrRestructure}</td>
                <td>{e.LoanAmountDisbursedOrRestructured}</td>
                <td>{e.LoanType}</td>
                <td>{e.LoanTakenJointly}</td>
                <td>{e.PurposeOfLoan}</td>
                <td>{e.TenureOfLoanMonths}</td>
                <td>{e.DueDateOfRepayment}</td>

                {/* June */}
                <td>{e.OutstandingAmountAsOn30June2025}</td>
                <td>{e.OverdueJune2025}</td>
                <td>{e.OverduePrincipalAsOn30June2025}</td>
                <td>{e.OverdueInterestAsOn30June2025}</td>
                <td>{e.TotalOverdueAsOn30June2025}</td>
                <td>{e.NPAJune2025}</td>
                <td>{e.NPADateJune2025}</td>
                <td>{e.PrincipalOnNPADateJune2025}</td>
                <td>{e.InterestReceivableOnNPADateJune2025}</td>
                <td>{e.NpaTotalAmountJune2025}</td>
                <td>{e.PrincipalOn30June25OfNPA}</td>
                <td>{e.InterestOn30June25OfNPA}</td>
                <td>{e.NpaTotalAmountAsOn30June2025}</td>

                {/* Sept */}
                <td>{e.OutstandingAmountAsOn30Sept2025}</td>
                <td>{e.OverdueSept2025}</td>
                <td>{e.OverduePrincipalAsOn30Sept2025}</td>
                <td>{e.OverdueInterestAsOn30Sept2025}</td>
                <td>{e.TotalOverdueAsOn30Sept2025}</td>
                <td>{e.NPASept2025}</td>
                <td>{e.NPADateSept2025}</td>
                <td>{e.PrincipalOnNPADateSept2025}</td>
                <td>{e.InterestReceivableOnNPADateSept2025}</td>
                <td>{e.NpaTotalAmountSept2025}</td>
                <td>{e.PrincipalOn30Sept25OfNPA}</td>
                <td>{e.InterestOn30Sept25OfNPA}</td>
                <td>{e.NpaTotalAmountAsOn30Sept2025}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    )}
  </>
      ),
      input: "checkbox",
      inputPlaceholder: `
        I declare that I am submitting accurate and complete information.
        I confirm my responsibility to verify its accuracy.
      `,
      inputValidator: (result) => (!result ? "You need to agree with T&C" : null),
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      if (aadharData.length === 0) {
        toast.error("No Valid Aadhaar Data");
        return;
      }
      setLoading(true);
      try {
        const parsedData = aadharData.map((e: any) => ({
  BankName: e.BankName,
  BankBranchIFSCCode: e.BankBranchIFSCCode,
  BranchName: e.BranchName,
  PACsId: e.PACsId,
  PACsMembershipId: e.PACsMembershipId,
  AadharNumber: e.AadharNumber,
  FarmerNameAsPerAadhar: e.FarmerNameAsPerAadhar,
  GenderAsPerAadhar: e.GenderAsPerAadhar,
  Category: e.Category,
  MobileNo: e.MobileNo,
  ResidentialAddressAsPerAadhar: e.ResidentialAddressAsPerAadhar,
  District: e.District,
  Taluka: e.Taluka,
  GramPanchayatNagarPalikaMahaNagarPalika: e.GramPanchayatNagarPalikaMahaNagarPalika,
  PinCode: e.PinCode,
  AgriStackFarmerRegistryNumber: e.AgriStackFarmerRegistryNumber,
  LandRecordType: e.LandRecordType,
  CustomerIdCIF: e.CustomerIdCIF,
  LinkedSavingAccountNumber: e.LinkedSavingAccountNumber,
  LoanAccountNumber: e.LoanAccountNumber,
  LoanAmountOrLimitSanctioned: e.LoanAmountOrLimitSanctioned,
  FreshOrRestructured: e.FreshOrRestructured,
  DateOfDisbursementOrRestructure: e.DateOfDisbursementOrRestructure,
  LoanAmountDisbursedOrRestructured: e.LoanAmountDisbursedOrRestructured,
  LoanType: e.LoanType,
  LoanTakenJointly: e.LoanTakenJointly,
  PurposeOfLoan: e.PurposeOfLoan,
  TenureOfLoanMonths: e.TenureOfLoanMonths,
  DueDateOfRepayment: e.DueDateOfRepayment,

  // June 2025
  OutstandingAmountAsOn30June2025: e.OutstandingAmountAsOn30June2025,
  OverdueJune2025: e.OverdueJune2025,
  OverduePrincipalAsOn30June2025: e.OverduePrincipalAsOn30June2025,
  OverdueInterestAsOn30June2025: e.OverdueInterestAsOn30June2025,
  TotalOverdueAsOn30June2025: e.TotalOverdueAsOn30June2025,
  NPAJune2025: e.NPAJune2025,
  NPADateJune2025: e.NPADateJune2025,
  PrincipalOnNPADateJune2025: e.PrincipalOnNPADateJune2025,
  InterestReceivableOnNPADateJune2025: e.InterestReceivableOnNPADateJune2025,
  NpaTotalAmountJune2025: e.NpaTotalAmountJune2025,
  PrincipalOn30June25OfNPA: e.PrincipalOn30June25OfNPA,
  InterestOn30June25OfNPA: e.InterestOn30June25OfNPA,
  NpaTotalAmountAsOn30June2025: e.NpaTotalAmountAsOn30June2025,

  // Sept 2025
  OutstandingAmountAsOn30Sept2025: e.OutstandingAmountAsOn30Sept2025,
  OverdueSept2025: e.OverdueSept2025,
  OverduePrincipalAsOn30Sept2025: e.OverduePrincipalAsOn30Sept2025,
  OverdueInterestAsOn30Sept2025: e.OverdueInterestAsOn30Sept2025,
  TotalOverdueAsOn30Sept2025: e.TotalOverdueAsOn30Sept2025,
  NPASept2025: e.NPASept2025,
  NPADateSept2025: e.NPADateSept2025,
  PrincipalOnNPADateSept2025: e.PrincipalOnNPADateSept2025,
  InterestReceivableOnNPADateSept2025: e.InterestReceivableOnNPADateSept2025,
  NpaTotalAmountSept2025: e.NpaTotalAmountSept2025,
  PrincipalOn30Sept25OfNPA: e.PrincipalOn30Sept25OfNPA,
  InterestOn30Sept25OfNPA: e.InterestOn30Sept25OfNPA,
  NpaTotalAmountAsOn30Sept2025: e.NpaTotalAmountAsOn30Sept2025,

  // Additional fields you used earlier
  EncryptedAadhar: "",
  Message: "",
}));

        // 1️⃣ First API call
        await postOfflineExistingApplicant("", parsedData, bearerToken);
        // 2️⃣ Upload File
      } catch (error) {
        setLoading(false);
        toast.error("File could not be uploaded. Try again.");
      }
    });
  } catch (error) {
    toast.error("Error processing Aadhaar file. Try again.");
  }
};

    

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload Excel</button>
    </div>
  );
};

export default UploadFarmerData;
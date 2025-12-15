import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { renderToString } from "react-dom/server";
import { postOfflineExistingApplicant } from "../Services/OfflineApplicantDL";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { apiCall, buildQueryParams } from "../Services/api";
import { getFormerUploadedBankData } from "../Services/apiEndPoint";


const FormerUploadedBankData = () => {
  //const bearerToken = useAppSelector((state) => state.authenticate.token);
  //const { t } = useTranslation("App.Application");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any>({});
  const [file64View, setFile64View] = useState("");
  const [file64ViewName, setFile64ViewName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPreviewProfile();
  }, []);

  const getPreviewProfile = async () => {
    setIsLoading(true);
    try {
      const params = {
        UserID: "1"
      };
      const query = buildQueryParams(params);
      const response = await apiCall<any>(`${getFormerUploadedBankData}?${query}`, "", "GET");
      if (response.status === 200) {
        debugger
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
  };

  const renderInput = (input: any, formName: string) => {
    debugger
    if (!Array.isArray(input) || input.length === 0) return null;

    if (typeof input[0] === "object") {
      return (
        <div className="table-responsive">
          <table className="table table-bordered mt-2 mb-0">
            <thead>
              <tr>
                {(() => {
                  let cols = Object.keys(input[0]).filter((k) => k !== "ChildQuestions");
                  if (formName === "A") {
                    cols = cols.sort((a, b) => {
                      const isDoc = (x: string) =>
                        ["documentid", "s3bucketid"].includes(x.toLowerCase());
                      if (isDoc(a) && !isDoc(b)) return 1;
                      if (!isDoc(a) && isDoc(b)) return -1;
                      return 0;
                    });
                  }
                  return cols.map((col) => {
                    const isUploadedDocs = ["documentid", "s3bucketid"].includes(col.toLowerCase());
                    return (
                      <th key={col} style={isUploadedDocs ? { width: "155px" } : {}}>
                        {isUploadedDocs ? "Uploaded Documents" : col}
                      </th>
                    );
                  });
                })()}
              </tr>
            </thead>
            <tbody>
              {input.map((row: any, i: number) => {
                let childQuestions: { Key: string; Value: any }[] = [];
                if (formName === "A" || formName === "Prapatra 4") {
                  try {
                    childQuestions = row.ChildQuestions ? JSON.parse(row.ChildQuestions) : [];
                    childQuestions = childQuestions.filter(
                      (cq) => cq.Key !== null && cq.Value !== null
                    );
                  } catch {
                    childQuestions = [];
                  }
                }
                // ✅ Correct grouping of multiple child rows
                let childRows: any[] = [];
                if ((formName === "A" || formName === "Prapatra 4") && Array.isArray(childQuestions) && childQuestions.length > 0) {
                  const grouped: any[] = [];
                  let temp: any = {};
                  for (const cq of childQuestions) {
                    if (temp[cq.Key] !== undefined) {
                      grouped.push(temp);
                      temp = {};
                    }
                    temp[cq.Key] = cq.Value;
                  }
                  if (Object.keys(temp).length > 0) grouped.push(temp);
                  childRows = grouped;
                }
                // Collect headers dynamically from grouped children
                const childHeaders = Array.from(
                  new Set(childRows.flatMap((cr) => Object.keys(cr)))
                );
                let cols = Object.keys(row).filter((k) => k !== "ChildQuestions");
                if (formName === "A" || formName === "Prapatra 4") {
                  cols = cols.sort((a, b) => {
                    const isDoc = (x: string) =>
                      ["documentid", "s3bucketid"].includes(x.toLowerCase());
                    if (isDoc(a) && !isDoc(b)) return 1;
                    if (!isDoc(a) && isDoc(b)) return -1;
                    return 0;
                  });
                }

                return (
                  <>
                    {/* Parent Row */}
                    <tr key={`row-${i}`}>
                      {cols.map((col) => (
                        <td key={col}>
                          {["documentid", "s3bucketid", "upload protective wall file", "upload rent agreement & satbara document", "doctor appointment letter"].includes(col.toLowerCase()) ? (
                            (row["Answer"] === "Yes" && row[col] && row[col] !== "null" && childRows.length === 0) || (["doctor appointment letter"].includes(col.toLowerCase()) && row[col] !== "")
                              || ["upload protective wall file", "upload rent agreement & satbara document"].includes(col.toLowerCase()) ? (
                              <button
                                className="btn btn-primary btn-sm"

                              >
                                View Document
                              </button>
                            ) : (
                              "-"
                            )
                          ) : (
                            row[col] || "-"
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Child Rows */}
                    {formName === "A" && childRows.length > 0 && (
                      <tr key={`child-${i}`}>
                        <td colSpan={cols.length} style={{ padding: "0px" }}>
                          <div className="p-3" style={{ backgroundColor: "#ecf3ff" }}>
                            <div className="table-responsive">
                              <table className="table table-bordered table-sm mb-0" style={{ width: "80%" }}>
                                <thead>
                                  <tr>
                                    {(() => {
                                      let cHeaders = [...childHeaders];
                                      cHeaders = cHeaders.sort((a, b) => {
                                        const isDoc = (x: string) =>
                                          ["documentid", "s3bucketid"].includes(x.toLowerCase());
                                        if (isDoc(a) && !isDoc(b)) return 1;
                                        if (!isDoc(a) && isDoc(b)) return -1;
                                        return 0;
                                      });
                                      return cHeaders.map((h) => {
                                        const displayText = ["documentid", "s3bucketid"].includes(h.toLowerCase()) ? "Uploaded Documents" : h;

                                        return (
                                          <th
                                            key={h}
                                            style={displayText === "Uploaded Documents" ? { width: "150px" } : undefined}
                                          >
                                            {displayText}
                                          </th>
                                        );
                                      });

                                    })()}
                                  </tr>
                                </thead>
                                <tbody>
                                  {childRows.map((cr, ci) => {
                                    let cHeaders = [...childHeaders];
                                    cHeaders = cHeaders.sort((a, b) => {
                                      const isDoc = (x: string) =>
                                        ["documentid", "s3bucketid"].includes(x.toLowerCase());
                                      if (isDoc(a) && !isDoc(b)) return 1;
                                      if (!isDoc(a) && isDoc(b)) return -1;
                                      return 0;
                                    });
                                    return (
                                      <tr key={ci}>
                                        {cHeaders.map((h) => (
                                          <td key={h}>
                                            {["documentid", "s3bucketid"].includes(h.toLowerCase()) && cr[h] ? (
                                              <button
                                                className="btn btn-primary btn-sm"

                                              >
                                                View Document
                                              </button>
                                            ) : (
                                              cr[h] || "-"
                                            )}
                                          </td>
                                        ))}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  const formatSectionTitle = (section: string) => {
    return section.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="application-preview form">
      <h5 className="mb-3">Preview Form</h5>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          {renderInput(previewData, "Test")}

        </>
      )
      }
    </div>
  );
};

export default FormerUploadedBankData;
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { globalURL } from "./globalEnv";

export async function postOfflineApplicant(courseType: string, aadharNo: any, bearerToken: string): Promise<string> {
  const initValues = {
    aadhaarData: aadharNo,
    courseType: courseType,
  };
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `${globalURL}v_hostel-service/api/OfflineRegistration`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
    data: initValues
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error fetching search application:', error);
    return JSON.stringify(error);
  }
}

export async function getOfflineApplicantAadharList(hostelID: string, courseType: string, bearerToken: string, test: any) {
  let config = {
    method: 'get',
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/${hostelID}`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }
}

export async function postOfflineExistingApplicant(filePath: string, aadharNo: any, bearerToken: string): Promise<string> {
  const initValues = {
    aadhaarData: aadharNo,
    FilePath: filePath,
  };
  debugger;
  console.log(initValues);
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `${globalURL}farmer-service/api/FarmerUpload/ExistingAadharData`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
    data: initValues
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error fetching search application:', error);
    return JSON.stringify(error);
  }
}

export async function getOfflineExistingList(model: any, bearerToken: string): Promise<string> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/ExistingAadharDataList`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    data: model,
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error fetching search application:", error);
    return JSON.stringify(error);
  }
}

export async function getOfflineNewList(model: any, bearerToken: string): Promise<string> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/NewAadharDataList`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    data: model,
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error fetching search application:", error);
    return JSON.stringify(error);
  }
}

export async function postExistingApplicantNewAcademicYear(filePath: string, aadharNo: any, bearerToken: string): Promise<string> {
  const initValues = {
    aadhaarData: aadharNo,
    FilePath: filePath,
  };
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/ExistingAadharDataNewAcademicYear`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
    data: initValues
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error fetching search application:', error);
    return JSON.stringify(error);
  }
}

export async function getOfflineExistingNewAcademicYearList(model: any, bearerToken: string): Promise<string> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/ExistingAadharDataNewAcademicYearList`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    data: model,
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error fetching search application:", error);
    return JSON.stringify(error);
  }
}

export async function getHostelList(districtId: string, bearerToken: string): Promise<string> {
  let paramURL = `${globalURL}v_hostel-service/api/Allotment/hostel-list-distict-wise-delete-sjsa-aadhaar?DistrictId=${districtId}`;

  let config = {
    method: "get",
    url: paramURL,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    return JSON.stringify(error);
  }
}

export async function postDeleteOfflineExistingApplicant(HostelId: any, bearerToken: string): Promise<string> {
  const initValues = {
    HostelId: HostelId,
  };
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/DeleteExistingAadharData`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
    data: initValues
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error fetching search application:', error);
    return JSON.stringify(error);
  }
}

export async function getDeletedExistingAadharDataList(model: any, bearerToken: string): Promise<string> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/DeletedExistingAadharDataList`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    data: model,
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error fetching search application:", error);
    return JSON.stringify(error);
  }
}

export async function deleteOfflineExistingId(Id: any, hostelID: any, bearerToken: string): Promise<string> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${globalURL}v_hostel-service/api/OfflineRegistration/DeletedExistingAadharId?Id=${Id}&HostelId=${hostelID}`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    }
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error delete aadhar aapplication:", error);
    return JSON.stringify(error);
  }
}

export async function DownloadIFSCCode(bearerToken: string): Promise<string> {
  debugger;
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `${globalURL}fv_farmer-service/api/IFSCCode/downloadIFSCCode`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    }
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error fetching search application:', error);
    return JSON.stringify(error);
  }
}
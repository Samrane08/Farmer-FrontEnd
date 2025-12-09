import axios from "axios";
import { globalURL } from "./globalEnv";
//import { globalURL_sh } from "./globalEnv";

export async function getDistrictList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/district?state=27&lang=${lang}`,
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
};

export async function getTalukaList(lang: string, districtId: string, bearerToken: string): Promise<string> {

  if (districtId === "" || districtId === undefined) {
    return '[{}]'
  }
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Taluka?distid=${districtId}&lang=${lang}`,
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

};

export async function getVillageList(lang: String, talukaId: string, bearerToken: string): Promise<string> {

  if (talukaId === "" || talukaId === undefined) {
    return '[{}]'
  }

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Villege?taluka=${talukaId}&lang=${lang}`,
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
};

export async function getTypesOfCourseListWithparam(bearerToken: string, SwadharOrHostel: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/CourseType?IsSwadharorHostel=${SwadharOrHostel}`,
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
};

export async function getHostelList(districtId: string, talukaId: string, bearerToken: string): Promise<string> {

  let paramURL = `${globalURL}applicant-service/api/Profile/hostel-genderwise?dist=${districtId}`;

  if (talukaId !== "") {
    paramURL = `${paramURL}&taluka=${talukaId}`
  }

  let config = {
    method: 'get',
    url: paramURL,
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
};

export async function getCasteCategoryList(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/CasteCategory`,
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

};

export async function getGenderList(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/gender`,
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
};
export async function getCasteList(casteCategory: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/caste?castecategoryId=${casteCategory}`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
    data: {
      casteCategory: casteCategory
    }

  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }
};

export async function getMaritalStatusList(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/MarritalStatus`,
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
};

export async function getIssuingAuthorityList(bearerToken: string, drpType: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/IssuingAuthority?drpType=${drpType}`,
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
};

export async function getAppMenu(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_user-service/api/menu`,
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
};


export async function encryptString(plainText: string): Promise<string> {
  const password = "MahaAlgorithm";

  // Create sha256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Key must be 32 bytes for AES-256
  const aesKey = new Uint8Array(hashBuffer).slice(0, 32);

  // IV (initialization vector)
  const iv = new Uint8Array([0x49, 0x76, 0x61, 0x6e, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]);

  // Import the AES key
  const key = await crypto.subtle.importKey(
    'raw',
    aesKey,
    { name: 'AES-CBC', length: 256 },
    false,
    ['encrypt']
  );

  // Encrypt the plaintext
  const plainBytes = encoder.encode(plainText);
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: iv },
    key,
    plainBytes
  );

  // Convert the encrypted bytes to a base64 encoded string
  const cipherArray = new Uint8Array(cipherBuffer);
  const cipherText = btoa(String.fromCharCode(...cipherArray));

  return cipherText;
}

export async function getStateList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/state?lang=${lang}`,
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
};

//start shailesh
export async function getStandardList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Standards`,
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
};
export async function getCategoryList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Category`,
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
};
export async function getStdGenderList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/GenderList`,
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
};
export async function getRelationshipList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Relationships`,
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
};
export async function getLast12YearList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/GetLast12YearsList`,
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
};
export async function getAcadmicYearList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/AcademicYear`,
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
};

export async function getStuCasteList(lang: string,bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Caste?langId=${lang}`,
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

};
export async function getStuSubCasteList(lang: string, casteId: number, bearerToken: string): Promise<string> {
 if (!casteId) {
    return JSON.stringify({ status: 400, data: [] });
  }
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/SubCaste?castCatId=${casteId}&lang=${lang}`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
try {
    const response = await axios.request(config);
    return JSON.stringify({
      status: response.status,
      data: response.data
    });
  } catch (error: any) {
    return JSON.stringify({
      status: error.response?.status || 500,
      message: error.message
    });
  }
  // try {
  //   const response = await axios.request(config);
  //   return JSON.stringify(response);
  // }
  // catch (error) {
  //   return JSON.stringify(error);
  // }
};
export async function getStuDistrictList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/District?lang=1`,
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
};

export async function getStuTalukaList(lang: string, districtId: string, bearerToken: string): Promise<string> {

  if (districtId === "" || districtId === undefined) {
    return '[{}]'
  }
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Taluka?distid=${districtId}&lang=${lang}`,
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

};
export async function getStuVillageList(lang: String, talukaId: string, bearerToken: string): Promise<string> {

  if (talukaId === "" || talukaId === undefined) {
    return '[{}]'
  }

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Villege?taluka=${talukaId}&lang=${lang}`,
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
};

export async function getSchoolBodyRoleList(lang: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/SchoolBodyRoles`,
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
};
//end shailesh


export async function getAdmissiontype(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}admissiontype`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
  };

  try {
    const response = await axios.request(config);

    return JSON.stringify(response.data);
  }
  catch (error) {
    return JSON.stringify(error);
  }
};
export async function getAdmissionyear(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/AdmissionYear`,
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
};
export async function geteducationMode(bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/EducationMode`,
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
};

export async function getDistrictListByStateId(lang: string, stateId: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/district?state=${stateId}&lang=${lang}`,
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
};

export async function getStream(intID: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Stream?intID=${intID}`,
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
};
export async function getCollegeOrScholl(stream: string, qualificationType: string, districtid: string, LangId: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/CollegeOrSchool?stream=${stream}&qualificationType=${qualificationType}&districtid=${districtid}&LangId=${LangId}`,
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
};

export async function getCollegeOrSchollForCurrent(stream: string, qualificationType: string, districtid: string, LangId: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/CollegeOrSchoolCurrent?stream=${stream}&qualificationType=${qualificationType}&districtid=${districtid}&LangId=${LangId}`,
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
};
export async function getCourseList(collegeId: string, streamId: string, qualificationtypeId: string, langId: string, bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Course?cold=${collegeId}&strmId=${streamId}&quaId=${qualificationtypeId}&langId=${langId}`,
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
};
export async function getAdmissionType(bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/admissiontype`,
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
};
export async function getCourseYear(courseId: string, langId: string, bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}applicant-service/api/CurrentCourse/GetCurrentQualificationYear?courseId=${courseId}&langID=${langId}`,
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
};

export async function getCourseResult(caller: string, bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/CourseResult?caller=${caller}`,
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
};
export async function getCourseStatus(bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/CourseStatus`,
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
};
export async function getuniversity(colId: string, courseId: string, qualificationLvl: string, langId: string, bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/university?courseId=${courseId}&colId=${colId}&qualificationLvl=${qualificationLvl}&LangId=${langId}`,
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
};

export async function getProfileImage(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}applicant-service/api/Profile/profile-image`,
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
};

export async function getProfileCompletedStatus(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}applicant-service/api/ProgressStatus`,
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
};

export async function getApplicantPaymentStatus(bearerToken: string): Promise<string> {
  let config = {
    method: 'get',
    url: `${globalURL}applicant-service/api/Application/payment-status`,
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
};

export async function getAccountLogin(username: string, password: string): Promise<string> {
  let model = {
    UserName: username,
    Password: password
  }
  let config = {
    method: 'post',
    url: `${globalURL}fv_user-service/api/Account/farmer-login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: model
  };
  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }
};

export async function getAccountLogOut(bearerToken: string): Promise<boolean> {
  let config = {
    method: 'post',
    url: `${globalURL}fv_user-service/api/Account/logout`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
  try {
    const response = await axios.request(config);
    return true;
  }
  catch (error) {
    return false;
  }
};

export async function getDashboard(bearerToken: string): Promise<boolean> {
  let config = {
    method: 'get',
    url: `${globalURL}applicant-service/api/Dashboard`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
  };

  try {
    const response = await axios.request(config);
    return true;
  }
  catch (error) {
    return false;
  }
};

export function generateRandomString(length: any) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function AcademicYear(bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/AcademicYear`,
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
};


export async function getaffiliationList(bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/Affiliations`,
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
};


export async function getschooltypeList(bearerToken: string): Promise<string> {

  let config = {
    method: 'get',
    url: `${globalURL}fv_master-service/api/schooltype`,
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
};
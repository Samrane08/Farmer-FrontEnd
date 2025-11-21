import axios from "axios";
import { globalURL } from "./globalEnv";


export async function sendOTP(aadharPlainText : string, bearerToken : string) {
  if( aadharPlainText === "") return;
   
   var apiUrl = "";
    apiUrl = `${globalURL}nm_aadhaar-service/api/SendOTP`;
  let config = {
    method: 'post',
    url: apiUrl,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    data : JSON.stringify(aadharPlainText)
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }

  
};

export async function validateOTP(otp : string, aadhar : string, otpTransaction : string, bearerToken: string){

  if( otp === "") return;
  var apiUrl = "";

   if(bearerToken !== ""){
    apiUrl = `${globalURL}nm_aadhaar-service/api/VerifyOTP/verify-otp`;
   }else{
    apiUrl = `${globalURL}nm_aadhaar-service/api/VerifyOTP/forgot-username-verify-otp`;
   }

  let requestObj = {
    "AadhaarNumber":aadhar,
    "OTP": otp,
    "OTPTxn": otpTransaction
  }

  let config = {
    method: 'post',
    url: apiUrl,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    data : JSON.stringify(requestObj)
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }
}

export async function validateTeacherStudentOTP(otp : string, aadhar : string, otpTransaction : string, Caller: any, bearerToken: string){

  if( otp === "") return;
  var apiUrl = `${globalURL}nm_aadhaar-service/api/VerifyOTP/verify-teacher-otp`;

  let requestObj = {
    "AadhaarNumber":aadhar,
    "OTP": otp,
    "OTPTxn": otpTransaction,
    "Caller": Caller
  }
  //Caller Teacher 0 and Student 1

  let config = {
    method: 'post',
    url: apiUrl,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    data : JSON.stringify(requestObj)
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }
}

export async function loginAuthenticate(strParam : string){
  if (strParam === "") return;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${globalURL}nm_user-service/api/Account/auth`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(strParam)
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return JSON.stringify(error);
  }
}

export async function verifyToken(strToken : string){
  if(strToken === "") return;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${globalURL}nm_user-service/api/Account/check-verified-status`,
    headers: { 
      'Authorization': `Bearer ${strToken}`
    }
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response);
  }
  catch (error) {
    return  JSON.stringify(error);
  }
}
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import { encryptString, generateRandomString, getAccountLogin } from "../Services/commonDL";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { FaUser, FaEye } from "react-icons/fa";

import { useAuth } from "../AuthContext";
import { useAppDispatch } from "../store/hook";
import { setToken } from "../store/features/authenticationSlice";
import mahaitlogo from "../Images/Maha_IT_LogoB.png";

import emblemLogo from "../Images/emblemLogo.png";
import sg from "../Images/maharashtralogo.png";

const portalLoginSchema = Yup.object().shape({
  UserName: Yup.string().required("Username is required"),
  Password: Yup.string().required("Password is required"),
});

const LoginWaiver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const [captchaText, setCaptchaText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
    },
    validationSchema: portalLoginSchema,
    onSubmit: async (values) => {
      if (!validateCaptcha(captchaText)) {
        toast("Invalid Captcha", { type: "error" });
        setCaptchaText("");
        return;
      }

      setLoading(true);

      try {
        const prefix = generateRandomString(5);
        const suffix = generateRandomString(5);

        const encryptedPassword = await encryptString(prefix + values.Password + suffix);
        const resp = await getAccountLogin(values.UserName, encryptedPassword, "waiver");
        const responseObj = JSON.parse(resp ?? "{}");

        if (responseObj.status === 200 && responseObj?.data?.token) {
          const token = responseObj.data.token;

          // Store token in AuthContext
          login(token);

          // Optionally store token in Redux slice
          dispatch(setToken(token));

          toast("Login Successful", { type: "success" });

          // Redirect to previous page or default dashboard
          const from = (location.state as any)?.from || "/Dashboard";
          navigate(from, { replace: true });
        } else {
          toast(responseObj?.data?.Message || "Invalid Login", { type: "error" });
          loadCaptchaEnginge(6);
          setCaptchaText("");
        }
      } catch (error) {
        toast("Something went wrong!", { type: "error" });
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    loadCaptchaEnginge(6);
    localStorage.clear();
  }, []);

  return (
    <div className="bg">
    
      <div className="loginmob">
        
   <div className="d-flex justify-content-center align-items-center ps-2 pt-3 position-relative">
         <div style={{position: "absolute", left: "10px"}}>
          <a href="https://www.india.gov.in/" target="_blank" >
             <img
                  src={emblemLogo}
                  alt=""
                  className="enb"
                  style={{ width: "40px" }}
                />
          </a>
           
                  <a href="https://www.maharashtra.gov.in" target="_blank" >
                <img
                  src={sg}
                  alt=""
                  className="sg ms-lg-1"
                  style={{ width: "65px" }}
                />
                </a>
         </div>
               <div>
                 <h1 className="text-center m-0 pt-4 heading">
          शेतकरी कर्ज संकट निवारण योजना
        </h1>
            <h3 className="text-center m-0 heading m-0 p-0">  महाराष्ट्र शासन</h3>
               </div>
        </div>
        <div className="auth-box mt-5">
          <h2 className="my-4 mt-0">Login for Waiver Schemes</h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="form-group mb-3 position-relative">
              <FaUser className="icon" />
              <input
                type="text"
                name="UserName"
                className="form-control"
                placeholder="User Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.UserName}
              />
              {formik.touched.UserName && formik.errors.UserName && (
                <small className="text-danger">{formik.errors.UserName}</small>
              )}
            </div>

            {/* Password */}
            <div className="form-group mb-3 position-relative">
              <FaEye
                className="icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                className="form-control"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
              />
              {formik.touched.Password && formik.errors.Password && (
                <small className="text-danger">{formik.errors.Password}</small>
              )}
            </div>

            {/* Captcha */}
            <div className="d-flex justify-content-between my-3 captchatxtwrapp">
              <LoadCanvasTemplate />
              <input
                type="text"
                value={captchaText}
                onChange={(e) => setCaptchaText(e.target.value)}
                maxLength={6}
                className="form-control captchatxt"
              />
            </div>

            {/* Submit */}
            <button
              className="btn btn-primary w-100 rounded-5 mt-3 d-flex justify-content-center align-items-center"
              type="submit"
              disabled={loading}
            >
              Login {loading && <Spinner size="sm" />}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center copyrightlogin">
         Copyright © 2025. Design and Developed By MAHAIT.
        <a href="https://mahait.org/" target="_blank" rel="noopener noreferrer">
          <img src={mahaitlogo} alt="MAHAIT Logo" className="mahaitlogo" />
        </a>
      </div>
    </div>
  );
};

export default LoginWaiver;

/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import logo from '../Images/TenantClearanceLogo.png';
import { users } from '../users';
import mahaitlogo from '../../src/Images/Maha_IT_LogoB.png';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch } from "../store/hook";
import { toast, ToastContainer } from "react-toastify";
import { encryptString, generateRandomString } from "../Services/commonDL";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { Spinner } from "react-bootstrap";
import { getAccountLogin } from "../Services/commonDL";
import { useTranslation } from "react-i18next";
import { FaFilePdf, FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { setToken } from "../store/features/authenticationSlice";
import { verifyToken } from "../Services/aadharauthenticateDL";
const portalLoginSchema = Yup.object().shape({
  UserName: Yup.string().required("Username is required")
    .min(5, "UserName must be at least 3 characters")
    .max(15, "UserName cannot be longer than 15 characters"),
  Password: Yup.string().required("Password is required")
    .min(5, "Password must be at least 3 characters")
    .max(15, "Password cannot be longer than 15 characters"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("App.Appliacation");
  const [captchaText, setCaptchaText] = useState("");
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledbanner, setIsToggledbanner] = useState(false);
  const [isToggledlang, setIsToggledlang] = useState(false);
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
    },
    validationSchema: portalLoginSchema,
    onSubmit: (values) => {
      if (validateCaptcha(captchaText) === true) {
        setloading(true);
        let encryptedPassword = "";
        let prefix = generateRandomString(5);
        let suffix = generateRandomString(5);
        encryptString(prefix + values.Password + suffix).then((password) => {
          encryptedPassword = password;
          getAccountLogin(values.UserName, encryptedPassword).then((resp) => {
            let responseObj = JSON.parse(resp != undefined ? resp : "{}");
            if (responseObj.status === 200) {
              if (responseObj.data.Token !== undefined && responseObj.data.Token !== "") {
                setloading(false);
                callVerifyToken(responseObj.data.Token, responseObj.data.roleName);
              } else {
                setloading(false);
                loadCaptcha();
                setCaptchaText("");
                toast(responseObj.data.Message, {
                  type: "error",
                  autoClose: 2000,
                });
              }
            } else {
              setloading(false);
              loadCaptcha();
              setCaptchaText("");
              toast(responseObj?.data?.Message, {
                type: "error",
                autoClose: 2000,
              });
            }
            setloading(false);
          });
        });
      } else {
        setloading(false);
        if (captchaText === "") {
          toast("Please Enter Captcha", { type: "error", autoClose: 2000 });
        } else {
          toast("Captcha Does Not Match", { type: "error", autoClose: 2000 });
          setCaptchaText("");
        }
        return;
      }
    },
  });

  const handleshowpassword = (e: any) => {
    const passwordInput = document.getElementById("Password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordInput && eyeIcon) {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      if (type === "password") {
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      } else {
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      }
    }
  };

  const handleCaptchaChangeText = (e: any) => {
    setCaptchaText(e.target.value);
  };

  const loadCaptcha = () => {
    loadCaptchaEnginge(6, "transparent", "#333333");
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  useEffect(() => {
    localStorage.clear();
    window.addEventListener("resize", handleResize);
    setIsToggledbanner(true);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsToggledbanner(false);
    } else {
      setIsToggledbanner(true);
    }
  };

  const callVerifyToken = (strToken: string, role: string) => {
    setloading(true);
    verifyToken(strToken).then((resp) => {
      let responseObj = JSON.parse(resp != undefined ? resp : "{}");
      if (responseObj.data !== undefined) {
        dispatch(setToken(strToken));

        setloading(false);
        if (responseObj.data.IsAadharVerified === false) {
          navigate("/authaadhar", { replace: true });
          return;
        }
       
      } else {
        setloading(false);
      }
    });
  };

  const [readOnly, setReadOnly] = useState(true);
  const handleFocus = () => {
    setReadOnly(false);
  };

 return (
  <>
    <div className="bg">
      <div className="loginmob">
        <h1 className="text-center m-0 pt-4 heading">
          महाराष्ट्र राज्य शेतकरी सहाय्य योजना
        </h1>

        <div className="auth-box mt-5">
          {/* <span className="mb-4 d-flex">
            <img src={logo} alt="Police Logo" className="img-fluid login-logo logo" />
          </span> */}

          <h2 className="my-4 mt-0">Login</h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="form-group mb-4">
              <div className="mb-3">
                <FaUser className="icon" />
                <input
                  type="text"
                  name="UserName"
                  id="UserName"
                  className="form-control"
                  placeholder="User Name"
                  onChange={formik.handleChange}
                  autoComplete="off"
                  readOnly={readOnly}
                  onFocus={handleFocus}
                />
                {formik.errors.UserName && formik.touched.UserName && (
                  <div className="text-danger text-start">
                    {formik.errors.UserName}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <FaEye
                className="icon"
                onClick={handleshowpassword}
                id="eyeIcon"
                style={{ cursor: "pointer" }}
              />
              <input
                type="password"
                name="Password"
                id="Password"
                className="form-control"
                placeholder="Password"
                onChange={formik.handleChange}
                autoComplete="off"
              />
              {formik.errors.Password && formik.touched.Password && (
                <div className="text-danger text-start">
                  {formik.errors.Password}
                </div>
              )}
            </div>

            {/* Captcha */}
            <div className="d-flex justify-content-between my-3 captchatxtwrapp">
              <LoadCanvasTemplate />
              <input
                type="text"
                value={captchaText}
                onChange={handleCaptchaChangeText}
                maxLength={6}
                className="form-control captchatxt"
              />
            </div>

            {/* Remember & Forgot Password */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-check m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberPassword"
                />
                <label className="form-check-label" htmlFor="rememberPassword">
                  Remember
                </label>
              </div>

              <a
                href="forgot-password.html"
                className="text-primary text-decoration-underline"
              >
                Lost password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button
                className="btn btn-primary w-100 rounded-5 mt-2 d-flex justify-content-center align-items-center"
                type="submit"
                disabled={loading}
              >
                Login {loading ? <Spinner /> : null}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center copyrightlogin px-3">
        Copyright © 2025. Design and Developed By MAHAIT.
        <a
          href="https://mahait.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={mahaitlogo}
            alt="MAHAIT Logo"
            className="mahaitlogo"
          />
        </a>
      </div>
    </div>
  </>
);

};

export default Login;

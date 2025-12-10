/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import {
  encryptString,
  generateRandomString,
  getAccountLogin,
} from "../Services/commonDL";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { FaUser, FaEye } from "react-icons/fa";
import { useAppDispatch } from "../store/hook";
import { setToken } from "../store/features/authenticationSlice";
import mahaitlogo from "../Images/Maha_IT_LogoB.png";

const portalLoginSchema = Yup.object().shape({
  UserName: Yup.string().required("Username is required"),
  Password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

        const encryptedPassword = await encryptString(
          prefix + values.Password + suffix
        );

        const resp = await getAccountLogin(values.UserName, encryptedPassword);
        const responseObj = JSON.parse(resp ?? "{}");

        if (responseObj.status === 200 && responseObj?.data?.token) {
          // Store token & user details
          dispatch(setToken(responseObj.data));

          toast("Login Successful", { type: "success" });
          navigate("/Dashboard");
        } else {
          toast(responseObj?.data?.Message || "Invalid Login", {
            type: "error",
          });
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
    <>
      <div className="bg">
        <div className="loginmob">
          <h1 className="text-center m-0 pt-4 heading">
            महाराष्ट्र राज्य शेतकरी सहाय्य योजना
          </h1>

          <div className="auth-box mt-5">
            <h2 className="my-4 mt-0">Login</h2>

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
                />
                {formik.errors.UserName && formik.touched.UserName && (
                  <small className="text-danger">
                    {formik.errors.UserName}
                  </small>
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
                />
                {formik.errors.Password && formik.touched.Password && (
                  <small className="text-danger">
                    {formik.errors.Password}
                  </small>
                )}
              </div>

              {/* Captcha */}
              <div className="d-flex justify-content-between my-3">
                <LoadCanvasTemplate />
                <input
                  type="text"
                  value={captchaText}
                  onChange={(e) => setCaptchaText(e.target.value)}
                  maxLength={6}
                  className="form-control captchatxt"
                />
              </div>

              {/* Login Button */}
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

        {/* Footer */}
        <div className="text-center copyrightlogin">
          Copyright © 2025.
          <a href="https://mahait.org/" target="_blank" rel="noopener noreferrer">
            <img src={mahaitlogo} alt="MAHAIT Logo" className="mahaitlogo" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;

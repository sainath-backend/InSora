import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI.js";
import {BiArrowBack} from "react-icons/bi"
import { RxCountdownTimer} from "react-icons/rx"

const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[31.3rem] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255,255,255, 0.18)",
                  }}
                  className="w-[3rem] lg:w-[3.8rem] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center
                focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              className="w-full bg-yellow-50 py-[0.8rem] px-[0.8rem] rouned-[0.5rem] mt-6 font-medium text-richblack-900"
              type="submit"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
    
              <Link to="/signup"  >
            
                <p className="text-richblack-5 flex items-center gap-x-2">   <BiArrowBack/>  Back to Signup </p>
              </Link>

            <button
            className="flex items-center text-blue-100 gap-x-2"
            
            onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
            <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
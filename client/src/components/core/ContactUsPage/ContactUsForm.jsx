import React, { useState, useEffect } from "react";
import "../../../App.css";
import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiconnector.js";
import { contactusEndpoint } from "../../../services/apis.js";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const ContactUsForm = () => {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    //console.log("Form data -", data);
    try {
      setloading(true);
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      console.log(" Email  Res -", res);
      if (res.data.success) {
        toast.success(res.data.message);
      }

      setloading(false);
    } catch (err) {
      console.log("Error Message - ", err.message);
      toast.error(err.message);
      setloading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        messgae: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <form
        className="flex flex-col gap-7"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="label-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first Name"
              className="form-style"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[0.8rem] text-yellow-100">
                Please Enter Your Name
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="label-style">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter first Name"
              className="form-style"
              {...register("lastName")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="email" className="label-style">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className="form-style"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="-mt-1 text-[0.8rem] text-yellow-100">
              {" "}
              Please enter your email Address
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="label-style">
            Phone Number
          </label>
          <div className="flex gap-5">
            <div className="flex w-[5rem] flex-col gap-2">
              <select
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                className="form-style"
                {...register("countryCode", { required: true })}
              >
                {CountryCode.map((ele, i) => {
                  return (
                    <option key={i} value={ele.code}>
                      {ele.code} - {ele.country}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="12345 6789"
                className="form-style"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please Enter Your Phone Number",
                  },
                  maxLength: { value: 12, messgae: "Invalid Phone Number" },
                  minLength: { value: 10, messgae: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[0.8rem] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="label-style">
            Please Enter Your Message
          </label>

          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter Your Message Here..."
            className="form-style"
            {...register("message", { required: true })}
          />
          {errors.messgae && (
            <span className="-mt-1 text-[0.8rem] text-yellow-100">
              Please Enter Your Message
            </span>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[0.82rem] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
          ${
            !loading &&
            "transition-all duration-200 hover:scale:-95 hover:shadow-none"
          } disabled:bg-richblack-500 sm:text-base`}
        >
          Send Message
        </button>
      </form>
      {loading && <div className="mx-auto spinner"></div>}
    </div>
  );
};

export default ContactUsForm;
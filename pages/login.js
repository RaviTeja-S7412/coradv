import Head from "next/head";
import Image from "next/image";
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";
import Slider from "../Components/Slider";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import Router from "next/router";
import Spinner from "../Components/Spinner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [enterdEmail, setEnteredEmail] = useState("");
  const [enterdPassword, setEnteredPassword] = useState("");
  const [enteredEmailValid, setEnteredEmailValid] = useState(true);
  const [enteredPasswordValid, setEnterePasswordValid] = useState(true);
  // const [enteredCredentials,setEnteredCredentials] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const presssPass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    var token = localStorage.getItem("user_data");
    var udata = JSON.parse(localStorage.getItem("user_data"));
    if(udata && udata.role == "100001"){
      Router.push("/assessments");
    }else if(udata && udata.role == "100000"){
      Router.push("/onboard-program");
    }else if(token){
      Router.push("/assessments");
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    if (
      !validateEmail(enterdEmail) &&
      (enterdPassword.trim() === "" || enterdPassword.length < 8)
    ) {
      setEnteredEmailValid(false);
      setEnterePasswordValid(false);
      return;
    } else if (
      !validateEmail(enterdEmail) &&
      (enterdPassword.trim() != "" || enterdPassword.length >= 8)
    ) {
      setEnteredEmailValid(false);
      setEnterePasswordValid(true);
      return;
    } else if (
      validateEmail(enterdEmail) &&
      (enterdPassword.trim() === "" || enterdPassword.length < 8)
    ) {
      setEnteredEmailValid(true);
      setEnterePasswordValid(false);
      return;
    }
    setEnteredEmailValid(true);
    setEnterePasswordValid(true);

    var data = {
      email: enterdEmail,
      password: enterdPassword,
    };

    const response = await fetch("/api/login/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((res) => {
        setLoading(true);
        if (res["status"] == 200) {
          // swal("Success", res['message'], "success");
          localStorage.setItem("token", res["token"]);
          localStorage.setItem("user_data", res["user"]);
          // setTimeout(() => {
            var udata = JSON.parse(localStorage.getItem("user_data"));
            if(udata.role == "100001"){
              Router.push("/assessments");
            }else if(udata.role == "100000"){
              Router.push("/onboard-program");
            }else{
              Router.push("/assessments");
            }
          // }, 1000);
        } else {
          swal("Error", res["message"], "error");
        }
      });
  };

  return (
    <>
    { !loading ? (
      <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 flex flex-col items-center justify-center min-h-screen py-2">
        <div className="bg-flex bg-[#008c15] flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg text-gray-800  w-full md:flex-row">
          <div className="backdrop-blur-sm backdrop-filter   items-center justify-center pl-14 text-white w-full md:w-1/2">
            <Slider />

            <div className="justify-center pl-20 pt-5 items-center align-middle ">
              <button className="text-gray-900 w-64 justify-center drop-shadow-lg bg-white hover:bg-gray-100 border border-green-600 focus:ring-2 focus:outline-none focus:ring-green-700 focus:text-green-600 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-1 mb-1">
                {" "}
                Learn More
              </button>
              <p>
                {" "}
                <select
                  className="text-gray-900 w-64 justify-center drop-shadow-lg bg-white hover:bg-gray-100 border border-green-600 focus:ring-2 focus:outline-none focus:ring-green-700 focus:text-green-600 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-1 mb-1"
                  placeholder="Language"
                  name="Language"
                >
                  <option key="English" value="English" selected>
                    English
                  </option>
                  <option key="Spanish" value="Spanish">
                    Spanish
                  </option>
                  <option key="French" value="French">
                    French
                  </option>
                </select>
              </p>
            </div>
          </div>
          <div className="bg-white flex flex-col item-center p-4 space-y-8 w-full md:w-1/2 ">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-green-400 text-xl">
                <img src="/imgs/cor-logo-300x200.png" />
              </h1>
              <p>Login to your account</p>
            </div>
            <form
              onSubmit={loginHandler}
              className="flex flex-col items-center  space-y-4 w-full"
            >
              <div>
                {" "}
                {!enteredEmailValid && (
                  <p className="text-red-800">Invalid Email</p>
                )}
                <div className="relative border-spacing-3">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    ref={emailRef}
                    onChange={emailInputChangeHandler}
                    className={
                      (!enteredEmailValid
                        ? " border-2 border-red-600 "
                        : "  border-gray-300  ") +
                      "border w-80 outline-none placeholder-green-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-offset-green-300"
                    }
                    placeholder="Email Address.."
                    type="text"
                  />
                </div>
              </div>
              <div>
                {!enteredPasswordValid && (
                  <p className="text-red-800">Invalid Password</p>
                )}
                <div className="relative">
                  <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    ref={passwordRef}
                    onChange={passwordInputChangeHandler}
                    className={
                      (!enteredPasswordValid
                        ? "border-2 border-red-600"
                        : "border-gray-300") +
                      " border w-80 outline-none placeholder-green-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-offset-green-300"
                    }
                    placeholder="Password.."
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    onClick={(e) => presssPass(e)}
                    className="absolute right-2 bottom-2 focus:text-gray-500 text-sm font-semibold"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md text-white transition hover:bg-green-500"
                type="submit"
              >
                <FaUser className="mr-2" />
                Login Now
              </button>

              <div className="flex flex-col items-center">
                <p className="italic">
                  Join us now.
                  <Link href="/regForm">
                    <a className="ml-1 text-green-500 hover:underline">
                      Register Here
                    </a>
                  </Link>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="italic">
                  Lost Password.
                  <Link href="/regForm">
                    <a className="ml-1 text-green-500 hover:underline">
                      Reset Password
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <Spinner  />
    )}
    </>
  );
}

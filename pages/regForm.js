import Link from "next/link";
import TextField from "../Components/TextField";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import Router from 'next/router'

export default function RegForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch("/api/admin/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data.roles);
      });
  }, []);

  const register = async() => {
    var data = {
      "first_name": fname,
      "last_name": lname,
      "role": role,
      "email": email,
      "password": password,
      "cpassword": cpassword,
    }

    const response = await fetch('/api/register/',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then(res => {
        if(res['status'] == 200){
          swal("Success", res['message'], "success");
          setTimeout(() => {
            Router.push('/login')
          }, 2000);
        }else{
          swal("Error", res['message'], "error");
        }
      });

  }

  return (
    <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-flex   bg-white border-green-600 drop-shadow-2xl align-top items-center max-w-lg overflow-hidden rounded-lg text-gray-800  w-full md:flex-row">
        <div>
          {" "}
          <Link href="/">
            <a className="ml-1 text-green-500 text-2xl font-bold hover:none">
              {"<"}
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <img src="/imgs/cor-logo-300x200.png" width="150" height="100" />
        </div>
        <div className="flex justify-center items-center bottom-7">
          <form className="flex flex-col items-center space-y-4 w-full">
            <TextField
              type="text"
              name="first_name"
              style="input-text"
              label="First Name"
              handleChange={(value)=>setFname(value)}
            ></TextField>
            <TextField
              type="text"
              name="last_name"
              style="input-text"
              label="Last Name"
              handleChange={(value)=>setLname(value)}
            ></TextField>
            <label className="relative">
              <select
                name="role"
                className="w-96 h-10 px-2 text-1xl border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              <span className="text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-pass">
                Role
              </span>
            </label>
            <TextField
              type="text"
              name="email"
              style="input-text"
              label="Email"
              handleChange={(value)=>setEmail(value)}
            ></TextField>
            <TextField
              type="password"
              name="password"
              style="input-pass"
              label="Password"
              handleChange={(value)=>setPassword(value)}
            ></TextField>
            <TextField
              type="password"
              name="cpassword"
              style="input-pass"
              label="Confirm Password"
              handleChange={(value)=>setCpassword(value)}
            ></TextField>
            {/* <label className="relative">
              <select
                name="box"
                placeholder="Select Box "
                className="w-96 h-10 px-2 text-xl border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              >
                <option>1</option>
                <option>1</option>
                <option>1</option>
              </select>
              <span className="text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-pass">
                Select Box
              </span>
            </label> */}
            <button
              className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md text-white transition hover:bg-green-500"
              type="button"
              onClick={register}
            >
              Register
            </button>
            <div className="flex flex-col items-center">
              <p className="italic">
                Join us now.
                <Link href="/">
                  <a className="ml-1 text-green-500 hover:underline">Login</a>
                </Link>
              </p>
            </div>
            <div className="h-12"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

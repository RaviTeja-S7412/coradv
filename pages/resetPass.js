import Head from 'next/head'
import Image from 'next/image'
import {FaUser,FaLock} from 'react-icons/fa';
import Link from 'next/link';
import TextField from '../Components/TextField';



export default function RegForm() {
 
    return (
        <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 flex flex-col items-center justify-center min-h-screen py-2">
        <div className="bg-flex   bg-white border-green-600 drop-shadow-2xl align-top items-center max-w-lg overflow-hidden rounded-lg text-gray-800  w-full md:flex-row">
        <div>      <Link href='/'>
                        <a className='ml-1 text-green-500 text-2xl font-bold hover:none'>{"<"}</a>
                      </Link></div>
        <div className='flex flex-col items-center justify-center w-full'>
             <img src='/imgs/cor-logo-300x200.png' width='150' height='100' />
             
            </div>
            <div className='flex justify-center items-center bottom-7'>
            <form className="flex flex-col    items-center space-y-4 w-full">
              
                <TextField type="text" name="Email Address" style="input-text"></TextField>                
               
                                
          {/*  <label className='relative'>
                <input type="text"  placeholder="Last Name" className='h-15 w-max  px-2 text-3xl border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200'></input>
                <span className='text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-text'>Last Name</span>
                </label> 
                <label className='relative'>
                <input type="text"  placeholder="User Role" className='h-15 w-max  px-2 text-3xl font-normal border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200'></input>
                <span className='text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-text'>User Role</span>
                </label> 
                <label className='relative'>
                <input type="text"  placeholder="Email Address Name" className='h-15 w-max  px-2 text-3xl border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200'></input>
                <span className='text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-text'>Email Address</span>
                </label> 
                <label className='relative'>
                <input type="Password"  placeholder="Password" className='h-15 w-max  px-2 text-3xl border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200'></input>
                <span className='text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-pass'>Password</span>
                </label> 
                <label className='relative'>
                <input type="Password"  placeholder="Repeat Password" className='h-15 w-max  px-2 text-3xl border-2 rounded-lg border-gray-300 border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200'></input>
                <span className='text-1xl text-green-600 text-opacity-80 absolute left-0 top-2 max-6 px-2 transition duration-200 input-pass'>Repeat Password</span>
    </label> */}
               
                <buttton className ='bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md text-white transition hover:bg-green-500' type = 'subbmit'>
                   
                    Submit
                  </buttton>
                  <div className='flex flex-col items-center'>
                    <p className='italic'>
                      Click here to
                      <Link href='/'>
                        <a className='ml-1 text-green-500 hover:underline'>Login</a>
                      </Link>
                    </p>
                  </div>
                <div className='h-12'></div>
                </form>
                </div>

         </div>

        </div>

  )
}
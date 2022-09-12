import Head from 'next/head'
import Image from 'next/image'
import {FaUser,FaLock} from 'react-icons/fa';
import Link from 'next/link';


export default function Home() {
  return (
    <>
    <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-flex bg-green-700 flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg text-gray-800  w-full md:flex-row">
        <div className ="backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center p-4 text-white w-full md:w-1/2">
        <h1 className="font-medium text-3xl">COR Advantage</h1>
        <p className='italic-text-lg'>Scrolling Image</p>
        </div>
        <div className="bg-white flex flex-col item-center p-4 space-y-8 w-full "> 
            <div className='flex flex-col items-center w-full'>
              <h1 className='text-green-400 text-xl'><img src='/imgs/cor-logo-300x200.png' /></h1>
              <p>Loginn to your account</p>
            </div>
            <form className="flex flex-col items-center space-y-4 w-full">
                <div className='relative border-spacing-3'>
                  <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaUser /></span>
                  <input className="border w-80 border-gray-300 outline-none placeholder-green-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-offset-green-300" placeholder='Email Address..' type="text" />
                  
                </div>
                <div className='relative'>
                <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaLock /></span>
                  <input className="border w-80 border-gray-300 outline-none placeholder-green-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-offset-green-300" placeholder='Password..' type="password" />
                  
                </div>
                <buttton className ='bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md text-white transition hover:bg-green-500' type = 'subbmit'>
                    <FaUser className='mr-2'/>
                    Login Now
                  </buttton>
                  <div className='flex flex-col items-center'>
                    <p className='italic'>
                      Join us now.
                      <Link href='/regForm'>
                        <a className='ml-1 text-green-500 hover:underline'>Register Here</a>
                      </Link>
                    </p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <p className='italic'>
                     Lost Password.
                      <Link href='/regForm'>
                        <a className='ml-1 text-green-500 hover:underline'>Reset Password</a>
                      </Link>
                    </p>
                  </div>
            </form>
      </div>
      </div>
     
    </div>
    </>
  )
}

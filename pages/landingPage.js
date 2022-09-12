import Head from 'next/head';
import Link from 'next/link';
import Slider from '../Components/Slider';
import Router from "next/router";



export default function LandinPage() {
    
 const loginClickHandler =function(){
   // const router = Router();
    Router.push('/login');
 }
  
  return (
    <>
    <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 flex flex-col items-center justify-center min-h-screen py-2">
        <div> <img src='/imgs/cor-logo-300x200.png' width='150' height='100' /></div>
      <div className="bg-flex bg-[#008c15] relative items-center justify-center p-16 max-w-screen-lg overflow-hidden rounded-lg text-gray-800 ">
      <div className ="backdrop-blur-sm backdrop-filter bg-white w-96  items-center justify-center  text-black relative ">
       
       <Slider />
       </div>
      <div className='justify-center  bg-white pl-14 pt-10 pb-5 w-96 '>
        <p><button  onClick={loginClickHandler} className='text-gray-900 w-64 justify-center drop-shadow-lg bg-white hover:bg-gray-100 border border-green-600 focus:ring-2 focus:outline-none focus:ring-green-700 focus:text-green-600 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-1 mb-1'> Login</button></p>
        <p><button className='text-gray-900 w-64 justify-center drop-shadow-lg bg-white hover:bg-gray-100 border border-green-600 focus:ring-2 focus:outline-none focus:ring-green-700 focus:text-green-600 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-1 mb-1'> Learn More</button></p>
        <p><select className='text-gray-900 w-64 justify-center drop-shadow-lg bg-white hover:bg-gray-100 border border-green-600 focus:ring-2 focus:outline-none focus:ring-green-700 focus:text-black focus:font-semibold font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-1 mb-1' placeholder='Language' name='Language' >
                <option value ="English" selected>English</option>
                <option value ="Spanish">Spanish</option>
                <option value ="French">French</option>
              </select></p>
              </div>  
       </div>
       
        </div>
       
      
     
   
    </>
  )
}

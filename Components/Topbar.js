//npm install classnames
import classNames from "classnames";
import { Fragment } from "react";
import { useState } from "react";
import Admin from "./icons/Admin";
import CloseIcon from "./icons/CloseIcon";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon, UserCircleIcon, CogIcon, InformationCircleIcon, LogoutIcon } from "@heroicons/react/outline";

import { FaRegEnvelope } from "react-icons/fa";
import { RiSettings5Line } from "react-icons/ri";
import Router from "next/router";
import { ToastContainer } from "react-toastify";


function Topbar(prop) {

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    Router.push("/login");
  };
  const profile = () => {

  }
  const settings = () => {

  }
  const help = () => {

  }

  const navigation = [
    { Icon: <UserCircleIcon className="h-4 w-4" />, name: 'User Profile', href: '#', current: true, click: profile },
    { Icon: <CogIcon className="h-4 w-4" />, name: 'Settings', href: '#', current: false, click: settings },
    { Icon: <InformationCircleIcon className="h-4 w-4" />, name: 'Help', href: '#', current: false, click: help },
    { Icon: <LogoutIcon className="h-4 w-4" />, name: 'Logout', href: '#', current: false, click: logout },
  ]

  return (
    <>
      <header className="py-3 w-full">
        <div className="flex items-center justify-between xl:max-w-[95%] xl:mx-auto max-w-full flex-wrap w-full">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white ml-2 capitalize">
            {prop.name}
          </span>
          {/* <img src="http://coradvantage.com/wp-content/uploads/2018/10/cor4-e1597326316416.png" width={220} height={55} /> */}
          {/* <MenuIcon className="lg:hidden block h-6 w-5 cursor-pointer" onClick={() => setOpen(!open)} /> */}
          <nav className={`${open ? "block" : "hidden"} w-full md:flex md:item-center md:w-auto`}>
            <ul className="text-base text-gray-600 md:flex lg:justify-between space-x-3">
              <li>
                <a className="lg:px-3 block text-white px-3 py-2 text-xs font-medium onboard-program-navigation" href="#"><UserCircleIcon className="h-4 w-4" /> User Profile</a>
              </li>
              <li>
                <a className="lg:px-3 block text-white px-3 py-2 text-xs font-medium onboard-program-navigation" href="#"><CogIcon className="h-4 w-4" /> Settings</a>
              </li>
              <li>
                <a className="lg:px-3 block text-white px-3 py-2 text-xs font-medium onboard-program-navigation" href="#"><InformationCircleIcon className="h-4 w-4" /> Help</a>
              </li>
              <li>
                <a className="lg:px-3 block text-white px-3 py-2 text-xs font-medium onboard-program-navigation cursor-pointer" onClick={logout}><LogoutIcon className="h-4 w-4" /> Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
export default Topbar;

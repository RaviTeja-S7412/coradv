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
      <ToastContainer />
      <span className="self-center text-xl font-semibold whitespace-nowrap text-white ml-2 capitalize">
        {prop.name}
      </span>
      <Disclosure as="nav" className="ml-auto bg-gray-00">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <BellIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <BellIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-3">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'text-white' : 'text-white',
                            'px-3 py-2 text-xs font-medium onboard-program-navigation'
                          )}
                          onClick={item.click}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.Icon}&nbsp;{item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    onClick={item.click}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
export default Topbar;

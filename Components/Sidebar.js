//npm install classnames
import classNames from "classnames";
import  React, { useState,useMemo, useEffect  } from "react";
import { useRouter } from "next/router";
import Admin from './icons/Admin';
import Link from 'next/link';
import CloseIcon from './icons/CloseIcon';
import { PlusCircleIcon, IdentificationIcon, PlusIcon } from "@heroicons/react/outline";

const menuItems = [
  { id: 1, cat : "Main", label: "Assessments", icon: Admin, link: "/assessments" },
  { id: 2, cat : "Main", label: "Moments", icon: Admin, link: "/moments" },
  { id: 3, cat : "Main", label: "Storyboards", icon:Admin, link: "/storyboards" },
  { id: 4, cat : "Main", label: "Lesson Planner", icon: Admin, link: "/lessonPlanner" },
  { id: 5, cat : "Main", label: "Year Book", icon: Admin, link: "/yearbook" },
  { id: 6, cat : "Main", label: "Reports", icon: Admin, link: "/reports" },
  { id: 7, cat : "Main", label: "Roaster", icon: Admin, link: "/roaster" },
  { id: 8, cat : "Main", label: "Tags", icon: Admin, link: "/tags" },
  { id: 9, cat : "PAdmin", label: "Assessments", icon: Admin, link: "/assessments" },
  { id: 10, cat : "PAdmin", label: "Moments", icon: Admin, link: "/moments" },
  { id: 11, cat : "PAdmin", label: "Storyboards", icon:Admin, link: "/storyboards" },
  { id: 12, cat : "PAdmin", label: "Lesson Planner", icon: Admin, link: "/lessonPlanner" },
  { id: 13, cat : "PAdmin", label: "Year Book", icon: Admin, link: "/yearbook" },
  { id: 14, cat : "PAdmin", label: "Reports", icon: Admin, link: "/reports" },
  { id: 15, cat : "PAdmin", label: "Roaster", icon: Admin, link: "/roaster" },
  { id: 16, cat : "PAdmin", label: "Tags", icon: Admin, link: "/tags" },
  { id: 17, cat : "AManager", label: "Onboard Program", icon: IdentificationIcon, link: "/onboard-program" },
  { id: 18, cat : "AManager", label: "Add Centers", icon: PlusIcon, link: "/moments" },
  { id: 19, cat : "AManager", label: "Add Account Managers", icon: PlusCircleIcon, link: "/storyboards" },

];

function Sidebar(props){

  const[ role, setRole ] = useState('Main');
  useEffect(() => {
    var udata = JSON.parse(localStorage.getItem("user_data"));
    if(udata && udata.role == "100001"){
      setRole("PAdmin");
    }else if(udata && udata.role == "100000"){
      setRole("AManager");
    }
  }, []); 

  const router = useRouter();
  const menuFiltered = menuItems.filter(obj=> obj.cat == role);
  const activeMenu = useMemo(
    () => menuFiltered.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );
  const wrapperClasses = classNames(
    "h-screen px-1 pt-2 pb-2 bg-light flex justify-between flex-col",
    {
      ["w-60"]: !props.toggle,
      ["w-16"]: props.toggle,
    }
  );
  
  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const getNavItemClasses = (menu) => {
    // console.log(activeMenu);
    // console.log(menu);
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-gray-200"]: menu.link === router.pathname
      }
    );
  };

    return ( <div
        className={wrapperClasses}
     
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
      
<div className="flex flex-col">
{(props.toggle) ? (  
  <div className="flex items-center pt-2 pr-2 align-top  relative "><img src="/imgs/cor-logo-300x200.png" width={"100%"} />
  </div>
) : (
  <div className="flex items-center pt-2 pr-2 align-top  relative "><img src="/imgs/logo.png" width={"100%"} />
  </div>
)}
<div className="flex items-center justify-between">

      {   <div className="flex flex-col items-start w-screen">
          {menuFiltered.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={menu.link}>
                <Link href={menu.link}>
                  <a className="flex py-3 px-3 items-center w-full h-full hover:bg-gray-200 text-sm font-medium">
                    <div style={{ width: "30px", paddingRight: "10px" }}>
                      <Icon />
                    </div>
                    {!props.toggle && (
                      <span
                        className={classNames(
                          "text-md font-small text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>  }
    </div>
</div>

       
    </div>)
}
export default Sidebar;
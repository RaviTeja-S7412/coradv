import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Userbar from "./userbar";
import { useEffect, useState } from "react";
import classNames from "classnames";
import CloseIcon from "./icons/CloseIcon";
import Breadcrumb from "./Breadcrump";
import { useRouter } from "next/router";
const Layout = ({ children }) => {

  const router = useRouter();
  var url = "";
  url = router.pathname.replace("/", "");
  url = url.replace("-", " ");

  let styleClass = "flex w-full h-16 bg-[#43B02A] justify-start";
  if (url === "assessments") {
    styleClass = "flex w-full h-16 bg-[#43B02A] justify-start";
  } else if (url === "moments") {
    styleClass = "flex w-full h-16 bg-[#e93cac] justify-start";
  }

  const [toggleCollapse, setToggleCollapse] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };


  return (
    <div className="h-full flex flex-row justify-start">
      <Sidebar toggle={toggleCollapse} />
      <div className="bg-gray-300 flex-1 text-black border-1 border-dashed">
        <div className={styleClass}>
          <button className={"pl-2"} onClick={handleSidebarToggle}>
            <CloseIcon />
          </button>
          <Topbar name={url} />
        </div>
        <Userbar name={url} />
        <Breadcrumb name={url} />
        {children}
        <div className="clear-both"></div>
      </div>
    </div>
  );
};
export default Layout;

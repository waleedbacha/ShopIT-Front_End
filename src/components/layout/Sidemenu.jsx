import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidemenu = ({menuItems}) => {


const location = useLocation();

const [aciveMenuItem, setAciveMenuItem] = useState(location.pathname);

const handleMenuItemClick= (menuItemUrl) => {
setAciveMenuItem(menuItemUrl);
}

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems?.map((menuItem, index) =>(
       <Link
       key={index}
       to={menuItem.url}
       href="menu-item-url-1"
       className={`fw-bold list-group-item list-group-item-action
       ${aciveMenuItem.includes(menuItem.url) ? "active": ""}`}

       onClick={() => handleMenuItemClick(menuItem.url)}

       aria-content = {aciveMenuItem.includes(menuItem.url) ? "true": "false"}
       >
        
       <i className= {`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
     </Link>

      ))}
     
      
    </div>
  );
};

export default Sidemenu;

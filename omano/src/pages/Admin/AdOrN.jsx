import React from 'react'
import Sidebar from '../../components/admin_comp/Sidebar'

export default function AdOrN() {
    const location = useLocation();
  function adminOrNot() {
    console.log(location.pathname);
    if (location.pathname === "/admin" || location.pathname.startsWith("/admin/")) return true;
    else return false;
  } 

  return (
    <div className="flex">
        {adminOrNot() && (       
            <Sidebar  />
        )}
      </div>
  )
}

import React, { useState, useEffect } from 'react';
import '../css/component/topbar.css'
import { checkAdmin } from '../scripts/auth';
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

function Topbar() {

  const [administrator, setAdministrator] = useState(false);//TODO: Aplicar cambios en el sitio dependiendo de si se es adminsitrador o no 

  useEffect(() => {
    const checkAuthenticated = async () => {
      if (await checkAdmin()) {
        setAdministrator(true);
      }
    }

    checkAuthenticated()
  }, []);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ECOCEM</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
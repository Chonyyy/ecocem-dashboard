import React, { useState, useEffect, useRef } from 'react';
import '../css/component/topbar.css';
import { checkAdmin } from '../scripts/auth';
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Topbar() {
  const [administrator, setAdministrator] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const hasShownNotifications = useRef(false);

  // Notify function that displays all notifications
  const notify = () => {
    if (!hasShownNotifications.current) {
      notifications.forEach(notification => {
        toast(notification.message); // Assuming each notification has a `message` field
      });
      hasShownNotifications.current = true;
    }
  };

  useEffect(() => {
    const checkAuthenticated = async () => {
      if (await checkAdmin()) {
        setAdministrator(true);
      }
    };
    fetchNotification();
    checkAuthenticated();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await axios.get('http://localhost:5103/api/Notification');
      const data = response.data;
      if (Array.isArray(data)) {
        setNotifications(data); // Store notifications in state
      } else {
        setNotifications([]); // Ensure it's an array
      }
      hasShownNotifications.current = false; // Reset shown notifications status after fetching new data
    } catch (error) {
      toast.error("Error de red");
      setNotifications([]); // In case of error, ensure it's still an array
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ECOCEM</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={notify}>
            <NotificationsNone />
            <ToastContainer />
            <span className="topIconBadge">{notifications.length}</span>
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

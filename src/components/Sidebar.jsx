  import React, { useState } from 'react';
  import '../css/component/sidebar.css'
  import { useLocation } from 'react-router-dom';
  import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    HomeOutlined
  } from "@mui/icons-material";
  import { Link } from "react-router-dom";

  function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const [dashboardOpen, setDashboardOpen] = useState(true);
    const [quickMenuOpen, setQuickMenuOpen] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(true);
    const [staffOpen, setStaffOpen] = useState(true);
  
    const toggleDashboard = () => setDashboardOpen(!dashboardOpen);
    const toggleQuickMenu = () => setQuickMenuOpen(!quickMenuOpen);
    const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
    const toggleStaff = () => setStaffOpen(!staffOpen);

    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle"  onClick={toggleDashboard}>Mantenimiento</h3>
            {dashboardOpen && (
            <ul className="sidebarList">

              <Link to="/" className="link">
              <li className={`sidebarListItem ${currentPath === '/' ? 'active' : ''}`}>
                <HomeOutlined className="sidebarIcon" />
                Home
              </li>
              </Link>

              <Link to="/accion-mantenimiento" className="link">
              <li className={`sidebarListItem ${currentPath === '/accion-mantenimiento' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Acción Mantenimiento
              </li>
              </Link>

              <Link to="/equipo" className="link">
              <li className={`sidebarListItem ${currentPath === '/equipo' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Equipo
              </li>
              </Link>

              <Link to="/herramientas" className="link">
              <li className={`sidebarListItem ${currentPath === '/herramientas' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Herramientas
              </li>
              </Link>

              <Link to="/orden-trabajo" className="link">
              <li className={`sidebarListItem ${currentPath === '/orden-trabajo' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Orden de Trabajo
              </li>
              </Link>

              <Link to="/reporte" className="link">
              <li className={`sidebarListItem ${currentPath === '/reporte' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Reporte
              </li>
              </Link>

              <Link to="/rotura-equipo" className="link">
              <li className={`sidebarListItem ${currentPath === '/rotura-equipo' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Rotura de Equipo
              </li>
              </Link>

              <Link to="/tipo-rotura" className="link">
              <li className={`sidebarListItem ${currentPath === '/tipo-rotura' ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Tipo Rotura
              </li>
              </Link>

            </ul>)}
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle" onClick={toggleQuickMenu}>Pesos</h3>
            {quickMenuOpen && (
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className={`sidebarListItem ${currentPath === '/users' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className={`sidebarListItem ${currentPath === '/products' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </Link>
            </ul>)}
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle" onClick={toggleNotifications}>Notificaciones</h3>
            {notificationsOpen && (
            <ul className="sidebarList">
              <li className={`sidebarListItem ${currentPath === '/ni' ? 'active' : ''}`}>
                <MailOutline className="sidebarIcon" />
                Mail
              </li>
              <li className={`sidebarListItem ${currentPath === '/ni' ? 'active' : ''}`}>
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
              <li className={`sidebarListItem ${currentPath === '/ni' ? 'active' : ''}`}>
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul>)}
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle" onClick={toggleStaff}>Administración</h3>
            {staffOpen && (
            <ul className="sidebarList">
              <li className={`sidebarListItem ${currentPath === '/ni' ? 'active' : ''}`}>
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
              <li className={`sidebarListItem ${currentPath === '/ni' ? 'active' : ''}`}>
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className={`sidebarListItem ${currentPath === '/ni' ? 'active' : ''}`}>
                <Report className="sidebarIcon" />
                Reports
              </li>
            </ul>)}
          </div>
        </div>
      </div>
    );
  }

  export default Sidebar;

  /*
[X]Gestion de mantenimiento 
[X]-accion de mantenimiento 
[X]-equipo
[X]-herramientas
[X]-orden de trabajo
[X]-reporte
[X]-rotura de equipo
[X]-tipo de rotura
[X]Calculo de Peso
[ ]-bascula
[ ]-carga
[ ]-compra
[ ]-entidad compradora
[ ]-fabrica
[ ]-medidor
[ ]-silo
[ ]-tipo de cemento
[ ]-vehiculo
[ ]-venta
[X]Gestion de admin
[ ]-brigada
[ ]-cede
[ ]-sucursal
[ ]-tipo de equipo
[ ]-trabajador
[ ]-empresa
[ ]-registrar usuario
  */
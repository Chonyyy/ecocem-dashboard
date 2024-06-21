import React, { useState, useEffect } from 'react';
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
import { checkAdmin } from '../scripts/auth';

function Sidebar() {
  const [administrator, setAdministrator] = useState(false);//TODO: Hacer cambios en el sitio dependiendo de si se es administrador o no

  useEffect(() => {
    if (checkAdmin()) {
      setAdministrator(true);
    }
  }, []);

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
          <h3 className="sidebarTitle" onClick={toggleDashboard}>Mantenimiento</h3>
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

              <Link to="/bascula" className="link">
                <li className={`sidebarListItem ${currentPath === '/bascula' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Bascula
                </li>
              </Link>

              <Link to="/carga" className="link">
                <li className={`sidebarListItem ${currentPath === '/carga' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Carga
                </li>
              </Link>

              <Link to="/compra" className="link">
                <li className={`sidebarListItem ${currentPath === '/compra' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Compra
                </li>
              </Link>

              <Link to="/entidad-compradora" className="link">
                <li className={`sidebarListItem ${currentPath === '/entidad-compradora' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Entidad Compradora
                </li>
              </Link>

              <Link to="/fabrica" className="link">
                <li className={`sidebarListItem ${currentPath === '/fabrica' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Fabrica
                </li>
              </Link>

              <Link to="/medidor" className="link">
                <li className={`sidebarListItem ${currentPath === '/medidor' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Medidor
                </li>
              </Link>

              <Link to="/silo" className="link">
                <li className={`sidebarListItem ${currentPath === '/silo' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Silo
                </li>
              </Link>

              <Link to="/tipo-cemento" className="link">
                <li className={`sidebarListItem ${currentPath === '/tipo-cemento' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Tipo de Cemento
                </li>
              </Link>

              <Link to="/Vehiculo" className="link">
                <li className={`sidebarListItem ${currentPath === '/Vehiculo' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Vehiculo
                </li>
              </Link>

              <Link to="/venta" className="link">
                <li className={`sidebarListItem ${currentPath === '/venta' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Venta
                </li>
              </Link>

            </ul>)}
        </div>
        
        <div className="sidebarMenu">
          <h3 className="sidebarTitle" onClick={toggleStaff}>Administración</h3>
          {staffOpen && (
            <ul className="sidebarList">

              <Link to="/brigada" className="link">
                <li className={`sidebarListItem ${currentPath === '/brigada' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Brigada
                </li>
              </Link>

              <Link to="/Sede" className="link">
                <li className={`sidebarListItem ${currentPath === '/Sede' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Sede
                </li>
              </Link>

              <Link to="/sucursal" className="link">
                <li className={`sidebarListItem ${currentPath === '/sucursal' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Sucursal
                </li>
              </Link>

              <Link to="/tipo-equipo" className="link">
                <li className={`sidebarListItem ${currentPath === '/tipo-equipo' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Tipo de Equipo
                </li>
              </Link>

              <Link to="/trabajador" className="link">
                <li className={`sidebarListItem ${currentPath === '/trabajador' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Trabajador
                </li>
              </Link>

              <Link to="/empresa" className="link">
                <li className={`sidebarListItem ${currentPath === '/empresa' ? 'active' : ''}`}>
                  <Storefront className="sidebarIcon" />
                  Empresa
                </li>
              </Link>

              <Link to="/registrar-usuario" className="link">
                <li className={`sidebarListItem ${currentPath === '/registrar-usuario' ? 'active' : ''}`}>
                  <PermIdentity className="sidebarIcon" />
                  Registrar Usuario
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
      </div>
    </div>
  );
}

export default Sidebar;

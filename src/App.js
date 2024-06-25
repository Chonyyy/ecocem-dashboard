import Sidebar from './components/Sidebar'
import Topbar from "./components/Topbar";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";

//Authentication

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

//Mantenimiento

import Reporte from './pages/mantenimiento/Reporte';
import ReporteCreate from './pages/mantenimiento/ReporteCreate';
import AccionMantenimiento from './pages/mantenimiento/AccionMantenimiento';
import AccionMantenimientoCreate from './pages/mantenimiento/AccionMantenimientoCreate';
import Equipo from './pages/mantenimiento/Equipo';
import EquipoCreate  from './pages/mantenimiento/EquipoCreate';
import Herramientas from './pages/mantenimiento/Herramientas';
import HerramientasCreate from './pages/mantenimiento/HerramientasCreate';
import OrdenTrabajo from './pages/mantenimiento/OrdenTrabajo';
import OrdenTrabajoCreate from './pages/mantenimiento/OrdenTrabajoCreate';
import ResumenParametros from './pages/mantenimiento/ResumenParametros';
import RoturaEquipo from './pages/mantenimiento/RoturaEquipo';
import RoturaEquipoCreate from './pages/mantenimiento/RoturaEquipoCreate';
import TipoRotura from './pages/mantenimiento/TipoRotura';
import TipoRoturaCreate from './pages/mantenimiento/TipoRoturaCreate';

//Peso

import Bascula from './pages/peso/Bascula';
import BasculaCreate from './pages/peso/BasculaCreate';
import Carga from './pages/peso/Carga';
import CargaCreate from './pages/peso/CargaCreate';
import Compra from './pages/peso/Compra';
import CompraCreate from './pages/peso/CompraCreate';
import EntidadCompradora from './pages/peso/EntidadCompradora';
import EntidadCompradoraCreate from './pages/peso/EntidadCompradoraCreate';
import Fabrica from './pages/peso/Fabrica';
import FabricaCreate from './pages/peso/FabricaCreate';
import Medidor from './pages/peso/Medidor';
import MedidorCreate from './pages/peso/MedidorCreate';
import Silo from './pages/peso/Silo';
import SiloCreate from './pages/peso/SiloCreate';
import TipoCemento from './pages/peso/TipoCemento';
import TipoCementoCreate from './pages/peso/TipoCementoCreate';
import Vehiculo from './pages/peso/Vehiculo';
import VehiculoCreate from './pages/peso/VehiculoCreate';
import Venta from './pages/peso/Venta';
import VentaCreate from './pages/peso/VentaCreate';
import MedicionBascula from './pages/peso/MedicionBascula';
import MedicionSilo from './pages/peso/MedicionSilo';
import MedicionBasculaCreate from './pages/peso/MedicionBasculaCreate';
import MedicionSiloCreate from './pages/peso/MedicionSiloCreate';

//Administracion
import Brigada from './pages/administracion/Brigada';
import BrigadaCreate from './pages/administracion/BrigadaCreate';
import Empresa from './pages/administracion/Empresa';
import EmpresaCreate from './pages/administracion/EmpresaCreate';
import RegistrarUsuario from './pages/administracion/RegistrarUsuario';
import RegistrarUsuarioCreate from './pages/administracion/RegistrarUsuarioCreate';
import Sede from './pages/administracion/Sede';
import SedeCreate from './pages/administracion/SedeCreate';
import Sucursal from './pages/administracion/Sucursal';
// import SucursalCreate from './pages/administracion/SucursalCreate';
import TipoEquipo from './pages/administracion/TipoEquipo';
import TipoEquipoCreate from './pages/administracion/TipoEquipoCreate';
import Trabajador from './pages/administracion/Trabajador';
import TrabajadorCreate from './pages/administracion/TrabajadorCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path='*'
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Routes>
                  {/* Mantenimiento */}
                  <Route path='/reporte' element={<ProtectedRoute element={Reporte} />} />
                  <Route path='/reporte-create' element={<ProtectedRoute element={ReporteCreate} />} />
                  <Route path='/accion-mantenimiento' element={<ProtectedRoute element={AccionMantenimiento} />} />
                  <Route path='/accion-mantenimiento-create' element={<ProtectedRoute element={AccionMantenimientoCreate} />} />
                  <Route path='/equipo' element={<ProtectedRoute element={Equipo} />} />
                  <Route path='/equipo-create' element={<ProtectedRoute element={EquipoCreate} />} />
                  <Route path='/herramientas' element={<ProtectedRoute element={Herramientas} />} />
                  <Route path='/herramientas-create' element={<ProtectedRoute element={HerramientasCreate} />} />
                  <Route path='/orden-trabajo' element={<ProtectedRoute element={OrdenTrabajo} />} />
                  <Route path='/orden-trabajo-create' element={<ProtectedRoute element={OrdenTrabajoCreate} />} />
                  <Route path='/resumen-parametros' element={<ProtectedRoute element={ResumenParametros} />} />
                  <Route path='/rotura-equipo' element={<ProtectedRoute element={RoturaEquipo} />} />
                  <Route path='/rotura-equipo-create' element={<ProtectedRoute element={RoturaEquipoCreate} />} />
                  <Route path='/tipo-rotura' element={<ProtectedRoute element={TipoRotura} />} />
                  <Route path='/tipo-rotura-create' element={<ProtectedRoute element={TipoRoturaCreate} />} />
                  <Route path="/" element={<ProtectedRoute element={Home} />} />
                  
                  {/* Pesos */}
                  <Route path='/bascula' element={<ProtectedRoute element={Bascula} />} />
                  <Route path='/bascula-create' element={<ProtectedRoute element={BasculaCreate} />} />
                  <Route path='/carga' element={<ProtectedRoute element={Carga} />} />
                  <Route path='/carga-create' element={<ProtectedRoute element={CargaCreate} />} />
                  <Route path='/compra' element={<ProtectedRoute element={Compra} />} />
                  <Route path='/compra-create' element={<ProtectedRoute element={CompraCreate} />} />
                  <Route path='/entidad-compradora' element={<ProtectedRoute element={EntidadCompradora} />} />
                  <Route path='/entidad-compradora-create' element={<ProtectedRoute element={EntidadCompradoraCreate} />} />
                  <Route path='/fabrica' element={<ProtectedRoute element={Fabrica} />} />
                  <Route path='/fabrica-create' element={<ProtectedRoute element={FabricaCreate} />} />
                  <Route path='/medidor' element={<ProtectedRoute element={Medidor} />} />
                  <Route path='/medidor-create' element={<ProtectedRoute element={MedidorCreate} />} />
                  <Route path='/silo' element={<ProtectedRoute element={Silo} />} />
                  <Route path='/silo-create' element={<ProtectedRoute element={SiloCreate} />} />
                  <Route path='/tipo-cemento' element={<ProtectedRoute element={TipoCemento} />} />
                  <Route path='/tipo-cemento-create' element={<ProtectedRoute element={TipoCementoCreate} />} />
                  <Route path='/vehiculo' element={<ProtectedRoute element={Vehiculo} />} />
                  <Route path='/vehiculo-create' element={<ProtectedRoute element={VehiculoCreate} />} />
                  <Route path='/venta' element={<ProtectedRoute element={Venta} />} />
                  <Route path='/venta-create' element={<ProtectedRoute element={VentaCreate} />} />
                  <Route path='/medicion-bascula' element={<ProtectedRoute element={MedicionBascula} />} />
                  <Route path='/medicion-bascula-create' element={<ProtectedRoute element={MedicionBasculaCreate} />} />
                  <Route path='/medicion-silo' element={<ProtectedRoute element={MedicionSilo} />} />
                  <Route path='/medicion-silo-create' element={<ProtectedRoute element={MedicionSiloCreate} />} />
                  

                  {/* Administracion */}
                  <Route path='/brigada' element={<ProtectedRoute element={Brigada} />} />
                  <Route path='/brigada-create' element={<ProtectedRoute element={BrigadaCreate} />} />
                  <Route path='/empresa' element={<ProtectedRoute element={Empresa} />} />
                  <Route path='/empresa-create' element={<ProtectedRoute element={EmpresaCreate} />} />
                  <Route path='/registrar-usuario' element={<ProtectedRoute element={RegistrarUsuario} />} />
                  <Route path='/registrar-usuario-create' element={<ProtectedRoute element={RegistrarUsuarioCreate} />} />
                  <Route path='/sede' element={<ProtectedRoute element={Sede} />} />
                  <Route path='/sede-create' element={<ProtectedRoute element={SedeCreate} />} />
                  <Route path='/sucursal' element={<ProtectedRoute element={Sucursal} />} />
                  {/* <Route path='/sucursal-create' element={<ProtectedRoute element={SucursalCreate} />} /> */}
                  <Route path='/tipo-equipo' element={<ProtectedRoute element={TipoEquipo} />} />
                  <Route path='/tipo-equipo-create' element={<ProtectedRoute element={TipoEquipoCreate} />} />
                  <Route path='/trabajador' element={<ProtectedRoute element={Trabajador} />} />
                  <Route path='/trabajador-create' element={<ProtectedRoute element={TrabajadorCreate} />} />
                  

                  {/* Otros */}
                  <Route path="/users" element={<UserList />} />
                  <Route path="/user/:userId" element={<User />} />
                  <Route path="/newUser" element={<NewUser />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/newproduct" element={<NewProduct />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
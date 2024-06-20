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

//Mantenimiento
import AccionMantenimiento from './pages/mantenimiento/AccionMantenimiento';
import AccionMantenimientoCreate from './pages/mantenimiento/AccionMantenimientoCreate';
import Equipo from './pages/mantenimiento/Equipo';
import EquipoCreate  from './pages/mantenimiento/EquipoCreate';
import Herramientas from './pages/mantenimiento/Herramientas';
import HerramientasCreate from './pages/mantenimiento/HerramientasCreate';
import OrdenTrabajo from './pages/mantenimiento/OrdenTrabajo';
import OrdenTrabajoCreate from './pages/mantenimiento/OrdenTrabajoCreate';
import Reporte from './pages/mantenimiento/Reporte';
import RoturaEquipo from './pages/mantenimiento/RoturaEquipo';
import RoturaEquipoCreate from './pages/mantenimiento/RoturaEquipoCreate';
import TipoRotura from './pages/mantenimiento/TipoRotura';
import TipoRoturaCreate from './pages/mantenimiento/TipoRoturaCreate';

//Peso

//Administracion

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          {/* Mantenimiento */}
          <Route path='/accion-mantenimiento' element={<AccionMantenimiento />} />
          <Route path='/accion-mantenimiento-create' element={<AccionMantenimientoCreate />} />
          <Route path='/equipo' element={<Equipo />} />
          <Route path='/equipo-create' element={<EquipoCreate />} />
          <Route path='/herramientas' element={<Herramientas />} />
          <Route path='/herramientas-create' element={<HerramientasCreate />} />
          <Route path='/orden-trabajo' element={<OrdenTrabajo />} />
          <Route path='/orden-trabajo-create' element={<OrdenTrabajoCreate />} />
          <Route path='/reporte' element={<Reporte />} />
          <Route path='/rotura-equipo' element={<RoturaEquipo />} />
          <Route path='/rotura-equipo-create' element={<RoturaEquipoCreate />} />
          <Route path='/tipo-rotura' element={<TipoRotura />} />
          <Route path='/tipo-rotura-create' element={<TipoRoturaCreate />} />

          {/* Peso */}

          {/* Administracion */}

          {/* Otros */}
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
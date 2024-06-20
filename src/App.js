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
                  <Route path='/accion-mantenimiento' element={<ProtectedRoute element={AccionMantenimiento} />} />
                  <Route path='/accion-mantenimiento-create' element={<ProtectedRoute element={AccionMantenimientoCreate} />} />
                  <Route path='/equipo' element={<ProtectedRoute element={Equipo} />} />
                  <Route path='/equipo-create' element={<ProtectedRoute element={EquipoCreate} />} />
                  <Route path='/herramientas' element={<ProtectedRoute element={Herramientas} />} />
                  <Route path='/herramientas-create' element={<ProtectedRoute element={HerramientasCreate} />} />
                  <Route path='/orden-trabajo' element={<ProtectedRoute element={OrdenTrabajo} />} />
                  <Route path='/orden-trabajo-create' element={<ProtectedRoute element={OrdenTrabajoCreate} />} />
                  <Route path='/reporte' element={<ProtectedRoute element={Reporte} />} />
                  <Route path='/rotura-equipo' element={<ProtectedRoute element={RoturaEquipo} />} />
                  <Route path='/rotura-equipo-create' element={<ProtectedRoute element={RoturaEquipoCreate} />} />
                  <Route path='/tipo-rotura' element={<ProtectedRoute element={TipoRotura} />} />
                  <Route path='/tipo-rotura-create' element={<ProtectedRoute element={TipoRoturaCreate} />} />
                  <Route path="/" element={<ProtectedRoute element={Home} />} />
                  
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
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

import AccionMantenimiento from './pages/mantenimiento/AccionMantenimiento';
import Equipo from './pages/mantenimiento/Equipo';
import Herramientas from './pages/mantenimiento/Herramientas';
import OrdenTrabajo from './pages/mantenimiento/OrdenTrabajo';
import Reporte from './pages/mantenimiento/Reporte';
import RoturaEquipo from './pages/mantenimiento/RoturaEquipo';
import TipoRotura from './pages/mantenimiento/TipoRotura';

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path='/accion-mantenimiento' element={<AccionMantenimiento />} />
          <Route path='/equipo' element={<Equipo />} />
          <Route path='/herramientas' element={<Herramientas />} />
          <Route path='/orden-trabajo' element={<OrdenTrabajo />} />
          <Route path='/reporte' element={<Reporte />} />
          <Route path='/rotura-equipo' element={<RoturaEquipo />} />
          <Route path='/tipo-rotura' element={<TipoRotura />} />

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
import '../../css/page/administracion/registrarUsuarioCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EmpresaCreate() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContraseña] = useState("");
    const [noSede, setNoSede]  = useState(1);
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState('');

    const [sedes, setSedes] = useState([]);
  
      // const roles = ["Administrador", "Jefe de Mantenimiento"]
      const roles = ["admin", "jefe"]

  useEffect(() => {
    axios.get(`http://localhost:5103/api/Sede`)
      .then(res => {
        setSedes(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const role = {
            name: rol,
            description: ""
        }
        
        const user = {
        name: nombreUsuario,
        password: contrasena,
        noSede: noSede,
        old_Password: "",
        email: email,
        }

        if (!nombreUsuario || !contrasena) {
        alert("Ingrese un nombre de usuario y una contraseña.");
        return;
        }
      
      const newEntry = {
        user: user,
        role: role
      };
      const response = await axios.post('/Registration', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newEmpresa">
      <h1 className="newEmpresaTitle">Crear Empresa</h1>
      <form className="newEmpresaForm" onSubmit={handleSubmit}>
        <div className="newEmpresaItem">

          <label>Nombre</label>
          <input
            value={nombreUsuario}
            placeholder="Ingrese el nombre de usuario"
            onChange={(e) => setNombreUsuario(e.target.value)}
            className="newEmpresaTextarea"
          />
            <label>Contraseña</label>
            <input
                type="password"
                value={contrasena}
                placeholder="Ingrese su contraseña"
                onChange={(e) => setContraseña(e.target.value)}
              />

            <label>Correo</label>
            <input
                value={email}
                placeholder="Ingrese su correo"
                onChange={(e) => setEmail(e.target.value)}
              />

            <label>Sede</label>
            <select
            value={noSede}
            onChange={(e) => setNoSede(e.target.value)}
            >
            {sedes.map((sede) => (
                <option key={sede.sedeId} value={sede.sedeId}>
                {sede.nombreSede}
                
                </option>
            ))}
            </select>

            <label>Rol</label>
            <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            >
            {roles.map((rol) => (
                <option key={rol} value={rol}>
                {rol}
                
                </option>
            ))}
            </select>


        </div>
        <button type="submit" className="newEmpresaButton">Create</button>
      </form>
    </div>
  );
}

export default EmpresaCreate;

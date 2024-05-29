import React, { useState, useEffect } from "react";
import "./Registro.css";
import { initFirestore } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Registro = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let redireccion = useNavigate();

  async function getUsuarios() {
    let resultado = collection(initFirestore, "usuarios");
    let data = await getDocs(resultado);
    /* Si es un arreglo, puedo iterarlo con los métodos de JS
    map */
    console.log(data.docs.map((doc) => ({ ...doc.data() })));
    setUsuarios(data.docs.map((doc) => ({ ...doc.data() })));
  }
  useEffect(() => {
    getUsuarios();
  }, []);
  const buscarUsuario = () => {
    let estado = usuarios.some((usuario) => usuario.user === user);
    return estado;
  };
  const registrarUsuario = () => {
    if (!buscarUsuario()) {
      Swal.fire({
        title: "Bievenido",
        text: "Será redireccionado al panel principal",
        icon: "success",
      });
      redireccion("/home");
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario ya existe en la base de datos",
        icon: "error",
      });
    }
  };
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <button onClick={registrarUsuario} type="button">
            Registro
          </button>
          <p className="message">
            Ya está registrado? <Link to="/">Iniciar Sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;

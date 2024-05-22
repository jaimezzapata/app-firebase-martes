import Header from "../../helpers/Header";
import React, { useState, useEffect } from "react";
import { initFirestore } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./ListadoUsuarios.css";

const ListadoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  let redireccion = useNavigate();
  async function getUsuarios() {
    let resultado = collection(initFirestore, "usuarios");
    let data = await getDocs(resultado);
    /* Si es un arreglo, puedo iterarlo con los métodos de JS
    map */
    console.log(data.docs);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  const eliminarUsuario = (id) => {
    console.log("Eliminando el usuario " + id);
  };

  return (
    <section className="panel">
      <Header />
      <main className="panel-contenido">
        {usuarios.map((usuario) => (
          <section>
            <section>
              <p>Nombre: {usuario.name}</p>
              <p>Usuario: {usuario.user}</p>
              <p>Correo: {usuario.email}</p>
            </section>
            <div>
              <button onClick={() => eliminarUsuario(usuario.id)}>
                Eliminar
              </button>
              <Link>Editar</Link>
            </div>
          </section>
        ))}
      </main>
    </section>
  );
};

export default ListadoUsuarios;

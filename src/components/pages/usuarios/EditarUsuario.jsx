import React, { useState, useEffect } from "react";
import "../auth/Registro.css";
import { initFirestore, initStorage } from "../../config/firebaseConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const EditarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  let { id } = useParams();
  let redireccion = useNavigate();

  async function getUsuarioId(id) {
    let resultado = await getDoc(doc(initFirestore, "usuarios", id));
    console.log(resultado);
    setEmail(resultado.data().email);
    setImg(resultado.data().imgServer);
    setName(resultado.data().name);
    setPassword(resultado.data().password);
    setUser(resultado.data().user);
  }

  useEffect(() => {
    getUsuarioId(id);
  }, []);

  const subirImg = async (imagen) => {
    let referenciaImg = ref(initStorage, v4());
    console.log(referenciaImg);
    await uploadBytes(referenciaImg, imagen);
    let urlImagen = await getDownloadURL(referenciaImg);
    return urlImagen;
  };

  async function editarUsuario() {
    let imgServer = await subirImg(img);
    let nuevoUsuario = {
      user,
      password,
      email,
      name,
      imgServer,
    };
    let enviarUsuario = doc(initFirestore, "usuarios", id);
    await updateDoc(enviarUsuario, nuevoUsuario);
    redireccion("/listado-usuarios");
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="username"
            value={user}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            value={password}
          />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre"
            value={name}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            value={email}
          />
          <input onChange={(e) => setImg(e.target.files[0])} type="file" />
          <button onClick={editarUsuario} type="button">
            Editar
          </button>
          <button type="button" className="message">
            <Link className="cancelar" to="/listado-usuarios">
              Cancelar
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;

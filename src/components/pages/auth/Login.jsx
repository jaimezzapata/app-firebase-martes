import React, { useState, useEffect } from "react";
import "./Login.css";
import { initFirestore } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Login = () => {
  const [usuarios, setUsuarios] = useState();
  async function getUsuarios() {
    let resultado = collection(initFirestore, "usuarios");
    let data = await getDocs(resultado);
    /* Si es un arreglo, puedo iterarlo con los métodos de JS
    map */
    console.log(data.docs.map((doc) => ({ ...doc.data() })));
    setUsuarios(data.docs.map((doc) => ({ ...doc.data() })));
  }
  useEffect(()=>{
    getUsuarios();
  },[])

  // console.log(initFirestore);
  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form">
          <input type="text" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="email address" />
          <button>create</button>
          <p className="message">
            Already registered? <a href="#">Sign In</a>
          </p>
        </form>
        <form className="login-form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button type="button">login</button>
          <p className="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

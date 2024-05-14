import React from "react";
import "./Login.css";
import { initFirestore } from "../../config/firebaseConfig";
import { collection } from "firebase/firestore";

const Login = () => {
  function getUsuarios() {
    let resultado = collection(initFirestore, "usuarios");
    console.log(resultado);
  }
  getUsuarios();

  console.log(initFirestore);
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

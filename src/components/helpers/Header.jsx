import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="side-nav">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/listado-usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="#">Services</Link>
        </li>
        <li>
          <Link to="/">Cerrar Sesion</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

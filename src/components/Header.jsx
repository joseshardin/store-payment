import { useState } from "react";
import Carrito from "./Carrito";

const Header = ({ carrito, eliminarCurso, vaciarCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  return (
    <header className="header contenedor">
      <div className="logo">
        <a href="/">
          <img src="/img/logo.jpg" alt="Logo" />
        </a>
      </div>
      <div
        className="carrito-compras"
        onMouseEnter={() => setMostrarCarrito(true)}
        onMouseLeave={() => setMostrarCarrito(false)}
      >
        <img src="/img/cart.png" alt="Carrito" className="img-carrito" />
        {mostrarCarrito && (
          <div className="contenido">
            <Carrito
              carrito={carrito}
              eliminarCurso={eliminarCurso}
              vaciarCarrito={vaciarCarrito}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

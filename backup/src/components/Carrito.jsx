import React from "react";
import { useNavigate } from "react-router-dom";

const Carrito = ({ carrito, eliminarCurso, vaciarCarrito }) => {
  return (
    <div className="carrito">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((curso) => (
            <tr key={curso.id}>
              <td>
                <img src={curso.imagen} alt={curso.titulo} width="100" />
              </td>
              <td>{curso.titulo}</td>
              <td>{curso.precio}</td>
              <td>{curso.cantidad}</td>
              <td>
                <a
                  href="#"
                  className="borrar-curso"
                  onClick={(e) => {
                    e.preventDefault();
                    eliminarCurso(curso.id);
                  }}
                >
                  X
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="acciones">
        <button
          className="boton"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Ir al Checkout
        </button>
        <button
          className="boton"
          onClick={() => {
            vaciarCarrito();
          }}
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default Carrito;

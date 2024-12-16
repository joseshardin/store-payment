import React from "react";

const Curso = ({ curso, agregarCurso }) => {
  const precioConDescuento = curso.precio * 0.8;
  return (
    <div className="curso">
      <img className="imagen-curso" src={curso.imagen} alt={curso.titulo} />
      <div className="info-curso">
        <h4>{curso.titulo}</h4>
        <p>Juan Pedro</p>
        <img src="/img/estrellas.png" alt="Estrellas" />
        <div className="precio">
          <p className="regular">${precioConDescuento.toFixed(2)}</p>
          <p className="oferta">{curso.precio}</p>
        </div>
        <a
          href="#"
          className="boton agregar-carrito"
          onClick={(e) => {
            e.preventDefault();
            agregarCurso(curso); // Llama a la función para agregar el curso al carrito
          }}
        >
          Agregar Al Carrito
        </a>
      </div>
    </div>
  );
};

export default Curso;

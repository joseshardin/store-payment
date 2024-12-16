import React from "react";
import Curso from "./Curso";

const cursosData = [
  {
    id: 1,
    imagen: "/img/curso1.jpg",
    titulo: "HTML5, CSS3, JavaScript para Principiantes",
    precio: "15",
  },
  {
    id: 2,
    imagen: "/img/curso2.jpg",
    titulo: "Curso de Comida Vegetariana",
    precio: "25",
  },
  {
    id: 3,
    imagen: "/img/curso3.jpg",
    titulo: "Guitarra para Principiantes",
    precio: "15",
  },
  {
    id: 4,
    imagen: "/img/curso4.jpg",
    titulo: "Huerto en tu casa",
    precio: "15",
  },
  {
    id: 5,
    imagen: "/img/curso5.jpg",
    titulo: "Decoración con productos de tu hogar",
    precio: "15",
  },
  {
    id: 6,
    imagen: "/img/curso1.jpg",
    titulo: "Diseño Web para Principiantes",
    precio: "15",
  },
  {
    id: 7,
    imagen: "/img/curso2.jpg",
    titulo: "Comida Mexicana para principiantes",
    precio: "15",
  },
  {
    id: 8,
    imagen: "/img/curso3.jpg",
    titulo: "Estudio Musical en tu casa",
    precio: "15",
  },
  {
    id: 9,
    imagen: "/img/curso4.jpg",
    titulo: "Cosecha tus propias frutas y verduras",
    precio: "15",
  },
  {
    id: 10,
    imagen: "/img/curso5.jpg",
    titulo: "Prepara galletas caseras",
    precio: "15",
  },
  {
    id: 11,
    imagen: "/img/curso1.jpg",
    titulo: "JavaScript Moderno con ES6",
    precio: "15",
  },
  {
    id: 12,
    imagen: "/img/curso2.jpg",
    titulo: "100 Recetas de Comida Natural",
    precio: "15",
  },
];

const Cursos = ({ agregarCurso }) => {
  return (
    <div className="cursos contenedor">
      {cursosData.map((curso) => (
        <Curso key={curso.id} curso={curso} agregarCurso={agregarCurso} />
      ))}
    </div>
  );
};

export default Cursos;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Barra from "./components/Barra";
import Cursos from "./components/Cursos";
import Footer from "./components/Footer";
import CheckoutPage from "./components/CheckoutPage";
import {
  getCarrito,
  agregarCursoAlCarrito,
  vaciarCarrito,
} from "./components/api";
import "./assets/styles.css";

const App = () => {
  const [carrito, setCarrito] = useState([]);

  // Cargar el carrito desde el backend al iniciar la aplicación
  useEffect(() => {
    const cargarCarrito = async () => {
      const carritoDesdeBackend = await getCarrito();
      setCarrito(carritoDesdeBackend);
    };
    cargarCarrito();
  }, []);

  const agregarCurso = async (curso) => {
    try {
      console.log("Agregando curso:", curso); // Log para ver el curso que se está agregando
      const resultado = await agregarCursoAlCarrito(curso);
      console.log("Resultado del backend:", resultado); // Log para ver la respuesta del backend
      setCarrito(resultado.carrito || resultado);
    } catch (error) {
      console.error("Error al agregar curso:", error);
    }
  };

  const eliminarCurso = (id) => {
    const nuevosCursos = carrito.filter((item) => item.id !== id);
    setCarrito(nuevosCursos);
  };

  const vaciarCarritoCompleto = async () => {
    await vaciarCarrito();
    setCarrito([]);
  };

  return (
    <Router>
      <div>
        <Header
          carrito={carrito}
          eliminarCurso={eliminarCurso}
          vaciarCarrito={vaciarCarritoCompleto}
        />
        <Hero />
        <Barra />
        <Routes>
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                carrito={carrito}
                vaciarCarrito={vaciarCarritoCompleto}
              />
            }
          />
          <Route path="/" element={<Cursos agregarCurso={agregarCurso} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

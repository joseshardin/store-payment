const Hero = () => {
  return (
    <div className="hero">
      <div className="contenido-hero contenedor">
        <h2>Aprende algo nuevo</h2>
        <p>Todos los cursos a $15</p>
        <form action="#" id="busqueda" method="post" className="formulario">
          <input
            type="text"
            placeholder="¿Qué te gustaría Aprender?"
            id="buscador"
          />
          <input
            type="submit"
            id="submit-buscador"
            className="submit-buscador"
          />
        </form>
      </div>
    </div>
  );
};

export default Hero;

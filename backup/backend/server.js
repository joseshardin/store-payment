const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3001;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Simulación de persistencia de datos (carrito de compras)
let carrito = [];

// Endpoint para manejar solicitudes OPTIONS
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Endpoint para obtener el carrito actual
app.get("/carrito", (req, res) => {
  res.json(carrito);
});

// Endpoint para agregar un curso al carrito
app.post("/carrito", (req, res) => {
  const curso = req.body;
  console.log("Curso recibido en el backend:", curso); // Log para ver el curso recibido
  const existe = carrito.find((item) => item.id === curso.id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...curso, cantidad: 1 });
  }
  console.log("Carrito actualizado en el backend:", carrito); // Log para ver el carrito actualizado
  res.json({ message: "Curso agregado al carrito", carrito });
});

// Endpoint para vaciar el carrito
app.delete("/carrito", (req, res) => {
  carrito = [];
  res.json({ message: "Carrito vaciado", carrito });
});

// Endpoint para crear una sesión de pago
app.post("/checkout/sessions", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.y.uno/v1/checkout/sessions",
      {
        amount: carrito.reduce(
          (acc, curso) => acc + parseFloat(curso.precio) * curso.cantidad,
          0
        ), // Monto total del carrito
        currency: "USD", // Moneda
        country_code: "FR", // Código del país
        // Otros datos necesarios
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.YUNO_API_KEY}`, // Tu clave de API de Yuno
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al crear la sesión de pago:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error al crear la sesión de pago" });
  }
});

// Endpoint para crear un pago
app.post("/payments", async (req, res) => {
  const { oneTimeToken, checkoutSession } = req.body;

  try {
    const response = await axios.post(
      "https://api.y.uno/v1/payments",
      {
        checkout_session: checkoutSession,
        payment_method: {
          token: oneTimeToken,
        },
        // Otros datos necesarios
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.YUNO_API_KEY}`, // Tu clave de API de Yuno
        },
      }
    );

    // Vaciar el carrito después de un pago exitoso
    carrito = [];

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al crear el pago:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error al crear el pago" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});

// Endpoint para eliminar un curso específico del carrito
app.delete("/carrito/:id", (req, res) => {
  const id = parseInt(req.params.id);
  carrito = carrito.filter((item) => item.id !== id);
  res.json(carrito);
});

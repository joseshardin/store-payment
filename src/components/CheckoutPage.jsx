import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YunoSDK from "../YunoSDK";
import { getCheckoutSession, createPayment } from "./api";

const CheckoutPage = ({ carrito, vaciarCarrito }) => {
  const [checkoutSession, setCheckoutSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener la sesión de pago de Yuno desde tu backend
    const fetchCheckoutSession = async () => {
      try {
        const session = await getCheckoutSession();
        setCheckoutSession(session.checkout_session); // Asegúrate de que el checkout_session esté en la respuesta
      } catch (error) {
        console.error("Error al obtener la sesión de pago:", error);
      }
    };

    fetchCheckoutSession();
  }, []);

  const handlePaymentCreated = async (oneTimeToken) => {
    try {
      // Crear el pago en Yuno
      await createPayment({ oneTimeToken, checkoutSession });
      alert("Pago creado exitosamente");
      vaciarCarrito(); // Vaciar el carrito después de un pago exitoso
      navigate("/"); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error("Error al crear el pago:", error);
      alert("Hubo un error al procesar el pago");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Resumen de Compra</h1>
      <div className="resumen-carrito">
        {carrito.map((curso) => (
          <div key={curso.id} className="curso-resumen">
            <img src={curso.imagen} alt={curso.titulo} width="100" />
            <h4>{curso.titulo}</h4>
            <p>Precio: {curso.precio}</p>
            <p>Cantidad: {curso.cantidad}</p>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>
          Total: $
          {carrito.reduce(
            (acc, curso) => acc + parseFloat(curso.precio) * curso.cantidad,
            0
          )}
        </h3>
      </div>
      <div className="yuno-checkout">
        {checkoutSession && (
          <YunoSDK
            checkoutSession={checkoutSession}
            onPaymentCreated={handlePaymentCreated}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

import  { useEffect } from "react";

const YunoSDK = ({ checkoutSession, onPaymentCreated }) => {
  useEffect(() => {
    // Inicializar el SDK de Yuno
    const yuno = Yuno.initialize("TU_PUBLIC_API_KEY");

    // Configurar el proceso de pago
    yuno.startCheckout({
      checkoutSession: checkoutSession,
      country_code: "FR", // Código del país
      language: "es", // Idioma
      showLoading: true, // Mostrar spinner de carga
      issuersFormEnable: true, // Habilitar formulario de emisores
      showPaymentStatus: true, // Mostrar estado de pago
      onLoading: (args) => {
        console.log("Cargando...", args);
      },
      async yunoCreatePayment(oneTimeToken) {
        // Llamada a tu backend para crear el pago
        await onPaymentCreated(oneTimeToken);
        yuno.continuePayment({ showPaymentStatus: true });
      },
    });

    // Montar el SDK en el DOM
    yuno.mountCheckout();

    // Limpieza al desmontar el componente
    return () => {
      yuno.destroy();
    };
  }, [checkoutSession, onPaymentCreated]);

  return <div id="yuno-checkout"></div>;
};

export default YunoSDK;

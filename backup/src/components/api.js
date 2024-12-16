// URL base del backend
const API_BASE_URL = "http://localhost:3001"; // Ajusta según tu configuración

// Obtener el carrito actual
export async function getCarrito() {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
}

// Agregar un curso al carrito
export async function agregarCursoAlCarrito(curso) {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curso),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar el curso al carrito:", error);
    throw error;
  }
}

// Vaciar el carrito
export async function vaciarCarrito() {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    throw error;
  }
}

// Obtener la sesión de pago
export async function getCheckoutSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/checkout/sessions`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la sesión de pago:", error);
    throw error;
  }
}

// Crear un pago
export async function createPayment(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
}

// Eliminar un curso específico del carrito
export async function eliminarCursoDelCarrito(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el curso del carrito:", error);
    throw error;
  }
}

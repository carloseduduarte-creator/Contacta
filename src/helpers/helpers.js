// Funciones generales del proyecto

export const CATEGORIES = ['Familia', 'Amigos', 'Trabajo'];

// Validar que el correo tenga un formato básico
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validar que el teléfono solo tenga números y algunos símbolos
export const isValidPhone = (phone) => {
  const regex = /^[0-9+\-\s()]{7,15}$/;
  return regex.test(phone);
};

// Ordenar contactos por nombre
export const sortByName = (contacts) => {
  return [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
  );
};

// Obtener el nombre de un contacto por id
export const getContactNameById = (contacts, id) => {
  const found = contacts.find((contact) => contact.id === id);
  return found ? found.name : 'Desconocido';
};

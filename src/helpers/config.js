// Si no hay claves de Firebase, usamos modo local para probar
export const isLocalMode =
  import.meta.env.VITE_USE_LOCAL === 'true' ||
  !import.meta.env.VITE_FIREBASE_API_KEY ||
  !import.meta.env.VITE_FIREBASE_PROJECT_ID;

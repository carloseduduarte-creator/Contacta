import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';

// Hook personalizado para acceder al contexto de contactos
export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts debe usarse dentro de ContactsProvider');
  }
  return context;
};

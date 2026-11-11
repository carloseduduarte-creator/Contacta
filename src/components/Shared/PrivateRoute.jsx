import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Ruta privada: solo usuarios autenticados pueden entrar
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

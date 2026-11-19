import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import PrivateRoute from '../components/Shared/PrivateRoute';

// Rutas principales de la aplicación (públicas y privadas)
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <UserRoutes />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

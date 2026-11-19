import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Menu.module.scss';

const Menu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={styles.menu}>
      <div className={styles.brand}>
        <Link to="/">Contacta</Link>
      </div>

      <ul className={styles.links}>
        {!user && (
          <>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <Link to="/dashboard">Mis contactos</Link>
            </li>
            <li>
              <Link to="/admin">Estructuras</Link>
            </li>
            <li>
              <button type="button" className={styles.logout} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;

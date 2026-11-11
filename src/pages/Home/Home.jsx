import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Home.module.scss';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Contacta</h1>
        <p>Tu agenda de contactos personal, simple y organizada.</p>

        {user ? (
          <Link to="/dashboard" className={styles.button}>
            Ir a mis contactos
          </Link>
        ) : (
          <div className={styles.actions}>
            <Link to="/register" className={styles.button}>
              Crear cuenta
            </Link>
            <Link to="/login" className={styles.secondary}>
              Iniciar sesión
            </Link>
          </div>
        )}
      </section>

      <section className={styles.info}>
        <h2>¿Qué puedes hacer?</h2>
        <ul>
          <li>Registrar e iniciar sesión de forma segura</li>
          <li>Crear, editar y eliminar tus contactos</li>
          <li>Buscar contactos por nombre</li>
          <li>Clasificarlos en Familia, Amigos y Trabajo</li>
          <li>Ver relaciones entre contactos</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;

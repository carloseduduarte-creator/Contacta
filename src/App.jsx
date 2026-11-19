import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContactsProvider } from './context/ContactsContext';
import Menu from './components/Shared/Menu';
import AppRoutes from './routes/AppRoutes';
import { isLocalMode } from './helpers/config';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContactsProvider>
          <div className="app">
            <Menu />
            {isLocalMode && (
              <div className="local-banner">
                Modo local activo: los datos se guardan en este navegador (sin Firebase).
              </div>
            )}
            <main>
              <AppRoutes />
            </main>
          </div>
        </ContactsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useContacts } from '../../hooks/useContacts';
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    contacts,
    loading,
    recentQueue,
    categoryCounts,
    searchResults,
    searchByName,
    clearSearch,
    getByCategory,
    addContact,
    editContact,
    removeContact,
  } = useContacts();

  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('Todos');
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    searchByName(text);
  };

  const handleClearSearch = () => {
    setSearchText('');
    clearSearch();
  };

  const handleAdd = async (formData) => {
    await addContact(formData);
    setMessage('Contacto agregado correctamente.');
  };

  const handleEdit = async (formData) => {
    await editContact(editing.id, formData);
    setEditing(null);
    setMessage('Contacto actualizado correctamente.');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar este contacto?');
    if (!confirmDelete) return;
    await removeContact(id);
    setMessage('Contacto eliminado.');
  };

  // Decidir qué lista mostrar
  let visibleContacts = contacts;

  if (searchResults !== null) {
    visibleContacts = searchResults;
  } else if (category !== 'Todos') {
    visibleContacts = getByCategory(category);
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2>Hola, {user?.displayName || 'usuario'}</h2>
        <p>Administra tus contactos personales</p>
      </header>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ContactForm
            onSubmit={editing ? handleEdit : handleAdd}
            initialData={editing}
            contacts={contacts}
            onCancel={editing ? () => setEditing(null) : null}
          />

          <div className={styles.recent}>
            <h3>Recientes (Cola)</h3>
            {recentQueue.length === 0 ? (
              <p>Aún no hay contactos recientes.</p>
            ) : (
              <ul>
                {recentQueue.map((contact) => (
                  <li key={contact.id}>{contact.name}</li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <section className={styles.main}>
          <SearchBar
            value={searchText}
            onChange={handleSearch}
            onClear={handleClearSearch}
          />

          <CategoryFilter
            selected={category}
            onSelect={setCategory}
            counts={categoryCounts}
          />

          {loading ? (
            <p>Cargando contactos...</p>
          ) : (
            <ContactList
              contacts={visibleContacts}
              allContacts={contacts}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

import { useContacts } from '../../hooks/useContacts';
import { getContactNameById } from '../../helpers/helpers';
import styles from './Admin.module.scss';

// Panel para visualizar las estructuras de datos en acción
const Admin = () => {
  const { contacts, recentQueue, categoryCounts, treeView, graphEdges } = useContacts();

  return (
    <div className={styles.admin}>
      <h2>Panel de estructuras de datos</h2>
      <p>
        Esta página muestra cómo se usan las cinco estructuras en Contacta.
      </p>

      <section className={styles.section}>
        <h3>1. Lista enlazada</h3>
        <p>Almacena y recorre todos los contactos del usuario.</p>
        <p>
          <strong>Total de contactos:</strong> {contacts.length}
        </p>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} — {contact.category}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3>2. Cola (FIFO)</h3>
        <p>Muestra los contactos agregados recientemente (máximo 5).</p>
        <ul>
          {recentQueue.map((contact) => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3>3. Árbol n-ario</h3>
        <p>Organiza los contactos por categorías Familia, Amigos y Trabajo.</p>
        <p>
          Familia: {categoryCounts.Familia || 0} | Amigos:{' '}
          {categoryCounts.Amigos || 0} | Trabajo: {categoryCounts.Trabajo || 0}
        </p>
        <ul className={styles.tree}>
          {treeView.map((node, index) => (
            <li key={`${node.name}-${index}`} style={{ marginLeft: `${node.level * 20}px` }}>
              {node.name}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3>4. Trie</h3>
        <p>
          Se usa en el buscador del Dashboard para encontrar contactos por
          prefijo del nombre.
        </p>
      </section>

      <section className={styles.section}>
        <h3>5. Grafo</h3>
        <p>Representa las relaciones entre contactos.</p>
        {graphEdges.length === 0 ? (
          <p>No hay relaciones registradas todavía.</p>
        ) : (
          <ul>
            {graphEdges.map((edge, index) => (
              <li key={index}>
                {getContactNameById(contacts, edge.from)} ↔{' '}
                {getContactNameById(contacts, edge.to)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Admin;

import { getContactNameById } from '../helpers/helpers';
import styles from './ContactCard.module.scss';

const ContactCard = ({ contact, contacts, onEdit, onDelete }) => {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h4>{contact.name}</h4>
        <span className={styles.category}>{contact.category}</span>
      </div>

      <p>
        <strong>Teléfono:</strong> {contact.phone}
      </p>
      <p>
        <strong>Correo:</strong> {contact.email}
      </p>

      {contact.description && (
        <p>
          <strong>Descripción:</strong> {contact.description}
        </p>
      )}

      {contact.relations && contact.relations.length > 0 && (
        <p>
          <strong>Relaciones:</strong>{' '}
          {contact.relations
            .map((id) => getContactNameById(contacts, id))
            .join(', ')}
        </p>
      )}

      <div className={styles.actions}>
        <button type="button" onClick={() => onEdit(contact)}>
          Editar
        </button>
        <button
          type="button"
          className={styles.delete}
          onClick={() => onDelete(contact.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default ContactCard;

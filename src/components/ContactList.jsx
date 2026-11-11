import ContactCard from './ContactCard';
import styles from './ContactList.module.scss';

const ContactList = ({ contacts, allContacts, onEdit, onDelete }) => {
  if (!contacts || contacts.length === 0) {
    return <p className={styles.empty}>No hay contactos para mostrar.</p>;
  }

  return (
    <div className={styles.list}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          contacts={allContacts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;

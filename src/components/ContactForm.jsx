import { useEffect, useState } from 'react';
import { CATEGORIES, isValidEmail, isValidPhone } from '../helpers/helpers';
import styles from './ContactForm.module.scss';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  category: 'Amigos',
  description: '',
  relations: [],
};

const ContactForm = ({ onSubmit, initialData = null, contacts = [], onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        category: initialData.category || 'Amigos',
        description: initialData.description || '',
        relations: initialData.relations || [],
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRelationChange = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    if (!form.relations.includes(selectedId)) {
      setForm({ ...form, relations: [...form.relations, selectedId] });
    }
  };

  const removeRelation = (id) => {
    setForm({
      ...form,
      relations: form.relations.filter((relationId) => relationId !== id),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Nombre, teléfono y correo son obligatorios.');
      return;
    }

    if (!isValidEmail(form.email)) {
      setError('El correo no es válido.');
      return;
    }

    if (!isValidPhone(form.phone)) {
      setError('El teléfono no es válido.');
      return;
    }

    await onSubmit(form);
    if (!initialData) {
      setForm(emptyForm);
    }
  };

  const otherContacts = contacts.filter(
    (contact) => !initialData || contact.id !== initialData.id
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{initialData ? 'Editar contacto' : 'Nuevo contacto'}</h3>

      {error && <p className={styles.error}>{error}</p>}

      <label>
        Nombre completo
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ej: Ana Pérez"
        />
      </label>

      <label>
        Teléfono
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Ej: 3001234567"
        />
      </label>

      <label>
        Correo electrónico
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Ej: ana@correo.com"
        />
      </label>

      <label>
        Categoría
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Descripción (opcional)
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          placeholder="Notas sobre el contacto"
        />
      </label>

      <label>
        Relacionar con otro contacto (grafo)
        <select value="" onChange={handleRelationChange}>
          <option value="">Seleccionar contacto...</option>
          {otherContacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
        </select>
      </label>

      {form.relations.length > 0 && (
        <ul className={styles.relations}>
          {form.relations.map((id) => {
            const related = contacts.find((contact) => contact.id === id);
            return (
              <li key={id}>
                {related ? related.name : id}
                <button type="button" onClick={() => removeRelation(id)}>
                  Quitar
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.primary}>
          {initialData ? 'Guardar cambios' : 'Agregar contacto'}
        </button>
        {onCancel && (
          <button type="button" className={styles.secondary} onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;

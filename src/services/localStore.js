// Almacenamiento local para probar la app sin Firebase

const USERS_KEY = 'contacta_users';
const SESSION_KEY = 'contacta_session';
const CONTACTS_KEY = 'contacta_contacts';

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const localRegister = async (name, email, password) => {
  const users = read(USERS_KEY, []);
  const exists = users.find((user) => user.email === email.toLowerCase());

  if (exists) {
    throw new Error('El correo ya está registrado');
  }

  const user = {
    uid: `local-${Date.now()}`,
    displayName: name,
    email: email.toLowerCase(),
    password,
  };

  users.push(user);
  write(USERS_KEY, users);

  const session = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
  };
  write(SESSION_KEY, session);
  return session;
};

export const localLogin = async (email, password) => {
  const users = read(USERS_KEY, []);
  const user = users.find(
    (item) => item.email === email.toLowerCase() && item.password === password
  );

  if (!user) {
    throw new Error('Correo o contraseña incorrectos');
  }

  const session = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
  };
  write(SESSION_KEY, session);
  return session;
};

export const localLogout = async () => {
  localStorage.removeItem(SESSION_KEY);
};

export const localGetSession = () => read(SESSION_KEY, null);

export const localSubscribeContacts = (userId, callback) => {
  const emit = () => {
    const all = read(CONTACTS_KEY, []);
    const contacts = all.filter((contact) => contact.userId === userId);
    callback(contacts);
  };

  emit();
  window.addEventListener('storage', emit);
  window.addEventListener('contacta-local-update', emit);

  return () => {
    window.removeEventListener('storage', emit);
    window.removeEventListener('contacta-local-update', emit);
  };
};

const notify = () => {
  window.dispatchEvent(new Event('contacta-local-update'));
};

export const localCreateContact = async (userId, contactData) => {
  const all = read(CONTACTS_KEY, []);
  const id = `contact-${Date.now()}`;
  const newContact = {
    id,
    ...contactData,
    userId,
    relations: contactData.relations || [],
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
  };

  all.push(newContact);
  write(CONTACTS_KEY, all);
  notify();
  return id;
};

export const localUpdateContact = async (contactId, contactData) => {
  const all = read(CONTACTS_KEY, []);
  const index = all.findIndex((contact) => contact.id === contactId);

  if (index === -1) return;

  all[index] = {
    ...all[index],
    ...contactData,
    updatedAt: { seconds: Math.floor(Date.now() / 1000) },
  };

  write(CONTACTS_KEY, all);
  notify();
};

export const localDeleteContact = async (contactId) => {
  const all = read(CONTACTS_KEY, []);
  const filtered = all.filter((contact) => contact.id !== contactId);
  write(CONTACTS_KEY, filtered);
  notify();
};

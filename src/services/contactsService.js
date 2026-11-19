import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { isLocalMode } from '../helpers/config';
import {
  localCreateContact,
  localDeleteContact,
  localSubscribeContacts,
  localUpdateContact,
} from './localStore';

const COLLECTION = 'contacts';

export const subscribeContacts = (userId, callback) => {
  if (isLocalMode) {
    return localSubscribeContacts(userId, callback);
  }

  const q = query(collection(db, COLLECTION), where('userId', '==', userId));

  return onSnapshot(q, (snapshot) => {
    const contacts = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    callback(contacts);
  });
};

export const createContact = async (userId, contactData) => {
  if (isLocalMode) {
    return localCreateContact(userId, contactData);
  }

  const docRef = await addDoc(collection(db, COLLECTION), {
    ...contactData,
    userId,
    relations: contactData.relations || [],
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateContact = async (contactId, contactData) => {
  if (isLocalMode) {
    return localUpdateContact(contactId, contactData);
  }

  const contactRef = doc(db, COLLECTION, contactId);
  await updateDoc(contactRef, {
    ...contactData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteContact = async (contactId) => {
  if (isLocalMode) {
    return localDeleteContact(contactId);
  }

  const contactRef = doc(db, COLLECTION, contactId);
  await deleteDoc(contactRef);
};

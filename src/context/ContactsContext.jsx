import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  subscribeContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contactsService';
import LinkedList from '../structures/LinkedList';
import Queue from '../structures/Queue';
import NaryTree from '../structures/NaryTree';
import Trie from '../structures/Trie';
import Graph from '../structures/Graph';
import { CATEGORIES } from '../helpers/helpers';

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentQueue, setRecentQueue] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [searchResults, setSearchResults] = useState(null);
  const [graphEdges, setGraphEdges] = useState([]);
  const [treeView, setTreeView] = useState([]);

  // Estructuras de datos (se reconstruyen cuando llegan datos de Firebase)
  const linkedList = new LinkedList();
  const queue = new Queue();
  const tree = new NaryTree();
  const trie = new Trie();
  const graph = new Graph();

  // Suscripción en tiempo real a Firestore
  useEffect(() => {
    if (!user) {
      setContacts([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeContacts(user.uid, (data) => {
      // 1. Lista enlazada: almacenar y recorrer contactos
      linkedList.clear();
      data.forEach((contact) => linkedList.append(contact));
      const listContacts = linkedList.toArray();
      setContacts(listContacts);

      // 2. Cola: contactos recientemente agregados (últimos 5)
      queue.clear();
      const sortedByDate = [...listContacts].sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateA - dateB;
      });
      sortedByDate.forEach((contact) => queue.enqueueLimited(contact, 5));
      setRecentQueue(queue.toArray().reverse());

      // 3. Árbol n-ario: organizar por categorías
      tree.buildFromContacts(listContacts, CATEGORIES);
      setCategoryCounts(tree.countByCategory());
      setTreeView(tree.traverse());

      // 4. Trie: búsquedas por nombre
      trie.buildFromContacts(listContacts);

      // 5. Grafo: relaciones entre contactos
      graph.buildFromContacts(listContacts);
      setGraphEdges(graph.getAllEdges());

      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Buscar con el Trie
  const searchByName = (text) => {
    if (!text.trim()) {
      setSearchResults(null);
      return;
    }

    trie.buildFromContacts(contacts);
    const results = trie.searchByPrefix(text);
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchResults(null);
  };

  // Filtrar por categoría usando el árbol
  const getByCategory = (category) => {
    tree.buildFromContacts(contacts, CATEGORIES);
    return tree.getContactsByCategory(category);
  };

  // Obtener vecinos del grafo
  const getRelations = (contactId) => {
    graph.buildFromContacts(contacts);
    return graph.getNeighbors(contactId);
  };

  const addContact = async (contactData) => {
    if (!user) return;
    await createContact(user.uid, contactData);
  };

  const editContact = async (contactId, contactData) => {
    await updateContact(contactId, contactData);
  };

  const removeContact = async (contactId) => {
    await deleteContact(contactId);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        loading,
        recentQueue,
        categoryCounts,
        searchResults,
        graphEdges,
        treeView,
        searchByName,
        clearSearch,
        getByCategory,
        getRelations,
        addContact,
        editContact,
        removeContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

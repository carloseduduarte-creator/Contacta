// Trie (árbol de prefijos) para buscar contactos por nombre.
// Aporte Carlos: búsqueda por prefijo del nombre.

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.contacts = []; // contactos que terminan en este nodo
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insertar el nombre de un contacto en el Trie
  insert(word, contact) {
    if (!word) return;

    let current = this.root;
    const normalized = word.toLowerCase().trim();

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }

    current.isEndOfWord = true;
    current.contacts.push(contact);
  }

  // Buscar contactos cuyo nombre empiece con el prefijo
  searchByPrefix(prefix) {
    if (!prefix) {
      return this.getAllContacts();
    }

    let current = this.root;
    const normalized = prefix.toLowerCase().trim();

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }

    return this._collectContacts(current);
  }

  // Recoger todos los contactos desde un nodo
  _collectContacts(node) {
    let results = [...node.contacts];

    const keys = Object.keys(node.children);
    for (let i = 0; i < keys.length; i++) {
      results = results.concat(this._collectContacts(node.children[keys[i]]));
    }

    return results;
  }

  getAllContacts() {
    return this._collectContacts(this.root);
  }

  // Reconstruir el Trie con una lista de contactos
  buildFromContacts(contacts) {
    this.root = new TrieNode();
    contacts.forEach((contact) => {
      this.insert(contact.name, contact);
    });
  }
}

export default Trie;

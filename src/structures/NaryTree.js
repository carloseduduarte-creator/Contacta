// Árbol n-ario para organizar contactos por categorías
// Raíz -> Familia / Amigos / Trabajo -> contactos

class TreeNode {
  constructor(name, data = null) {
    this.name = name;
    this.data = data;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

class NaryTree {
  constructor(rootName = 'Contactos') {
    this.root = new TreeNode(rootName);
  }

  // Crear las categorías base
  initCategories(categories) {
    categories.forEach((category) => {
      const exists = this.root.children.find((child) => child.name === category);
      if (!exists) {
        this.root.addChild(new TreeNode(category));
      }
    });
  }

  // Buscar un nodo por nombre (recorrido en profundidad)
  findNode(name, node = this.root) {
    if (node.name === name) {
      return node;
    }

    for (let i = 0; i < node.children.length; i++) {
      const found = this.findNode(name, node.children[i]);
      if (found) {
        return found;
      }
    }

    return null;
  }

  // Agregar un contacto bajo una categoría
  addContact(category, contact) {
    const categoryNode = this.findNode(category);
    if (!categoryNode) {
      return false;
    }
    categoryNode.addChild(new TreeNode(contact.name, contact));
    return true;
  }

  // Obtener todos los contactos de una categoría
  getContactsByCategory(category) {
    const categoryNode = this.findNode(category);
    if (!categoryNode) {
      return [];
    }
    return categoryNode.children
      .filter((child) => child.data !== null)
      .map((child) => child.data);
  }

  // Contar contactos por cada categoría
  countByCategory() {
    const counts = {};
    this.root.children.forEach((categoryNode) => {
      counts[categoryNode.name] = categoryNode.children.filter(
        (child) => child.data !== null
      ).length;
    });
    return counts;
  }

  // Recorrido para mostrar el árbol de forma legible
  traverse(node = this.root, level = 0) {
    const result = [
      {
        name: node.name,
        data: node.data,
        level,
      },
    ];

    node.children.forEach((child) => {
      result.push(...this.traverse(child, level + 1));
    });

    return result;
  }

  // Reconstruir el árbol desde un arreglo de contactos
  buildFromContacts(contacts, categories) {
    this.root = new TreeNode('Contactos');
    this.initCategories(categories);

    contacts.forEach((contact) => {
      this.addContact(contact.category, contact);
    });
  }
}

export default NaryTree;

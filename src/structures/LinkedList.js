// Lista enlazada simple para guardar y recorrer contactos

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Agregar un contacto al final de la lista
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.size++;
  }

  // Buscar un contacto por id
  findById(id) {
    let current = this.head;
    while (current) {
      if (current.data.id === id) {
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  // Actualizar un contacto
  update(id, newData) {
    let current = this.head;
    while (current) {
      if (current.data.id === id) {
        current.data = { ...current.data, ...newData };
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Eliminar un contacto por id
  remove(id) {
    if (!this.head) return false;

    if (this.head.data.id === id) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data.id === id) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // Convertir la lista a un arreglo para poder mostrarla en React
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Vaciar la lista
  clear() {
    this.head = null;
    this.size = 0;
  }
}

export default LinkedList;

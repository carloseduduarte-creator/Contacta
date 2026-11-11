// Cola (FIFO) para gestionar los contactos agregados recientemente

class Queue {
  constructor() {
    this.items = [];
  }

  // Agregar un contacto al final de la cola
  enqueue(item) {
    this.items.push(item);
  }

  // Sacar el contacto más antiguo de la cola
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Ver el primer elemento sin sacarlo
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  // Limitar la cola a una cantidad máxima (ej: últimos 5)
  enqueueLimited(item, maxSize = 5) {
    this.enqueue(item);
    while (this.items.length > maxSize) {
      this.dequeue();
    }
  }

  toArray() {
    return [...this.items];
  }

  clear() {
    this.items = [];
  }
}

export default Queue;

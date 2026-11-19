// Grafo no dirigido para representar relaciones entre contactos
// Se usa lista de adyacencia

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Agregar un contacto (vértice) al grafo
  addVertex(id) {
    if (!this.adjacencyList[id]) {
      this.adjacencyList[id] = [];
    }
  }

  // Crear una relación (arista) entre dos contactos
  addEdge(id1, id2) {
    this.addVertex(id1);
    this.addVertex(id2);

    if (!this.adjacencyList[id1].includes(id2)) {
      this.adjacencyList[id1].push(id2);
    }
    if (!this.adjacencyList[id2].includes(id1)) {
      this.adjacencyList[id2].push(id1);
    }
  }

  // Eliminar una relación
  removeEdge(id1, id2) {
    if (this.adjacencyList[id1]) {
      this.adjacencyList[id1] = this.adjacencyList[id1].filter((id) => id !== id2);
    }
    if (this.adjacencyList[id2]) {
      this.adjacencyList[id2] = this.adjacencyList[id2].filter((id) => id !== id1);
    }
  }

  // Eliminar un contacto y todas sus relaciones
  removeVertex(id) {
    if (!this.adjacencyList[id]) return;

    const neighbors = [...this.adjacencyList[id]];
    neighbors.forEach((neighbor) => {
      this.removeEdge(id, neighbor);
    });

    delete this.adjacencyList[id];
  }

  // Obtener los contactos relacionados con uno
  getNeighbors(id) {
    return this.adjacencyList[id] || [];
  }

  // Obtener todas las relaciones en forma de pares
  getAllEdges() {
    const edges = [];
    const visited = {};

    Object.keys(this.adjacencyList).forEach((id) => {
      this.adjacencyList[id].forEach((neighbor) => {
        const key = [id, neighbor].sort().join('-');
        if (!visited[key]) {
          visited[key] = true;
          edges.push({ from: id, to: neighbor });
        }
      });
    });

    return edges;
  }

  // Reconstruir el grafo desde contactos y sus relaciones
  buildFromContacts(contacts) {
    this.adjacencyList = {};

    contacts.forEach((contact) => {
      this.addVertex(contact.id);
    });

    contacts.forEach((contact) => {
      if (contact.relations && Array.isArray(contact.relations)) {
        contact.relations.forEach((relatedId) => {
          this.addEdge(contact.id, relatedId);
        });
      }
    });
  }
}

export default Graph;

# Documento final – Contacta

## Alcance del sistema

Contacta es una agenda de contactos web pensada para uso personal. Cada usuario puede registrarse, iniciar sesión y administrar únicamente sus propios contactos.

El sistema permite:

- Crear contactos con nombre, teléfono, correo, categoría y descripción opcional.
- Consultar, editar y eliminar contactos.
- Buscar contactos por nombre.
- Filtrar contactos por categoría (Familia, Amigos y Trabajo).
- Relacionar contactos entre sí.
- Ver en tiempo real los cambios realizados sobre los contactos.

No incluimos funcionalidades ajenas al alcance, como chat o mapas, porque el objetivo del proyecto es demostrar el uso de estructuras de datos junto con autenticación y persistencia.

## Tecnologías utilizadas

Utilizamos las tecnologías trabajadas en la asignatura:

- **React + Vite**: para construir la interfaz.
- **JavaScript**: lenguaje principal del frontend.
- **SCSS Modules**: para estilos por componente y por página.
- **React Router**: para rutas públicas y privadas.
- **Context API**: para compartir el estado de autenticación y de contactos.
- **Firebase Authentication**: para registro e inicio de sesión reales.
- **Cloud Firestore**: para guardar los contactos y sincronizarlos en tiempo real.
- **Netlify**: para publicar el frontend.

## Estructuras de datos y justificación

### 1. Lista enlazada (`src/structures/LinkedList.js`)

La usamos para almacenar y recorrer los contactos que llegan desde Firestore. Cada nodo guarda un contacto y apunta al siguiente. Esto nos permite recorrer la colección de forma secuencial antes de mostrarla en la interfaz.

### 2. Cola (`src/structures/Queue.js`)

La cola funciona con política FIFO. La empleamos para mostrar los contactos agregados recientemente. Cuando se supera el límite de 5 elementos, se elimina el más antiguo.

### 3. Árbol n-ario (`src/structures/NaryTree.js`)

Organizamos los contactos por categorías. La raíz representa “Contactos” y sus hijos son las categorías Familia, Amigos y Trabajo. Debajo de cada categoría se agregan los contactos correspondientes. Esto facilita filtrar y contar contactos por categoría.

### 4. Trie (`src/structures/Trie.js`)

El Trie organiza los nombres carácter por carácter. Lo usamos en el buscador para encontrar contactos cuyo nombre empieza con el texto escrito por el usuario.

### 5. Grafo (`src/structures/Graph.js`)

Implementamos un grafo no dirigido con lista de adyacencia. Cada contacto es un vértice y las relaciones entre contactos son aristas. Así podemos representar, por ejemplo, que dos personas se conocen o están vinculadas.

## Organización del proyecto

Seguimos la estructura solicitada en la rúbrica:

- `helpers`: funciones generales
- `context`: AuthContext y ContactsContext
- `pages`: Home, Login, Register, Dashboard y Admin
- `components`: formularios, tarjetas, filtros y menú compartido
- `hooks`: useAuth y useContacts
- `routes`: AppRoutes, UserRoutes y AdminRoutes
- `structures`: implementaciones de las estructuras de datos
- `services`: conexión con Firebase, autenticación y contactos

## Funcionalidad en tiempo real

Cuando un usuario crea, edita o elimina un contacto, Firestore notifica el cambio con `onSnapshot`. La lista se actualiza sola, sin recargar la página.

## Conclusión

Con Contacta aplicamos de forma práctica las estructuras de datos del curso dentro de una aplicación web completa, con autenticación real, base de datos y despliegue del frontend.

# Contacta – Agenda de Contactos

## Descripción

Contacta es una aplicación web que desarrollamos como proyecto final de la asignatura Estructuras de Datos II. Con ella administramos contactos personales de forma sencilla: nos registramos, iniciamos sesión y podemos crear, consultar, editar, eliminar y buscar contactos.

## Objetivo

Nuestro objetivo fue aplicar las estructuras de datos vistas en clase dentro de una plataforma web real, con autenticación, almacenamiento en base de datos y sincronización en tiempo real.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- SCSS Modules
- React Router
- Context API
- Firebase Authentication
- Cloud Firestore
- Netlify

## Estructuras de datos

Implementamos cinco estructuras de datos manualmente en JavaScript:

1. **Lista enlazada**: almacena y recorre los contactos del usuario.
2. **Cola**: gestiona los contactos agregados recientemente (FIFO).
3. **Árbol n-ario**: organiza los contactos por categorías (Familia, Amigos y Trabajo).
4. **Trie**: permite buscar contactos por prefijo del nombre.
5. **Grafo**: representa relaciones entre contactos.

La explicación de cada estructura está en el archivo `DOCUMENTO_FINAL.md`.

## Funcionalidades

- Registro e inicio de sesión con Firebase Authentication
- CRUD de contactos (crear, consultar, editar y eliminar)
- Búsqueda por nombre usando Trie
- Filtro por categoría usando árbol n-ario
- Cola de contactos recientes
- Relaciones entre contactos con grafo
- Sincronización en tiempo real con Firestore (`onSnapshot`)
- Menús públicos y privados
- Panel de estructuras de datos

## Cómo ejecutamos el proyecto

Para correr Contacta en local usamos estos pasos:

```bash
cd Contacta
npm install
```

Creamos un archivo `.env` a partir de `.env.example` con nuestras claves de Firebase. En Firebase activamos Authentication con Email/Password, creamos Firestore y publicamos las reglas del archivo `firestore.rules`.

Luego iniciamos el entorno de desarrollo:

```bash
npm run dev
```

Para producción generamos la carpeta `dist` con:

```bash
npm run build
```

Esa carpeta es la que desplegamos en Netlify.

## Propuesta gráfica

- Figma: https://www.figma.com/design/HxTegkdB3crz5PMLxl1tCP/Contacta?node-id=0-1&t=sPe1OQ9jtZz5576C-1

## Integrantes

- Carlos Eduardo Duarte ([rama](https://github.com/carloseduduarte-creator/Contacta/tree/carlos-eduardo-duarte))
- Javier Lara ([rama](https://github.com/carloseduduarte-creator/Contacta/tree/javier-lara))

## Enlaces

- Repositorio: https://github.com/carloseduduarte-creator/Contacta
- Despliegue: https://euphonious-centaur-edf9e0.netlify.app
- Backend: Firebase Authentication + Firestore (`contacta-d760b`)

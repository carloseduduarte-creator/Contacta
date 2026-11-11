# Contacta – Agenda de Contactos

## Descripción

Contacta es una aplicación web que desarrollamos como proyecto final de la asignatura Estructuras de Datos II. Nos permite administrar contactos personales de forma sencilla: registrar usuarios, iniciar sesión y crear, consultar, editar, eliminar y buscar contactos.

## Objetivo

Aplicar las estructuras de datos vistas en clase dentro de una plataforma web real, con autenticación, almacenamiento en base de datos y sincronización en tiempo real.

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

La explicación detallada de cada estructura se encuentra en el archivo `DOCUMENTO_FINAL.md`.

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

## Instrucciones de instalación y ejecución

1. Clonar el repositorio.
2. Entrar a la carpeta del proyecto:

```bash
cd Contacta
```

3. Instalar dependencias:

```bash
npm install
```

4. Crear un archivo `.env` basándose en `.env.example` y completar las claves de Firebase.
5. En Firebase Console:
   - Activar Authentication con Email/Password.
   - Crear una base de datos Firestore.
   - Pegar las reglas del archivo `firestore.rules`.
6. Ejecutar el proyecto en local:

```bash
npm run dev
```

7. Para generar la versión de producción:

```bash
npm run build
```

La carpeta `dist` se despliega en Netlify.

## Propuesta gráfica

- Propuesta gráfica local: `propuesta-grafica.html`
- Enlace a Figma / Adobe: _(pendiente de agregar)_

## Integrantes

- Carlos Eduardo Duarte
- Javier Lara

## Enlaces

- Repositorio Git: https://github.com/carloseduduarte-creator/Contacta
- Despliegue Netlify: https://euphonious-centaur-edf9e0.netlify.app
- Backend Firebase: proyecto `contacta-d760b` (Authentication + Firestore)

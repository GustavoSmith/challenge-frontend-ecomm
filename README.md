# Challenge Frontend - Ecomm

## Descripción

Este reto consiste en concretar el [diseño suministrado en Figma](https://figma.com/file/uxMi3mAnR60noH5nb2JSjf/Challenge-Frontend) para implementar una aplicación web operativa que se comunique efectivamente con una API determinada.

## ¿Cómo ejecuto este proyecto?

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Consigue un token de autenticación para la API, crea un .env basándote en el .env.example y ponlo allí.
4. Ejecuta el servidor de desarrollo con `npm run dev`.

## Requisitos Técnicos

- Emplear Web Components para los elementos de la interfaz.
- Integrar los componentes con las funciones CRUD de la API.
- Subir el código finalizado a este repositorio de GitHub.

# Documentación de la API

## Base URL

https://<admin.ecomm-app.com>

## Authentication

Todos los endpoints requieren un token de autenticación en el encabezado de la solicitud. El token debe ser proporcionado en el formato:

Authorization: Bearer

[Token]

## Endpoints

### Obtener Productos

- **URL**: /api/challenge-items
- **Method**: GET
- **Headers**:
  - Authorization: Bearer
- **URL Params**: None
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: Array de objetos con información de los artículos.
- **Error Response**:
  - **Code**: 500 INTERNAL SERVER ERROR
  - **Content**: { error : "Error message" }
- **Notes**: Este endpoint devuelve una lista de todos los artículos disponibles para retos.

### Crear Producto

- **URL**: /api/challenge-items
- **Method**: POST
- **Headers**:
  - Authorization: Bearer
  - Content-Type: application/json
- **Data Params**:
  {
  "picture": "[URL de la imagen del artículo]",
  "name": "[Nombre del artículo]",
  "description": "[Descripción del artículo]",
  "stock": [Cantidad en stock],
  "price": [Precio del artículo]
  }
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: "OK"
- **Error Response**:
  - **Code**: 500 INTERNAL SERVER ERROR
  - **Content**: { error : "Error message" }

### Actualizar Producto

- **URL**: /api/challenge-items/:id
- **Method**: PUT
- **Headers**:
  - Authorization: Bearer
  - Content-Type: application/json
- **URL Params**:
  - id=[integer]
- **Data Params**:
  {
  "picture": "[URL de la imagen del artículo]",
  "name": "[Nombre del artículo]",
  "description": "[Descripción del artículo]",
  "stock": [Cantidad en stock],
  "price": [Precio del artículo]
  }
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: "OK"
- **Error Response**:
  - **Code**: 500 INTERNAL SERVER ERROR
  - **Content**: { error : "Error message" }

### Actualización Parcial de Producto

- **URL**: /api/challenge-items/:id
- **Method**: PATCH
- **Headers**:
  - Authorization: Bearer
  - Content-Type: application/json
- **URL Params**:
  - id=[integer]
- **Data Params**: Incluir solo los campos que necesitan ser actualizados.
  {
  "stock": [Nueva cantidad en stock]
  }
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: "OK"
- **Error Response**:
  - **Code**: 500 INTERNAL SERVER ERROR
  - **Content**: { error : "Error message" }

### Eliminar Producto

- **URL**: /api/challenge-items/:id
- **Method**: DELETE
- **Headers**:
  - Authorization: Bearer
- **URL Params**:
  - id=[integer]
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: "OK"
- **Error Response**:
  - **Code**: 500 INTERNAL SERVER ERROR
  - **Content**: { error : "Error message" }

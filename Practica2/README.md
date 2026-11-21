# P2 - API REST propia con Node.js y Express

API REST de productos desarrollada con Node.js y Express. Permite listar, consultar, crear, actualizar y eliminar productos mediante respuestas JSON y códigos de estado HTTP.

## Requisitos

- Node.js 18 o superior
- npm
- Postman o Thunder Client

## Instalación

1. Abre una terminal en la carpeta del proyecto.
2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor:

```bash
npm start
```

Para iniciar en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

## Rutas de la API

| Método | Ruta | Acción | Respuesta correcta | Posibles errores |
|---|---|---|---|---|
| GET | `/api/productos` | Listar todos | 200 + arreglo | — |
| GET | `/api/productos/:id` | Consultar uno | 200 + objeto | 404 |
| POST | `/api/productos` | Crear | 201 + objeto creado | 400 |
| PUT | `/api/productos/:id` | Actualizar | 200 + objeto actualizado | 400, 404 |
| DELETE | `/api/productos/:id` | Eliminar | 204 sin contenido | 404 |

## Estructura inicial de datos

La API inicia con estos productos:

```json
[
  { "id": 1, "nombre": "Teclado", "precio": 350, "stock": 10 },
  { "id": 2, "nombre": "Mouse", "precio": 180, "stock": 25 }
]
```

## Ejemplo de petición

**Crear producto**

`POST http://localhost:3000/api/productos`

Encabezado: `Content-Type: application/json`

Cuerpo:

```json
{
  "nombre": "Monitor",
  "precio": 2500,
  "stock": 5
}
```

Respuesta esperada: código `201 Created`.

```json
{
  "id": 3,
  "nombre": "Monitor",
  "precio": 2500,
  "stock": 5
}
```

## Validaciones

- `nombre` es obligatorio y debe ser texto.
- `precio` debe ser un número mayor o igual a cero.
- `stock` debe ser un número entero mayor o igual a cero.
- Si los datos no cumplen las validaciones, la API responde con `400`.
- Si el producto solicitado no existe, responde con `404`.
- Al eliminar correctamente, responde con `204` y sin contenido.

## Pruebas con Postman

Importa el archivo `P2_Productos.postman_collection.json` en Postman. Ejecuta las ocho solicitudes de la colección en orden para obtener los códigos de estado solicitados en la práctica.

## Nota

Los productos se almacenan en memoria. Al reiniciar el servidor, los cambios realizados durante la ejecución se pierden.

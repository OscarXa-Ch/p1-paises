# P3 – API REST segura
API de productos con Node.js y Express. GET es pública; POST, PUT y DELETE requieren `x-api-key`.

## Instalación
`npm install`
Copia `.env.example` como `.env` y configura `API_KEY` y `ORIGEN_PERMITIDO`.
`npm run dev`

## Rutas
| Método | Ruta | Acción | Respuesta |
|---|---|---|---|
| GET | `/api/productos` | Listar | 200 |
| GET | `/api/productos/:id` | Consultar uno | 200/404 |
| POST | `/api/productos` | Crear | 201/400/401 |
| PUT | `/api/productos/:id` | Actualizar | 200/400/401/404 |
| DELETE | `/api/productos/:id` | Eliminar | 204/401/404 |

## Render
Runtime Node, Build Command `npm install`, Start Command `npm start`. Agrega `API_KEY` y `ORIGEN_PERMITIDO` en Environment Variables. No subas `.env`.

## GitHub Pages
Publica `p3-frontend` y habilita Settings > Pages > Deploy from a branch > main > /(root).
En `p3-frontend/app.js`, reemplaza la URL y la clave de ejemplo. Después agrega `https://TU-USUARIO.github.io` a `ORIGEN_PERMITIDO` en Render.

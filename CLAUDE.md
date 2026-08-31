# CLAUDE.md

## Proyecto
Sistema de Información Móvil basado en Georreferenciación para el Cuerpo de
Bomberos Voluntarios de Chiquimulilla, Santa Rosa (tesis UMG). Objetivo central:
reducir el tiempo de respuesta en emergencias.

## Componentes del sistema
- `backend/` — API REST (Node.js + Express + PostgreSQL).
- `app-ciudadano/` — App móvil Expo (React Native + TypeScript). Pre-Alpha
  con navegación y datos mock, sin conectar al backend real todavía.
- `app-bombero/` — App móvil Expo (React Native + TypeScript). Pre-Alpha
  con navegación y datos mock, sin conectar al backend real todavía.
- Panel web administrativo — fuera de alcance por ahora (trabajo futuro).

## Entidad central: Emergencia
Estados: reportada -> en_camino -> en_sitio -> atendiendo -> finalizada,
más 'cancelada' (estado terminal alternativo, alcanzable solo desde
'reportada'). Tiempo de respuesta = timestamp(en_sitio) - timestamp(reportada)
— métrica central de la tesis, no eliminar ni renombrar sin avisar.

## Convenciones
- TypeScript estricto en ambas apps.
- Navegación: Expo Router (file-based routing en carpeta `app/`).
- Nombrar pantallas exactamente como el inventario definido (M01-M08 para
  Ciudadano, B01-B09 para Bombero) en los comentarios de cada archivo.
- No inventar campos, pantallas ni estados que no estén en este documento
  — preguntar primero si algo no está claro.

## Convención de sesiones de trabajo
Cada bloque grande de trabajo se maneja en su propia sesión de Claude Code,
nombrada con /rename:
- backend-postgres-auth
- apps-conectar-backend
- firebase-fcm
- google-maps-sdk
- offline-sqlite

Al cerrar un bloque de trabajo importante, actualizar este archivo con un
resumen de decisiones tomadas antes de pasar al siguiente bloque.

## Estado de la base de datos
Base de datos `bomberos_chiquimulilla` migrada y verificada (6 tablas:
rol, usuario, tipo_emergencia, unidad, emergencia, asignacion). Backend
conectado vía pool.js (pg). Endpoint GET /db-health confirmado funcionando.
Migración 002 agregó 'cancelada' al CHECK constraint de emergencia.estado.

## Arquitectura del backend
Backend: `backend/server.js` (arranque) + `backend/src/app.js` (config de
Express, middlewares, rutas). Estructura por módulo (Repository Pattern):
- `src/modules/auth/` — registro, login, /me. JWT con payload
  { id_usuario, id_rol }, expiración 8h.
- `src/modules/emergencias/` — ver sección de endpoints abajo.
- `src/middleware/` — authenticate.js (y variante authenticate.optional),
  authorize.js (por rol, cachea mapeo id_rol->nombre en memoria),
  validate.js (Zod), errorHandler.js (centralizado, nunca expone stack
  trace ni errores crudos de Postgres al cliente).
- `src/utils/` — ApiError, asyncHandler, generarCodigo (formato EMG-0001,
  generado con COUNT(*)+1 dentro de transacción con reintento único —
  PENDIENTE: migrar a secuencia SQL nativa antes de producción real).

## Endpoints de emergencias
Completo: POST /emergencias, GET /emergencias/:codigo,
PATCH /emergencias/:id/estado (Bombero, state machine secuencial
estricta reportada->en_camino->en_sitio->atendiendo->finalizada),
POST /emergencias/:id/cancelar (ciudadano dueño del reporte, solo
desde estado 'reportada'). tiempo_respuesta confirmado calculándose
automáticamente vía columna GENERATED de PostgreSQL.

Todos los endpoints probados manualmente contra la base real (casos
válidos e inválidos, autorización por rol, propiedad del recurso).
Datos de prueba siempre limpiados de la base después de cada sesión.

## Próximo paso
GET /emergencias (listado para bombero/administrador). Después:
asignación de unidad/bombero (tabla asignacion, sin diseñar todavía).

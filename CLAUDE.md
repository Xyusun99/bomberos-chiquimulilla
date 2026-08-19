# CLAUDE.md

## Proyecto
Sistema de Información Móvil basado en Georreferenciación para el Cuerpo de
Bomberos Voluntarios de Chiquimulilla, Santa Rosa (tesis UMG). Objetivo central:
reducir el tiempo de respuesta en emergencias.

## Componentes del sistema
- `backend/` — API REST (Node.js + Express + PostgreSQL). Ya existe scaffold básico.
- `app-ciudadano/` — App móvil Expo (React Native + TypeScript). Por crear hoy.
- `app-bombero/` — App móvil Expo (React Native + TypeScript). Por crear hoy.
- Panel web administrativo — fuera de alcance por ahora (trabajo futuro).

## Estado del proyecto
Fase actual: Pre-Alpha (navegación + pantallas con datos simulados, SIN backend
real conectado todavía). No usar PostgreSQL, JWT, Firebase ni Google Maps real
en esta fase — solo mocks/datos de prueba.

## Entidad central: Emergencia
Estados: Reportada -> En camino -> En sitio -> Atendiendo -> Finalizada
Tiempo de respuesta = timestamp(En sitio) - timestamp(Reportada) — métrica
central de la tesis, no eliminar ni renombrar sin avisar.

## Convenciones
- TypeScript estricto en ambas apps.
- Navegación: Expo Router (file-based routing en carpeta `app/`).
- Nombrar pantallas exactamente como el inventario definido (M01-M08 para
  Ciudadano, B01-B09 para Bombero) en los comentarios de cada archivo.
- No inventar campos o pantallas que no estén en este documento — preguntar
  primero si algo no está claro.
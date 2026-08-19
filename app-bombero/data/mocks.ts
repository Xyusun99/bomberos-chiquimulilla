import type {
  Asignacion,
  Emergencia,
  Rol,
  TipoEmergencia,
  Unidad,
  Usuario,
} from '../types';

export const mockRoles: Rol[] = [
  { id_rol: 'rol-1', nombre: 'Solicitante' },
  { id_rol: 'rol-2', nombre: 'Bombero' },
  { id_rol: 'rol-3', nombre: 'Administrador' },
];

export const mockUsuarios: Usuario[] = [
  {
    id_usuario: 'usr-2',
    nombre: 'Carlos Ramírez',
    correo: 'carlos.ramirez@bomberos.gt',
    telefono: '5555-6789',
    id_rol: 'rol-2',
  },
];

export const mockUnidades: Unidad[] = [
  {
    id_unidad: 'uni-1',
    codigo: 'B-01',
    placa: 'P-123ABC',
    tipo: 'Camión cisterna',
    estado: 'en_servicio',
  },
  {
    id_unidad: 'uni-2',
    codigo: 'B-02',
    placa: 'P-456DEF',
    tipo: 'Ambulancia',
    estado: 'disponible',
  },
];

export const mockTiposEmergencia: TipoEmergencia[] = [
  {
    id_tipo_emergencia: 'tipo-1',
    nombre: 'Incendio estructural',
    descripcion: 'Incendio en vivienda o edificación',
  },
  {
    id_tipo_emergencia: 'tipo-2',
    nombre: 'Accidente de tránsito',
    descripcion: 'Colisión vehicular con o sin heridos',
  },
  {
    id_tipo_emergencia: 'tipo-3',
    nombre: 'Emergencia médica',
    descripcion: 'Atención pre-hospitalaria',
  },
];

export const mockEmergencias: Emergencia[] = [
  {
    id_emergencia: 'em-1',
    codigo: 'EM-0001',
    id_usuario_solicitante: 'usr-1',
    id_tipo_emergencia: 'tipo-1',
    estado: 'en_camino',
    descripcion: 'Humo visible en segundo nivel de la vivienda.',
    telefono_contacto: '5555-1234',
    latitud: 14.7963,
    longitud: -89.5453,
    direccion_referencia: 'Frente al parque central, Chiquimulilla',
    fecha_reportada: '2026-08-19T10:15:00.000Z',
    fecha_en_camino: '2026-08-19T10:18:00.000Z',
  },
  {
    id_emergencia: 'em-2',
    codigo: 'EM-0002',
    id_tipo_emergencia: 'tipo-2',
    estado: 'reportada',
    descripcion: 'Colisión entre motocicleta y pickup, un herido leve.',
    telefono_contacto: '5555-9988',
    latitud: 14.7901,
    longitud: -89.5502,
    direccion_referencia: 'Salida hacia Guazacapán, km 3',
    fecha_reportada: '2026-08-19T11:02:00.000Z',
  },
  {
    id_emergencia: 'em-3',
    codigo: 'EM-0003',
    id_usuario_solicitante: 'usr-1',
    id_tipo_emergencia: 'tipo-3',
    estado: 'en_sitio',
    descripcion: 'Persona adulta mayor con dificultad respiratoria.',
    telefono_contacto: '5555-3344',
    latitud: 14.7940,
    longitud: -89.5411,
    direccion_referencia: 'Colonia Las Flores, casa 12',
    fecha_reportada: '2026-08-19T09:40:00.000Z',
    fecha_en_camino: '2026-08-19T09:42:00.000Z',
    fecha_en_sitio: '2026-08-19T09:51:00.000Z',
  },
];

export const mockAsignaciones: Asignacion[] = [
  {
    id_asignacion: 'asig-1',
    id_emergencia: 'em-1',
    id_bombero: 'usr-2',
    id_unidad: 'uni-1',
    fecha_asignacion: '2026-08-19T10:17:00.000Z',
  },
  {
    id_asignacion: 'asig-2',
    id_emergencia: 'em-3',
    id_bombero: 'usr-2',
    id_unidad: 'uni-2',
    fecha_asignacion: '2026-08-19T09:41:00.000Z',
  },
];

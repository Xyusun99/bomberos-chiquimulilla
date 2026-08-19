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
    id_usuario: 'usr-1',
    nombre: 'Ana López',
    correo: 'ana.lopez@example.com',
    telefono: '5555-1234',
    id_rol: 'rol-1',
  },
];

export const mockUnidades: Unidad[] = [
  {
    id_unidad: 'uni-1',
    codigo: 'B-01',
    placa: 'P-123ABC',
    tipo: 'Camión cisterna',
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
    estado: 'reportada',
    descripcion: 'Humo visible en segundo nivel de la vivienda.',
    telefono_contacto: '5555-1234',
    latitud: 14.7963,
    longitud: -89.5453,
    direccion_referencia: 'Frente al parque central, Chiquimulilla',
    fecha_reportada: '2026-08-19T10:15:00.000Z',
  },
];

export const mockAsignaciones: Asignacion[] = [
  {
    id_asignacion: 'asig-1',
    id_emergencia: 'em-1',
    id_bombero: 'usr-1',
    id_unidad: 'uni-1',
    fecha_asignacion: '2026-08-19T10:17:00.000Z',
  },
];

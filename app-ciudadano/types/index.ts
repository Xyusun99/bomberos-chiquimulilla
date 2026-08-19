export type EstadoEmergencia =
  | 'reportada'
  | 'en_camino'
  | 'en_sitio'
  | 'atendiendo'
  | 'finalizada';
// Nota: NO agregar 'asignada' ni 'cancelada' — esos no son estados
// confirmados en el diagrama de estados oficial del proyecto.

export interface Rol {
  id_rol: string;
  nombre: 'Solicitante' | 'Bombero' | 'Administrador';
}

export interface Usuario {
  id_usuario: string;
  nombre: string;
  correo?: string;
  telefono?: string;
  id_rol: string;
}

export interface Unidad {
  id_unidad: string;
  codigo: string;
  placa?: string;
  tipo: string;
  estado: 'disponible' | 'en_servicio' | 'fuera_de_servicio';
}

export interface TipoEmergencia {
  id_tipo_emergencia: string;
  nombre: string;
  descripcion?: string;
}

export interface Emergencia {
  id_emergencia: string;
  codigo: string;
  id_usuario_solicitante?: string; // null si el reporte es anónimo
  id_tipo_emergencia: string;
  estado: EstadoEmergencia;
  descripcion: string;
  telefono_contacto?: string;
  latitud: number;
  longitud: number;
  direccion_referencia?: string;
  foto_url?: string;
  fecha_reportada: string;
  fecha_en_camino?: string;
  fecha_en_sitio?: string;
  fecha_atendiendo?: string;
  fecha_finalizada?: string;
  tiempo_respuesta?: string; // calculado: fecha_en_sitio - fecha_reportada
}

export interface Asignacion {
  id_asignacion: string;
  id_emergencia: string;
  id_bombero: string;
  id_unidad: string;
  fecha_asignacion: string;
  fecha_finalizacion?: string;
}

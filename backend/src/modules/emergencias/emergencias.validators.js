const { z } = require('zod');

const crearEmergenciaSchema = z.object({
  id_tipo_emergencia: z.number().int().positive(),
  descripcion: z.string().optional(),
  telefono_contacto: z.string().optional(),
  latitud: z.number().min(-90).max(90),
  longitud: z.number().min(-180).max(180),
  direccion_referencia: z.string().optional(),
  foto_url: z.string().optional(),
});

const cambiarEstadoSchema = z.object({
  nuevo_estado: z.enum(['en_camino', 'en_sitio', 'atendiendo', 'finalizada']),
});

module.exports = { crearEmergenciaSchema, cambiarEstadoSchema };

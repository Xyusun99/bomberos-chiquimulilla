const { z } = require('zod');

const registerSchema = z.object({
  nombre: z.string().min(2),
  correo: z.string().email(),
  telefono: z.string().optional(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  correo: z.string().email(),
  password: z.string().min(1),
});

module.exports = { registerSchema, loginSchema };

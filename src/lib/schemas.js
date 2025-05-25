import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export const equipoSchema = z.object({
  nombre: z.string().min(3, 'El nombre del equipo debe tener al menos 3 caracteres'),
  formacion: z.string().default('4-4-2')
});

export const jugadorEquipoSchema = z.object({
  jugador_api_id: z.number(),
  es_capitan: z.boolean().default(false),
  es_vice_capitan: z.boolean().default(false),
  es_titular: z.boolean().default(true),
  posicion_formacion: z.number().optional()
}); 
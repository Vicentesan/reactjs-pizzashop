import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']).default('development'),
  VITE_API_URL: z.string().min(1),
  VITE_ENABLE_API_DELAY: z.string().transform((val) => val === 'true'),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data

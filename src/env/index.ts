import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url().min(1),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data

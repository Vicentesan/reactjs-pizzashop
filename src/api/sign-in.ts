import { api } from '@/lib/axios'

interface signInBody {
  email: string
}

export async function signIn({ email }: signInBody) {
  await api.post('/authenticate', { email })
}

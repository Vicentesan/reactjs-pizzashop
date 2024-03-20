import { api } from '@/lib/axios'

interface UpdateProfileData {
  name: string
  description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileData) {
  await api.put('/profile', { name, description })
}

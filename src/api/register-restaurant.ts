import { api } from '@/lib/axios'

interface registerRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: registerRestaurantBody) {
  await api.post('/restaurants', { restaurantName, managerName, email, phone })
}

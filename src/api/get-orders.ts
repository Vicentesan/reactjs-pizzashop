import { api } from '@/lib/axios'

export interface GetOrdersResponse {
  orders: {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    totalInCents: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}

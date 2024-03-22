import { api } from '@/lib/axios'

interface GetOrderParams {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

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

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrderParams) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })

  return response.data
}

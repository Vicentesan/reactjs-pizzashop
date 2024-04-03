import { http, HttpResponse } from 'msw'

import { OrdersStatusType } from '@/components/OrdersStatus'

import { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']

const statuses: OrdersStatusType[] = [
  'pending',
  'processing',
  'canceled',
  'delivered',
  'delivering',
]

export const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    id: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    totalInCents: 2400,
    status: statuses[i % 5],
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  ({ request }) => {
    const url = new URL(request.url)

    const pageIndex = url.searchParams.get('pageIndex')
      ? Number(url.searchParams.get('pageIndex'))
      : 0
    const customerName = url.searchParams.get('customerName')
    const orderId = url.searchParams.get('orderId')
    const status = url.searchParams.get('status')

    let filteredOrders = orders

    if (customerName)
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )

    if (orderId)
      filteredOrders = filteredOrders.filter((order) =>
        order.id.includes(orderId),
      )

    if (status)
      filteredOrders = filteredOrders.filter((order) => order.status === status)

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)

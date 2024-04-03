import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'
import { orders } from './get-orders-mock'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  const order = orders.find((order) => order.id === params.orderId)

  if (!order) return HttpResponse.json(null, { status: 404 })

  return HttpResponse.json({
    id: order.id,
    customer: {
      name: order.customerName,
      email: 'Não identificado',
      phone: 'Não identificado',
    },
    status: order.status,
    createdAt: order.createdAt,
    totalInCents: order.totalInCents,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza Pepperoni',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        product: {
          name: 'Pizza Marguerita',
        },
        quantity: 2,
      },
    ],
  })
})

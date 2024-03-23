import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder as approveOrderFn } from '@/api/approve-order'
import { cancelOrder as cancelOrderFn } from '@/api/cancel-order'
import { deliverOrder as deliverOrderFn } from '@/api/deliver-order'
import { dispatchOrder as dispatchOrderFn } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'

import { OrderDetails } from './OrderDetails'
import type { OrdersStatusType } from './OrdersStatus'
import { OrdersStatus } from './OrdersStatus'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import { TableCell, TableRow } from './ui/table'

interface OrdersTableRowProps {
  order: {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    totalInCents: number
  }
}

export function OrdersTableRow({ order }: OrdersTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrdersStatusType) {
    const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['get-orders'],
    })

    ordersListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              status,
            }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrder, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrderFn,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrder, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrderFn,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrder, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrderFn,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrder, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrderFn,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  const orderTotal = order.totalInCents / 100

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="size-3" />
                <span className="sr-only">Detalhes do Pedido</span>
              </Button>
            </DialogTrigger>

            <OrderDetails
              isOpened={isDetailsOpen}
              orderId={order.id}
              orderTotal={orderTotal}
            />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.id}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
        <TableCell>
          <OrdersStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell>
          {orderTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell>
          {order.status === 'pending' && (
            <Button
              onClick={() => approveOrder({ orderId: order.id })}
              disabled={isApprovingOrder}
              variant="outline"
            >
              <ArrowRight className="mr-2 size-3" />
              Aprovar
            </Button>
          )}

          {order.status === 'processing' && (
            <Button
              onClick={() => dispatchOrder({ orderId: order.id })}
              disabled={isDispatchingOrder}
              variant="outline"
            >
              <ArrowRight className="mr-2 size-3" />
              Em Entrega
            </Button>
          )}

          {order.status === 'delivering' && (
            <Button
              onClick={() => deliverOrder({ orderId: order.id })}
              disabled={isDeliveringOrder}
              variant="outline"
            >
              <ArrowRight className="mr-2 size-3" />
              Entregar
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            onClick={() => cancelOrder({ orderId: order.id })}
            disabled={
              !['pending', 'processing'].includes(order.status) ||
              isCancellingOrder
            }
            variant="ghost"
          >
            <X className="mr-2 size-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}

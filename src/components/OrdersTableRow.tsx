import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'

import { OrderDetails } from './OrderDetails'
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
  const orderTotal = order.totalInCents / 100

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="size-3" />
                <span className="sr-only">Detalhes do Pedido</span>
              </Button>
            </DialogTrigger>

            <OrderDetails />
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
          <Button variant="outline">
            <ArrowRight className="mr-2 size-3" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost">
            <X className="mr-2 size-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}

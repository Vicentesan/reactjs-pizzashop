import { cn } from '@/lib/utils'

export type OrdersStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrdersStatusProps {
  status: OrdersStatusType
}

const orderStatusMap: Record<OrdersStatusType, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em Preparo',
  delivering: 'Em Entrega',
  delivered: 'Entregue',
}

export function OrdersStatus({ status }: OrdersStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('h-2 w-2 rounded-full', {
          'bg-slate-400': status === 'pending',
          'bg-amber-500': ['processing', 'delivering'].includes(status),
          'bg-emerald-500': status === 'delivered',
          'bg-rose-500': status === 'canceled',
        })}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}

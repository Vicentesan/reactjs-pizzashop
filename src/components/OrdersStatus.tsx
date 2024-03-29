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

interface OrderStatusInfo {
  value: string
  color: string
}

export const orderStatusMap: Record<OrdersStatusType, OrderStatusInfo> = {
  pending: { value: 'Pendente', color: 'bg-slate-500' },
  processing: { value: 'Em preparo', color: 'bg-amber-500' },
  delivering: { value: 'Em rota', color: 'bg-sky-500' },
  delivered: { value: 'Entregue', color: 'bg-green-500' },
  canceled: { value: 'Cancelado', color: 'bg-rose-500' },
}

export function OrdersStatus({ status }: OrdersStatusProps) {
  return (
    <div className="lex items-center gap-2 whitespace-nowrap">
      <span
        role="status"
        aria-label={orderStatusMap[status].value}
        className={cn('h-2 w-2 rounded-full', orderStatusMap[status].color)}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].value}
      </span>
    </div>
  )
}

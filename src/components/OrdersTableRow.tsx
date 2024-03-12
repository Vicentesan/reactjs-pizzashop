import { ArrowRight, Search, X } from 'lucide-react'
import {} from 'react-router-dom'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

export function OrdersTableRow() {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="outline" size="xs">
            <Search className="size-3" />
            <span className="sr-only">Detalhes do Pedido</span>
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          821e78f7asdhdf128h
        </TableCell>
        <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="font-medium text-muted-foreground">Pendente</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">Vicente Mallmann Sanchez</TableCell>
        <TableCell>R$ 149,90</TableCell>
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

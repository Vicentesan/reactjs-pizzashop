import { http, HttpResponse } from 'msw'
import { mockErrorOrderId } from 'test/utils'

import { DispatchOrderProps } from '../dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderProps, never, never>(
  '/orders/:orderId/dispatch',
  ({ params }) => {
    if (params.orderId === mockErrorOrderId)
      return HttpResponse.json(null, { status: 400 })

    return HttpResponse.json(null, { status: 204 })
  },
)

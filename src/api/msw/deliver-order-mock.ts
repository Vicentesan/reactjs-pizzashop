import { http, HttpResponse } from 'msw'

import { mockErrorOrderId } from '../../../test/utils'
import { DeliverOrderProps } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderProps, never, never>(
  '/orders/:orderId/deliver',
  ({ params }) => {
    if (params.orderId === mockErrorOrderId)
      return new HttpResponse(null, { status: 400 })

    return new HttpResponse(null, { status: 204 })
  },
)

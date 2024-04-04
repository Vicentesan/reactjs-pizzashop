import { http, HttpResponse } from 'msw'

import { mockErrorOrderId } from '../../../test/utils'
import { CancelOrderProps } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderProps, never, never>(
  '/orders/:orderId/cancel',
  ({ params }) => {
    if (params.orderId === mockErrorOrderId)
      return new HttpResponse(null, { status: 400 })

    return new HttpResponse(null, { status: 204 })
  },
)

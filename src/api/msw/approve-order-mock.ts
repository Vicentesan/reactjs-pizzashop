import { http, HttpResponse } from 'msw'

import { mockErrorOrderId } from '../../../test/utils'
import { ApproveOrderProps } from '../approve-order'

export const approveOrderMock = http.patch<ApproveOrderProps, never, never>(
  '/orders/:orderId/approve',
  ({ params }) => {
    if (params.orderId === mockErrorOrderId)
      return new HttpResponse(null, { status: 400 })

    return new HttpResponse(null, { status: 204 })
  },
)

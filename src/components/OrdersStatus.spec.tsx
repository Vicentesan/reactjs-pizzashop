import { render } from '@testing-library/react'

import { OrdersStatus, OrdersStatusType, orderStatusMap } from './OrdersStatus'

describe('Order Status', () => {
  it.each(
    Object.entries(orderStatusMap).map(([orderKey, orderInfo]) => [
      orderKey,
      orderInfo.value,
      orderInfo.color,
    ]),
  )(
    'should display the right text "%s" and have class "%s" based on order status',
    (orderKey, expectedText, expectedClass) => {
      const { getByText, getByLabelText } = render(
        <OrdersStatus status={orderKey as OrdersStatusType} />,
      )

      const statusText = getByText(expectedText)
      const spanElement = getByLabelText(expectedText)

      expect(statusText).toBeInTheDocument()
      expect(spanElement).toHaveClass(expectedClass)
    },
  )
})

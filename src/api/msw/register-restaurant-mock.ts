import { http, HttpResponse } from 'msw'

import { mockedRestaurantName } from '../../../test/utils'
import { RegisterRestaurantBody } from '../register-restaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({ request: req }) => {
    const { restaurantName } = await req.json()

    if (restaurantName === mockedRestaurantName)
      return new HttpResponse(null, { status: 200 })

    return new HttpResponse(null, { status: 400 })
  },
)

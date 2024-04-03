import { http, HttpResponse } from 'msw'
import {
  mockedManagerId,
  mockedRestaurantDescription,
  mockedRestaurantId,
  mockedRestaurantName,
} from 'test/utils'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: mockedRestaurantId,
    name: mockedRestaurantName,
    description: mockedRestaurantDescription,
    managerId: mockedManagerId,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  })
})

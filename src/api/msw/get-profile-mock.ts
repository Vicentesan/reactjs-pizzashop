import { http, HttpResponse } from 'msw'
import {
  mockedManagerEmail,
  mockedManagerId,
  mockedManagerName,
  mockedManagerPhone,
} from 'test/utils'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: mockedManagerId,
      name: mockedManagerName,
      email: mockedManagerEmail,
      phone: mockedManagerPhone,
      role: 'manager',
      createdAt: new Date().toISOString(),
      updatedAt: null,
    })
  },
)

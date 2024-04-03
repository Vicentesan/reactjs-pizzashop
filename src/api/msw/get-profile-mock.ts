import { randomUUID } from 'node:crypto'

import { http, HttpResponse } from 'msw'
import { mockedEmail, mockedName, mockedPhone } from 'test/utils'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: randomUUID(),
      name: mockedName,
      email: mockedEmail,
      phone: mockedPhone,
      role: 'manager',
      createdAt: new Date().toISOString(),
      updatedAt: null,
    })
  },
)

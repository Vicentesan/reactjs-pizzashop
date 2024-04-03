import { http, HttpResponse } from 'msw'

import { UpdateProfileData } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfileData>(
  '/profile',
  async ({ request: req }) => {
    const { name } = await req.json()

    if (name === 'Pizza Shop') return new HttpResponse(null, { status: 204 })

    return new HttpResponse(null, { status: 400 })
  },
)

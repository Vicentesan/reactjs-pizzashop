import { http, HttpResponse } from 'msw'

import { mockedEmail } from '../../../test/utils'

export const signInMock = http.post(
  '/authenticate',
  async ({ request: req }) => {
    const { email } = (await req.json()) as { email?: string | null }

    if (email === mockedEmail)
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': '@pizzashop:auth-1.0.0=sample-JWT',
        },
      })

    return new HttpResponse(null, { status: 401 })
  },
)

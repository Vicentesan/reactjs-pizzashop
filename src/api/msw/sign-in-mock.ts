import { http, HttpResponse } from 'msw'

import { mockedManagerEmail } from '../../../test/utils'
import { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request: req }) => {
    const { email } = await req.json()

    if (email === mockedManagerEmail)
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': '@pizzashop:auth-1.0.0=sample-JWT',
        },
      })

    return new HttpResponse(null, { status: 401 })
  },
)

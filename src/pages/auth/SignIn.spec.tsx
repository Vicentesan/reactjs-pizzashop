import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './SignIn'

const emailMock = 'johndoe@example.com'

describe('Sign In', () => {
  it('should set default email input value if email is present on search params', () => {
    const { getByLabelText } = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={[`/sign-in?email=${emailMock}`]}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })

    const emailInput = getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual(emailMock)
  })
})

import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLinks } from './NavLinks'

describe('Nav Links', () => {
  it('should highlight the nav link when is the current page pathname', () => {
    const { getByText } = render(
      <>
        <NavLinks to="/">Home</NavLinks>
        <NavLinks to="/about">About</NavLinks>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        ),
      },
    )

    const homeNavLink = getByText('Home')
    const aboutNavLink = getByText('About')

    expect(homeNavLink).toHaveClass('text-foreground')
    expect(aboutNavLink).toHaveClass('text-muted-foreground')
  })
})

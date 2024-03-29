import { render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import { Pagination } from './Pagination'

const pageIndex = 0
const totalCount = 200
const perPage = 10
const onPageChangeSpyFn = vi.fn()

const pages = totalCount / perPage

const user = UserEvent.setup()

describe('Pagination', () => {
  it('should display the right amount of pages and results', () => {
    const { getByText } = render(
      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        perPage={perPage}
        onPageChange={onPageChangeSpyFn}
      />,
    )

    const page = getByText(`Página ${pageIndex + 1} de ${pages}`)
    const totalResults = getByText(`Total de ${totalCount} item(s)`)

    expect(page).toBeInTheDocument()
    expect(totalResults).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const { getByRole } = render(
      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        perPage={perPage}
        onPageChange={onPageChangeSpyFn}
      />,
    )

    const nextPageButton = getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeSpyFn).toHaveBeenCalledWith(1)
  })
})

import { getPage } from 'next-page-tester'
import { screen, fireEvent } from '@testing-library/react'

import server from '../ServerMock'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Index Page', () => {
  it('should be able to add the Bitcoin cripto', async () => {
    const { render } = await getPage({ route: '/' })

    render()

    const { getByPlaceholderText, getByText, findByText } = screen

    const searchField = getByPlaceholderText('Search Cripto')
    const buttonElement = getByText('CATCH')

    fireEvent.change(searchField, { target: { value: 'btc' } })
    fireEvent.click(buttonElement)

    await findByText('Bitcoin')
  })
})

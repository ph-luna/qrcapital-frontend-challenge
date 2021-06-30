import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { criptosListMock, criptosCurrancyMock } from './mocks/criptoListMock'

const handlers = [
  rest.get('https://min-api.cryptocompare.com/data/all/coinlist', async (_req, res, ctx) => {
    const data = res(ctx.json(criptosListMock))

    return data
  }),

  rest.get('https://min-api.cryptocompare.com/data/pricemultifull', (req, res, ctx) => {
    const query = req.url.searchParams
    const fsyms = query.get('fsyms')
    const tsyms = query.get('tsyms')

    if (fsyms === 'BTC' || tsyms === 'BRL') return res(ctx.json(criptosCurrancyMock))
  })
]

const mockServerAPI = setupServer(...handlers)

export default mockServerAPI

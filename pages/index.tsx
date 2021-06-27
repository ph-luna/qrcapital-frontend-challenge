import { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import axios from 'axios'

import InputAutoComplete from '../components/InputAutoComplete'

interface IRequestCriptos {
  Response: string
  Message: string
  HasWarning: boolean
  Type: number
  RateLimit: {}
  Data: {
    [key: string]: {
      id: number
      symbol: string
      // eslint-disable-next-line camelcase
      partner_symbol: string
      // eslint-disable-next-line camelcase
      data_available_from: number
    }
  }
}

interface IHomeProps {
  criptoList: {
    id: string
    symbol: string
  }[]
}

const Home: FC<IHomeProps> = ({ criptoList }) => {
  return (
    <div>
      <Head>
        <title>Cripto Catch</title>
        <meta
          name="description"
          content="The best place to catch your favorite cripto!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-blue-300 w-full min-h-screen flex items-center flex-col p-4">
        <InputAutoComplete
          className="px-4 py-2 rounded-3xl ring-0 relative"
          placeholder="Cripto Symbol..."
          options={criptoList.map((cripto) => cripto.symbol)}
          trigger=""
        />

        <section className="bg-indigo-100 w-9/12 h-5/6"></section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<IRequestCriptos>(
    'https://min-api.cryptocompare.com/data/blockchain/list?api_key=621e5d66d41103155d4bbf818afc181fb86c66e0b093fbc284c6f074d46eb2a3'
  )
  const criptos = data.Data
  const criptoList = []

  for (const key in criptos) {
    criptoList.push({
      id: criptos[key].id,
      symbol: criptos[key].symbol
    })
  }

  return {
    props: {
      criptoList
    }
  }
}

export default Home

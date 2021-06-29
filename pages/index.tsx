import { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from 'components/Header'
import Footer from 'components/Footer'
import CriptoCard from 'components/CriptoCard'

import ICriptos from 'interfaces/ICriptos'
import ICriptosCurrency from 'interfaces/ICurrencyCriptos'
interface IHomeProps {
  criptoList: ICriptos[]
}

const Home: FC<IHomeProps> = ({ criptoList }) => {
  const [criptos, setCriptos] = useState<ICriptosCurrency[]>([])
  const [favCriptos, setFavCriptos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    async function fetchCriptosPrice(): Promise<void> {
      console.log(favCriptos)
      if (favCriptos.length <= 0) {
        setIsLoading(false)
        return
      }

      const stringSymbols = favCriptos.join(',')
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${stringSymbols}&tsyms=BRL`
      )

      if (!data.RAW) return

      const newCriptos: ICriptosCurrency[] = []

      for (const key in data.RAW) {
        const newCripto = criptoList.find((cripto) => cripto.symbol === key)

        if (!newCripto) continue

        newCriptos.push({
          ...newCripto,
          priceBRL: data.RAW[key].BRL.PRICE,
          change24: Math.round(data.RAW[key].BRL.CHANGEPCT24HOUR * 100) / 100
        })
      }

      setCriptos(newCriptos)
      setIsLoading(false)
    }

    setIsLoading(true)
    fetchCriptosPrice()
    const renew = setInterval(fetchCriptosPrice, 10000)

    return () => clearInterval(renew)
  }, [favCriptos, criptoList])

  const handleDeleteFavCripto = (criptoIndex: number) => {
    setFavCriptos((prevState) => {
      const newState = [...prevState]
      const index = newState.findIndex(
        (favCripto) => favCripto === criptos[criptoIndex].symbol
      )

      newState.splice(index, 1)

      return newState
    })

    setCriptos((prevState) => {
      const newState = [...prevState]

      newState.splice(criptoIndex, 1)

      return newState
    })
  }

  return (
    <div>
      <Head>
        <title>Cripto Catch</title>
      </Head>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />

      <Header
        criptoList={criptoList}
        isLoading={isLoading}
        setFavCriptos={setFavCriptos}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <main className="bg-indigo-50 w-full min-h-screen flex items-center flex-col justify-between">
        <div className="w-full h-36 sm:h-20" />
        <section className="bg-green-300 p-3 pb-0 my-10 w-10/12 max-w-screen-md rounded-xl shadow-xl">
          {criptos.length <= 0 ? (
            <p className="py-10 w-full text-center text-lg align-middle text-gray-600">
              No crypto catched,
              <br />
              catch a crypto by searching its name or symbol in the search bar
              above.
            </p>
          ) : (
            criptos.map((cripto, index) => {
              return (
                <CriptoCard
                  key={`_criptoCard_${index}`}
                  cripto={cripto}
                  handleDelete={() => handleDeleteFavCripto(index)}
                />
              )
            })
          )}
        </section>

        <Footer />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(
    'https://min-api.cryptocompare.com/data/all/coinlist'
  )
  const criptos = data.Data
  const criptoList = []

  for (const key in criptos) {
    criptoList.push({
      id: criptos[key].Id,
      symbol: criptos[key].Symbol,
      img: criptos[key].ImageUrl ? criptos[key].ImageUrl : null,
      name: criptos[key].CoinName
    })
  }

  return {
    props: {
      criptoList
    }
  }
}

export default Home

import { FC, useState, useRef, FormEvent, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import axios from 'axios'
import InputAutoComplete from 'react-autocomplete-input'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ICriptos {
  id: string
  symbol: string
  img: string | null
  name: string
  priceBRL: number
  change24: number
}
interface IHomeProps {
  criptoList: {
    id: string
    symbol: string
    img: string | null
    name: string
  }[]
}

const Home: FC<IHomeProps> = ({ criptoList }) => {
  const [inputValue, setInputValue] = useState('')
  const [criptos, setCriptos] = useState<ICriptos[]>([])
  const [favCriptos, setFavCriptos] = useState<string[]>([])
  const searchList = useRef(criptoList.map((cripto) => cripto.name))

  useEffect(() => {
    async function fetchCriptosPrice(): Promise<void> {
      const stringSymbols = favCriptos.join(',')
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${stringSymbols}&tsyms=BRL`
      )

      if (!data.RAW) return

      const newCriptos: ICriptos[] = []

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
    }

    fetchCriptosPrice()
    const renew = setInterval(fetchCriptosPrice, 5000)

    return () => clearInterval(renew)
  }, [favCriptos, criptoList])

  const handleAddFavCripto = (event: FormEvent) => {
    event.preventDefault()
    setFavCriptos((prevState) => {
      const newState = [...prevState]
      const value = inputValue.toLowerCase()
      const newCripto = criptoList.find(
        (cripto) => cripto.symbol.toLowerCase() === value
      )

      if (!newCripto) {
        const newCriptoByName = criptoList.find(
          (cripto) => cripto.name.toLowerCase() === value
        )

        if (!newCriptoByName) {
          toast.error('Cripto not Found.')
          return newState
        }

        newState.push(newCriptoByName.symbol)
        return newState
      }

      newState.push(newCripto.symbol)
      return newState
    })

    setInputValue('')
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

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

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />

      <main className="bg-indigo-50 w-full min-h-screen flex items-center flex-col">
        <header className="bg-gray-900 w-full flex justify-between p-4">
          <h1 className="text-gray-200 text-4xl">Cripto Catch</h1>
          <form action="" onSubmit={handleAddFavCripto}>
            <InputAutoComplete
              Component="input"
              className="px-4 py-2 rounded-3xl ring-0 relative"
              placeholder="Search Cripto"
              options={searchList.current}
              trigger=""
              value={inputValue}
              onSelect={handleInputChange}
              onChange={handleInputChange}
              passThroughEnter
              spacer=""
            />
            <button
              type="submit"
              className="px-4 py-2 mx-2 rounded-xl border-2 text-gray-100 border-green-100 bg-green-500 active:bg-green-700"
            >
              CATCH
            </button>
          </form>
        </header>

        <section className="bg-white p-2 m-2 w-10/12 max-w-screen-md rounded-xl">
          {criptos.map((cripto, index) => {
            const percentStyle =
              cripto.change24 >= 0 ? 'text-green-600' : 'text-red-600'

            return (
              <div
                key={`_cripto_tab_${index}`}
                className="flex bg-indigo-200 h-24 p-2 items-center mb-4"
              >
                <div className="pr-4 pl-2">
                  <Image
                    src={`https://www.cryptocompare.com${cripto.img}`}
                    width={60}
                    height={60}
                    alt="cripto-logo"
                  />
                </div>
                <div className="w-1/3">
                  <h2 className="text-3xl text-gray-900">{cripto.name}</h2>
                  <p className="text-gray-700">{cripto.symbol}</p>
                </div>
                <div className="w-1/4 flex flex-col items-center">
                  <p className="text-lg text-gray-900">Valor Atual:</p>
                  <p className="text-gray-700 text-xl">
                    {cripto.priceBRL?.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>
                <div className="flex-col items-center flex w-1/4">
                  <p className="text-lg text-gray-900 pr-2">Sinalização:</p>
                  <p
                    className={`text-3xl ${percentStyle}`}
                  >{`${cripto.change24}%`}</p>
                </div>
              </div>
            )
          })}
        </section>
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

import { FC, FormEvent, useRef, Dispatch, SetStateAction } from 'react'
import InputAutoComplete from 'react-autocomplete-input'
import 'react-autocomplete-input/dist/bundle.css'
import { toast } from 'react-toastify'

import ICriptos from 'interfaces/ICriptos'

interface IHeaderProps {
  isLoading: boolean
  setFavCriptos: Dispatch<SetStateAction<string[]>>
  criptoList: ICriptos[]
  inputValue: string
  setInputValue: Dispatch<string>
}

const Header: FC<IHeaderProps> = ({
  isLoading,
  setFavCriptos,
  criptoList,
  inputValue,
  setInputValue
}) => {
  const autoCompleteList = useRef(criptoList.map((cripto) => cripto.name))
  const formRef = useRef<HTMLFormElement>(null)

  const handleAddFavCripto = (eventOrValue: FormEvent | string) => {
    let value = inputValue

    if (typeof eventOrValue === 'string') value = eventOrValue.toLowerCase()
    else eventOrValue.preventDefault()

    setFavCriptos((prevState) => {
      const newState = [...prevState]

      const newCripto = criptoList.find((cripto) => {
        return cripto.symbol.toLowerCase() === value
      })

      if (!newCripto) {
        const newCriptoByName = criptoList.find(
          (cripto) => cripto.name.toLowerCase() === value
        )

        if (!newCriptoByName) {
          toast.error('Cripto not Found.', { toastId: 'notfound-warning' })
          return newState
        }

        if (
          newState.findIndex((cripto) => newCriptoByName.symbol === cripto) !==
          -1
        ) {
          toast.warn('Cripto already catched!', {
            toastId: 'already-have-warning'
          })
          return newState
        }

        newState.push(newCriptoByName.symbol)
        return newState
      }

      if (newState.findIndex((cripto) => newCripto.symbol === cripto) !== -1) {
        toast.warn('Cripto already catched!', {
          toastId: 'already-have-warning'
        })
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

  const handleSelect = (value: string) => {
    setInputValue(value)
  }

  return (
    <header className="bg-gray-900 z-50 fixed w-full h-36 sm:h-20 flex justify-center">
      <div className="h-36 w-full max-w-screen-xl py-2 flex flex-col justify-between  items-center sm:flex-row sm:h-20 sm:p-4">
        <h1 className="text-gray-200 text-2xl font-kanit sm:text-4xl">
          Cripto Catch
        </h1>
        <form
          action=""
          onSubmit={handleAddFavCripto}
          className="flex items-center flex-col sm:flex-row"
          ref={formRef}
        >
          <InputAutoComplete
            Component="input"
            className="py-1 px-3 w-64 mt-2 rounded-3xl ring-0 relative m-0 sm:px-4 sm:py-2 sm:mt-0"
            placeholder="Search Cripto"
            options={autoCompleteList.current}
            trigger=""
            value={inputValue}
            onSelect={handleSelect}
            onChange={handleInputChange}
            spacer=""
          />

          <button
            type="submit"
            className="w-24 h-10 m-2 overflow-hidden rounded-xl border-2 text-gray-100 border-green-100 bg-green-500 active:bg-green-700 disabled:bg-green-900 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <div className="loader"></div> : 'CATCH'}
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header

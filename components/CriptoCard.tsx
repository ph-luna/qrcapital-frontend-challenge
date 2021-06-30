import { FC } from 'react'
import Image from 'next/image'
import { FaTrashAlt } from 'react-icons/fa'

import ICurrancyCriptos from 'interfaces/ICurrencyCriptos'

interface ICriptoCardProps {
  handleDelete: () => void
  cripto: ICurrancyCriptos
}

const CriptoCard: FC<ICriptoCardProps> = ({ cripto, handleDelete }) => {
  const percentStyle = cripto.change24 >= 0 ? 'text-green-600' : 'text-red-600'
  const imgUrl = cripto.img
    ? `https://www.cryptocompare.com${cripto.img}`
    : '/crypto-logo-fallback.png'

  return (
    <div className="flex flex-col bg-gray-100 sm:p-2 items-center mb-4 sm:flex-row sm:h-24">
      <div className="flex items-center w-full p-2 bg-gray-300 sm:w-3/5 sm:bg-transparent">
        <div className="mr-4 sm:pl-2 w-20">
          <Image
            src={imgUrl}
            alt="cripto-logo"
            layout="responsive"
            width={1}
            height={1}
          />
        </div>
        <div className="w-full bg-red">
          <h2 className="text-lg sm:text-3xl text-gray-900">{cripto.name}</h2>
          <p className="text-gray-700">{cripto.symbol}</p>
        </div>
        <div className="flex justify-end pr-3 sm:hidden">
          <FaTrashAlt
            color="#ff0000"
            onClick={handleDelete}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex sm:flex-col items-center  justify-between w-full my-4 px-2 sm:w-1/5 sm:h-16">
        <p className=" text-lg py-2 text-gray-900 sm:p-0">Valor Atual:</p>
        <p className="text-gray-700 text-xl">
          {cripto.priceBRL?.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
      </div>
      <div className="flex-col items-center flex  my-2 sm:h-16 sm:w-1/5">
        <p className="text-lg text-gray-900 pr-2">Sinalização:</p>
        <p className={`text-3xl ${percentStyle}`}>{`${cripto.change24}%`}</p>
      </div>
      <FaTrashAlt
        color="#ff0000"
        onClick={handleDelete}
        className="cursor-pointer hidden sm:block sm:m-3"
      />
    </div>
  )
}

export default CriptoCard

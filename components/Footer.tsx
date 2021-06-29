import { FC } from 'react'
import Image from 'next/image'

const Footer: FC = () => {
  return (
    <footer className="w-full bg-gray-900 flex justify-center">
      <div className="w-full max-w-screen-xl flex flex-col-reverse justify-between items-center p-4 sm:flex-row">
        <p className="text-gray-500 text-xs my-1">
          Developed by Pedro Henrique de Luna Vieira
        </p>
        <div className="w-10/12 sm:w-3/12">
          <Image
            src="/cripto-compare-logo.svg"
            layout="responsive"
            width={276}
            height={24}
            alt="CriptoCompare Logo"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useAlerts } from '../../../lib/esm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { setAlert } = useAlerts();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => setAlert({ message: 'Hello World!', type: 'success' })}>
        Show Alert
      </button>

    </main>
  )
}

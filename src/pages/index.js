import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import LeftMenu from '@/components/left/LeftMenu'
import MainMenu from '@/components/mainMenu/MainMenu'
import useSWR from 'swr'

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data, error, isLoading } = useSWR('{ albums { name } }', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  const { users } = data

  console.log(users, data);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="App">
          <LeftMenu />
          <MainMenu />
          <div className="background">
          </div>
        </div>
      </main>
    </>
  )
}

import Footer from '@/contexts/footer'
import Header from '@/contexts/header'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { GetStaticPaths } from 'next/types'
import { parseCookies } from 'nookies'

export default function Home({ searchResults }: any) {
  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <h2>Search</h2>
      <div className={styles.productList}>
        {searchResults.map((product:any, index:any)=>{
          return (
            <a key={index} href={`../provider/${product["_id"]}`}>
              <div className={styles.productItem}>
                <img src={ product.Image }></img>
                <label>{ product.Title }</label>
              </div>
            </a>
          )
        })}
      </div>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const { search } = ctx.query

  const fetchA = await fetch('http://localhost:3000/api/products/search',
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ search: search })
  })

  const searchResults = await fetchA.json()

  return {
    searchResults
  }
}

const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: false
  }
}

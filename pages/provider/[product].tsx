import Head from 'next/head'
import { parseCookies } from 'nookies'

export default function Home({ product }: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div> { product.Title } </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const { product: productId } = ctx.query

  fetch('http://localhost:3000/api/products/countproduct',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          token,
          itemCode: productId
        })
    })

  const product = await fetch(`http://localhost:3000/api/products/${productId}`)

  if (product.status === 200) {
    return {
      product: await product.json()
    }
  }
}

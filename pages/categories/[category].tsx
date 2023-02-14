import Head from 'next/head'

export default function Home({ category }: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div> 
        {category.map((categoryItem : any, index: any) => {
          return (
            <>
              <div>{ categoryItem.Title }</div>
            </>
          )
        })}
      </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { category } = ctx.query

  const categoryProducts = await fetch(`http://localhost:3000/api/products/categories/${category}`)

  if (categoryProducts.status === 200) {
    return {
      category: await categoryProducts.json()
    }
  }
  return {}
}

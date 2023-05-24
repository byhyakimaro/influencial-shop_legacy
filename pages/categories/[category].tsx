import Head from 'next/head'
import { parseCookies } from 'nookies'
import styles from '@/styles/Home.module.css'

export default function Home({ category, User }: any) {
  
  const language = User?.user?.language ? User?.user?.language : 'en-us'
  const currency = User?.user?.currency ? User?.user?.currency : 'USD'

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h4>AS MELHORES OFERTAS</h4>
      </div>
      <div className={styles.categoryList}> 
        {category.map((categoryItem : any, index: any) => {
          return (
            <>
              <div className={styles.categoryItem}>
                <img src={  categoryItem.Image }></img>
                <label>{ categoryItem.Title }</label>
                <div className={styles.categoryPrice}>
                  <label>{(categoryItem.Price).toLocaleString(language, {style: 'currency', currency: currency})}</label>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
    
  const User = await fetch(`http://localhost:3000/api/auth/recovery/token`,
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ token: token })
  })
  const dataUser = await User.json()

  const { category } = ctx.query

  const categoryProducts = await fetch(`http://localhost:3000/api/products/categories/${category}`)

  if (categoryProducts.status === 200) {
    return {
      category: await categoryProducts.json(),
      User: dataUser
    }
  }
  return {}
}

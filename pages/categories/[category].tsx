import Head from 'next/head'
import { parseCookies } from 'nookies'
import styles from '@/styles/Home.module.css'
import Header from '@/contexts/header'

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
      <Header></Header>
      <div className={styles.containerCategory}>
        <h4>AS MELHORES OFERTAS</h4>
        <div className={styles.categoryList}> 
        {category.map((categoryItem : any, index: any) => {
          return (
            <>
              <li>
                <a href={`../provider/${categoryItem['_id']}`}>
                  <div className={styles.categoryItem}>
                    <img src={  categoryItem.Image }></img>
                    <label>{ categoryItem.Title }</label>
                    <div className={styles.categoryPrice}>
                      {categoryItem.Off ? 
                      <div>
                        <label>{categoryItem.Price.toLocaleString(language, {style: 'currency', currency: currency})} </label>
                        <label>{(categoryItem.Price-categoryItem.Price*(categoryItem.Off/100)).toLocaleString(language, {style: 'currency', currency: currency})}</label>
                      </div>:
                      <label> {(categoryItem.Price).toLocaleString(language, {style: 'currency', currency: currency})} </label>}
                      {categoryItem.Off && <h5 style={{color: "rgba(255, 71, 74, 1)"}}>- {categoryItem.Off}% OFF</h5>}
                    </div>
                  </div>
                </a>
              </li>
            </>
          )
        })}
        </div>
      </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const host: any = process.env.HOST_API_URL
    
  const User = await fetch(`${host}/api/auth/recovery/token`,
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

  const categoryProducts = await fetch(`${host}/api/products/categories/${category}`)

  if (categoryProducts.status === 200) {
    return {
      category: await categoryProducts.json(),
      User: dataUser
    }
  }
  return {}
}

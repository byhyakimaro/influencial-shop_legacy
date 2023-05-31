import Header from '@/contexts/header'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'

export default function Home({token, purchased}: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={styles.containerQueue}>
        <div className={styles.purchased}>
          <ul>
            {purchased.map((user: any, index: any)=>{
              return (
                <li key={index}>
                  <h5>{user.userItems}</h5>
                  <label>Pedidos</label>
                  <div>
                  {user.listItems.map((purchased: any, index: any) => {
                    return (
                      <li key={index}>
                        <div>
                          Numero do Pedido: {purchased.id}
                        </div>
                        <div>
                          Status: {purchased.status}
                        </div>
                      </li>
                    )
                  })}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  
  if (token) {
    
    const User = await fetch(`http://localhost:3000/api/auth/recovery/token`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ token: token })
    })
    const { user } = await User.json()

    const purchasedFetch = await fetch(`http://localhost:3000/api/admin/queuePurchased`)
    const purchased = await purchasedFetch.json()

    return {
      token: user,
      purchased: purchased
    }
  }
}

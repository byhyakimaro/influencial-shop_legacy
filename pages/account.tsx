import Head from 'next/head'
import Header from '@/contexts/header'
import Footer from '@/contexts/footer'

import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'

export default function Home({ purchased }: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <ul>
      <h3>Meus Pedidos</h3>
      { purchased.map((purchasedItem:any)=>{
        return (
          <>
            <li>
              <div className={styles.tabPurchased}>
                <div className={styles.paymentsPurchased}>
                  <div>Numero do pedido: <br></br><br></br>#{ purchasedItem.id }</div>
                  <div>Status: <br></br><br></br>{ purchasedItem.status }</div>
                  <div>{ new Date(purchasedItem.data).toLocaleDateString() }</div>
                  <div>
                    <p>Pagamento<br></br><br></br></p>
                    {purchasedItem.status === "pending" ?
                      <a className={styles.methodPayment} href={ purchasedItem.url } target="_black">{ (purchasedItem.methodPayment).toUpperCase() }</a>
                    : <a href="#">{ (purchasedItem.methodPayment).toUpperCase() }</a>
                    }
                  </div>
                  <button onClick={((event:any)=>{
                    const description = event.currentTarget.parentElement.parentElement.querySelector('#descriptionPurchased')
                    
                    if(description.style.display === 'none') {
                      description?.setAttribute('style','display: block;')
                    } else {
                      description?.setAttribute('style','display: none;')
                    }
                    })}>Detalhes do pedido</button>
                </div>
                <div id="descriptionPurchased" className={styles.descriptionPurchased}>
                  <h4>PRODUTO(S)<br></br><br></br></h4>
                  {purchasedItem.products.map((product:any)=>{
                    return (
                      <>
                        <img src={ product.Image }></img>
                        <div>{product?.Title}</div>
                        <div>Total: {((purchasedItem.products.reduce((a: any,v: any) =>  a = a + v.Price , 0))).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                      </>
                    )
                  })}
                </div>
              </div>
            </li>
          </>
        )
      })}
      </ul>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  
  const purchased = await fetch(`http://localhost:3000/api/products/listpurchased`,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ token: token })
  })
  const itemsPurchased = await purchased.json()

  return {
    purchased: itemsPurchased
  }
}

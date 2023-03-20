import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Header from '@/contexts/header'
import Footer from '@/contexts/footer'
import TypePayments from '@/contexts/typePayments'
import { useState } from 'react'
import { Canvas } from '@/contexts/imgProducts'

export default function Home({ product, i18n, User }: any) {
  const [showComponent, setShowComponent] = useState(false)

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
      <div className={ styles.containerProduct }>
        <p className={ styles.Title }> Inicio | <a>Acessorios e Celulares</a>
          <label style={{margin:"0 5px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8"><path fill="none" stroke="#666" d="M1 0l4 4-4 4"></path></svg>
          </label>
         <a>Celulares e Smartphones</a></p>
        <div className={styles.containerItem}>
          <div className={ styles.containerImage }>
            <div>
              <Canvas url={ product.Image } width={570} height={440}></Canvas>
              <Canvas url={ product.Image } width={570} height={440}></Canvas>
              <Canvas url={ product.Image } width={570} height={440}></Canvas>
              <Canvas url={ product.Image } width={570} height={440}></Canvas>
            </div>
          </div>
          <div className={ styles.containerDescription }>
            <h2>{ product.Title }</h2>
            <div className={ styles.Evaluation }>
              {[...Array(5)].map((value, index) => {
                
                const full = "bi-star-fill"
                const half = "bi-star-half"
                const empty = "bi-star"

                const condition = product.Evaluation >= index+1 ? full : empty

                return (
                  <i key={index} className={`bi ${condition}`} style={{fontSize:"14px",margin:"2px",padding:"0"}}></i>
                )
              })} - ({ product.CountEvaluation })
            </div>
            <div className={styles.moreSell}><label>Mais Vendido</label><a>1º em Celulares e Smartphones</a> </div>
            <div className={ styles.Price } > { (product.Price).toLocaleString(language, {style: 'currency', currency: currency}) } </div>
            <div>{i18n.offPix}</div>
            <button onClick={() => setShowComponent(true)}>{i18n.payments}</button>
            <div className={ styles.buyBottom }>
              <a href={ `../precart/${ product.Code }` }>
                <button name="buy" disabled={ product.productStock > 0 ? false: true }>{i18n.buttonBuy}</button>
              </a>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>{i18n.delivery}<strong>{ "InfluencialShop" }</strong> | { product.productStock > 0 ? <p style={{color:"var(--themeColorGreen)"}}>{i18n.inStock}</p> : <p style={{color:"red"}}>{i18n.outStock}</p>  } </div>
            <br></br>
            <h3>{i18n.description}</h3>
            <br></br>
            <div>{product.Description.InformationText}</div>
            <br></br>
            <table>
              <tbody>
              { product.Description.technicalSpecifications.map((information:any, index:any)=>{
                return (

                  <tr key={index}>
                    <th>{information.Title}</th>
                    <td>{information.Text}</td>
                  </tr>
                )}) 
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
      {showComponent && <TypePayments ></TypePayments>}
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const { product: productId } = ctx.query

  fetch(`http://localhost:3000/api/products/countproduct`,
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

  const product = await fetch(`http://localhost:3000/api/product/${productId}`)

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

  const language = dataUser?.user?.language ? dataUser?.user?.language : 'en-us'

  const localesFetch = await fetch(`http://localhost:3000/locales/${language}/provider.json`)
  const locales = await localesFetch.json()

  if (product.status === 200) {
    return {
      i18n: locales,
      User: dataUser,
      product: await product.json()
    }
  }
}

const getStaticPaths: GetStaticPaths = async () => {
  

  return {
    paths: [],
    fallback: false
  }
}
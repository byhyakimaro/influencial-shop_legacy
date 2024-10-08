import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Header from '@/contexts/header'
import Footer from '@/contexts/footer'
import TypePayments from '@/contexts/typePayments'
import { useEffect, useState } from 'react'
import { Canvas } from '@/contexts/imgProducts'

export default function Home({ product, i18n, User, itemTopSell, category, similarProducts }: any) {

  const [showComponent, setShowComponent] = useState(false)

  const language = User?.user?.language ? User?.user?.language : 'en-us'
  const currency = User?.user?.currency ? User?.user?.currency : 'USD'

  function arrayAverage(valores:any) {
    let soma = 0
    for(let i in valores) {
      soma += valores[i]
    }
    return soma
  }

  const Evaluation = arrayAverage(product.Evaluations.map((Evaluation:any) => {
    return Evaluation.Evaluation
  }))/product.Evaluations.length

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
        <p className={ styles.Title }> Inicio
          <label style={{margin:"0 5px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8"><path fill="none" stroke="#666" d="M1 0l4 4-4 4"></path></svg>
          </label>
         <a href={`../categories/${product.Category}`}>{ category }</a></p>
        <div className={styles.containerItem}>
          <div className={ styles.containerImage }>
            <div>
              <Canvas scale={1.2} style={{width:"50%",height:"max-content"}} url={ product.Image } width={570} height={440}></Canvas>
              <Canvas scale={1.2} style={{width:"50%",height:"max-content"}} url={ product.Image } width={570} height={440}></Canvas>
              <Canvas scale={1.2} style={{width:"50%",height:"max-content"}} url={ product.Image } width={570} height={440}></Canvas>
              <Canvas scale={1.2} style={{width:"50%",height:"max-content"}} url={ product.Image } width={570} height={440}></Canvas>
              <Canvas scale={1.2} style={{width:"50%",height:"max-content"}} url={ product.Image } width={570} height={440}></Canvas>
              <Canvas scale={1.2} style={{width:"50%",height:"max-content"}} url={ product.Image } width={570} height={440}></Canvas>
            </div>
          </div>
          <div className={ styles.containerDescription }>
            <h2>{ product.Title }</h2>
            <div className={ styles.Evaluation }>
              {[...Array(5)].map((value, index) => {
                
                const full = "bi-star-fill"
                const half = "bi-star-half"
                const empty = "bi-star"

                const condition = Evaluation >= index+1 ? full : empty

                return (
                  <i key={index} className={`bi ${condition}`} style={{fontSize:"14px",margin:"2px",padding:"0"}}></i>
                )
              })} - ({ product.Evaluations.length })
            </div>
            {itemTopSell && itemTopSell <= 10 && <div className={styles.moreSell}><label>Mais Vendidos</label><a href={`../categories/${product.Category}`}>{itemTopSell}º em {category}</a> </div>}
            <div className={ styles.Price } > { (product.Price).toLocaleString(language, {style: 'currency', currency: currency}) } </div>
            <div>{i18n.offPix}</div>
            <button onClick={() => setShowComponent(true)}>{i18n.payments}</button>
            <div className={ styles.buyBottom }>
              <a href={ `../precart/${ product.Code }` }>
                <button name="buy" disabled={ product.productStock > 0 ? false: true }>{i18n.buttonBuy}</button>
              </a>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>{i18n.delivery}<strong>{ "InfluencialShop" }</strong> | { product.productStock > 0 ? <p style={{color:"var(--themeColorGreen)"}}>{i18n.inStock}</p> : <p style={{color:"red"}}>{i18n.outStock}</p>  } </div>
            <h5 style={{display: "flex"}}><i style={{padding: "5px",color:"var(--themeColorGreen)"}} className="bi bi-patch-check-fill"></i>Os melhores fornecedores selecionados do Brasil garantem a qualidade dos produtos e serviços oferecidos.</h5>
            <h5 style={{display: "flex"}}><i style={{padding: "5px",color:"var(--themeColorBlue)"}} className="bi bi-arrow-return-left"></i>Devolução grátis. Você tem 7 dias a partir da data de recebimento.</h5>
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
      { similarProducts.length > 0 && 
      <div className={styles.similarProducts}>
        <h3>Clientes que compraram este item também compraram</h3>
        {similarProducts.map((product:any, index:any)=>{
          return (
            <a key={index} href={`../provider/${product['_id']}`}>
              <div className={styles.similarProduct}>
                <Canvas scale={2.5} url={ product.Image } width={210} height={210}></Canvas>
                <div>{ product.Title }</div>
              </div>
            </a>
          )
        })}
      </div>
      }
      
      <div className={styles.productReview}>
        <h3>Opiniões do produto</h3>
        <div>
          {product.Evaluations.map((Evaluation:any, index:any) => {
            return (
              <div key={index} className={styles.reviewComment}>
                <div>
                  <Canvas scale={8} url={ Evaluation.avatar } width={48} height={48}></Canvas>
                </div>
                <div>
                  <p>{Evaluation.name}</p>
                  <div>
                    {[...Array(5)].map((value, index) => {
                      
                      const full = "bi-star-fill"
                      const half = "bi-star-half"
                      const empty = "bi-star"

                      const condition = Evaluation.Evaluation >= index+1 ? full : empty

                      return (
                        <i key={index} className={`bi ${condition}`} style={{fontSize:"14px",margin:"2px",padding:"0"}}></i>
                      )
                    })}
                  </div>
                  <span>{Evaluation.date}</span><br></br><br></br>
                  <label>{Evaluation.comment}</label>
                  {Evaluation.pictures &&
                  <div className={styles.reviewPictures}>
                    {Evaluation.pictures.map((picture: any, index: any) => {
                      return (
                        <div key={index} className={styles.reviewPicture}>
                          <Canvas scale={8.5} url={ picture } width={110} height={128}></Canvas>
                        </div>
                      )
                    })}
                  </div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer></Footer>
      <TypePayments showComponent={showComponent}></TypePayments>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const host: any = process.env.HOST_API_URL
  const { product: productId } = ctx.query

  fetch(`${host}/api/products/countproduct`,
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

  const productFetch = await fetch(`${host}/api/product/${productId}`)

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

  const language = dataUser?.user?.language ? dataUser?.user?.language : 'en-us'

  const localesFetch = await fetch(`${host}/locales/${language}/provider.json`)
  const locales = await localesFetch.json()

  const localesIndexFetch = await fetch(`${host}/locales/${language}/index.json`)
  const localesIndex = await localesIndexFetch.json()

  if (productFetch.status === 200) {

    const product = await productFetch.json()

    const categoriesFetch = await fetch(`${host}/api/products/categories`)
    const categoryProduct = (await categoriesFetch.json()).filter((category:any) => category.code === product.Category)

    const itemTopSell = categoryProduct.find(({ bestSellers }:any) => bestSellers.find((item:any) => item === product.Code))

    const fetchA = await fetch(`${host}/api/products/search`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ search: product.Model })
    })
  
    const similarProducts = (await fetchA.json()).filter((item:any) => item['_id'] !== product.Code)

    return {
      i18n: locales,
      User: dataUser,
      itemTopSell: itemTopSell ? itemTopSell.bestSellers.indexOf(product.Code)+1 : false,
      category: localesIndex[product.Category],
      similarProducts: similarProducts,
      product: product
    }
  }
}

const getStaticPaths: GetStaticPaths = async () => {
  

  return {
    paths: [],
    fallback: false
  }
}
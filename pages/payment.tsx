import Footer from '@/contexts/footer'
import Header from '@/contexts/header'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

import PixSVG from '@/public/icon_pix.svg'
import CreditCardSVG from '@/public/credit-card.svg'
import BarCodeSVG from '@/public/bar-code.svg'

export default function Home({ productsInCart }: any) {
  const [productsCart, setProducts] = useState(productsInCart)
  const [method, setMethod] = useState("pix")
  
  useEffect(() => {
  }, [productsCart])

  useEffect(()=>{
    document.getElementById("nodePayment")?.childNodes.forEach((element:any)=>{
      element?.setAttribute('style','display: none;')
    })

    document.getElementById(method)?.setAttribute('style','display: block;')
  },[method])

  function changeMethod(event:any) {
    event.currentTarget.parentElement.childNodes.forEach((element:any) =>{
      element.setAttribute('style','background: #ffffff;')
    })
    event.target.setAttribute('style','background: red;')
    setMethod(event.target.value)
  }

  function fireMethod(event:any) {
    console.log(method)
    fetch(`/api/products/payments/`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          amount: method === "pix" ? ((productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0)))-((productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0))*(8/100)) : productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0),
          description: "Product description",
          method: method
        })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.point_of_interaction.transaction_data)

      var image = new Image()
      image.setAttribute('width','250px;')
      image.src = `data:image/png;base64,${response.point_of_interaction.transaction_data.qr_code_base64}`
      
      document.getElementById("pixcode")?.appendChild(image)
    })
  }

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={ styles.containerPayments }>
        <h2>Como deseja Pagar ?</h2>
        <div className={ styles.payment }>
          <div className={ styles.paymentMethods }>
            <button onClick={changeMethod} value="pix"><PixSVG width={24} height={24}></PixSVG>PIX</button>
            <button onClick={changeMethod} value="creditCard"><CreditCardSVG width={24} height={24}></CreditCardSVG>Cartao de Credito</button>
            <button onClick={changeMethod} value="barcode"><BarCodeSVG width={24} height={24}></BarCodeSVG>Boleto</button>
          </div>
          <div className={ styles.paymentDescription } id="nodePayment">
            <div id="pix">
              <h2>PIX</h2>
              <br></br>
              <h4>A Melhor Opcao a vista para suas compras com desconto!!</h4>
              <br></br>
              <p>Pague com PIX e aproveite até <strong>20% OFF</strong>. Nessa modalidade, seu pedido é aprovado instantaneamente, o que torna a expedição do seu pedido ainda mais rápida.</p>
              <h2>Total da sua Compra</h2>
              <h3>R$ { (productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0)) }</h3>
              <h2>Pagamento Via Pix</h2>
              <h3>R$ { ((productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0)))-((productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0))*(8/100)) }</h3>
              <h4>Economize: $ {(productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0))*(8/100)}</h4>
              <div id="pixcode"></div>
            </div>
          </div>
        </div>
        <button>Voltar</button>
        <button onClick={fireMethod}>Pagar com { method.charAt(0).toUpperCase() + method.slice(1) }</button>
      </div>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  
  if (token) {
    
    const User = await fetch(`http://${ctx.req?.headers.host}/api/auth/recovery/token`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ token: token })
    })
    const { user } = await User.json()

    return {
      productsInCart: user.productsInCart
    }
  } else {
    return {
      productsInCart: null
    }
  }
}

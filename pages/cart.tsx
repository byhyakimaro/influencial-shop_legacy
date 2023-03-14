import Footer from '@/contexts/footer'
import Header from '@/contexts/header'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export default function Home({ user, productsInCart }: any) {
  const [productsCart, setProducts] = useState(productsInCart)

  useEffect(() => {
  }, [productsCart])

  const TotalPrice = ((productsCart.reduce((a: any,v: any) =>  a = a + v.Price , 0))).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

  const address = JSON.parse(user.savedAddresses[0])
  const addressFormatted = `${address.road} ${address.number} ${address.complement} ${address.neighborhood} ${address.city} ${address.state} ${address.zipCode}`

  const { 'infshop.token': token } = parseCookies()
  
  function removeItemCart({ target }: any) {
    fetch(`/api/products/removecart`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          token,
          itemCode: target.value
        })
    })
    
    setProducts(productsCart.filter(({ Code }:any) => Code !== target.value))
    target.parentElement.parentElement.parentElement
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
      { (productsCart.length === 0) && 
        <h1>Carrinho Vazio</h1>
      }
      { (productsCart.length > 0) && 
      <div className={ styles.containerCart }>
        <div className={ styles.containerAdress }>
          <h2>Selecione o Endereco</h2>
          <div className="break"></div>
          <div className={ styles.adress }> 
            <div className={ styles.infos }>
              <div className={ styles.NameAccount }> {user.name} </div>
              <div className={ styles.adressText }>{ addressFormatted }</div>
            </div>
            <div className={ styles.buttonsEdit }>
              <button>Editar</button>
              <button>Selecionar Outro</button>
              <button>Novo Endereco</button>
            </div>
          </div>
        </div>
        <div className={ styles.containerPayment }>
          <h2>Resumo</h2>
          <div className="break"></div>
          <div className={ styles.paymentTab }>
            <div>Valor dos Produtos <h3>{ TotalPrice }</h3></div>
            <h5><br></br>À vista no PIX com até 10% OFF</h5>
            <div>Frete: { "Gratis" }</div>
          </div>
          <div className="break"></div>
          <a href="../method">Pagamento</a>
          <a href="../">Continuar Comprando</a>
        </div>
        <div className="break"></div>
        <div className={ styles.containerProducts }>
          <h2>Produto e Frete</h2>
          <div className="break"></div>
          <div className={ styles.products }>
            {productsCart.map((product: any) => {
              return (
                <>
                  <div>
                  <a href={ `../provider/${ product.Code }` }><img width="64" src={ product.Image }></img></a>
                      <a href={ `../provider/${ product.Code }` }> { product.Title } </a>
                      <h5><br></br>{(product.Price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                      <div> Preco a vista no PIX <h4>{ (product.Price-(product.Price*(8/100))).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</h4> <div><button value={product.Code} onClick={removeItemCart}>Remover</button></div></div>
                  </div>
                </>
              )
            })}
          </div>
          <h4>Opcoes de Envios</h4>
          <div className="break"></div>
          <div>Entrega Padrao: { "Gratis" }</div>
        </div>
      </div> }
      <Footer></Footer>
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

    return {
      user: user,
      productsInCart: user.productsInCart
    }
  } else {
    return {
      user: null,
      productsInCart: null
    }
  }
}

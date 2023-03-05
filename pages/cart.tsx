import Footer from '@/contexts/footer'
import Header from '@/contexts/header'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { parseCookies } from 'nookies'

export default function Home({ productsInCart }: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={ styles.containerCart }>
        <div className={ styles.containerAdress }>
          <h2>Selecione o Endereco</h2>
          <div className="break"></div>
          <div className={ styles.adress }> 
            <div className={ styles.infos }>
              <div className={ styles.NameAccount }>Paulo</div>
              <div className={ styles.adressText }>{ "Sem Endereco" }</div>
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
          <div className={ styles.paymentDiv }>
            
          </div>
        </div>
        <div className={ styles.containerProducts }>
          <h2>Produto e Frete</h2>
          <div className="break"></div>
          <div className={ styles.products }>
            {productsInCart.map((product: any) => {
              return (
                <>
                  <div> { product.Title } </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  
  if (token) {
    
    const User = await fetch('http://localhost:3000/api/auth/recovery/token',
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

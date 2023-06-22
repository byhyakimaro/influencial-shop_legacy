import Header from '@/contexts/header'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { register, handleSubmit } = useForm()

  async function handleRegister(data: any) {
    
    console.log(data)
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
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>Estara Ativo</div>
        <input
        type='checkbox'
        {...register('active')} 
        ></input>

        <div>Buscavel</div>
        <input
        type='checkbox'
        {...register('searchable')} 
        ></input>

        <div>Nome do Produto</div>
        <input
        {...register('Title')}
        ></input>

        <div>Marca do Produto</div>
        <input
        {...register('Model')}
        ></input>

        <div>Frete Gratis</div>
        <input
        type='checkbox'
        {...register('Image')}
        ></input>

        <div>Categoria do Item</div>
        <input
        {...register('category')} 
        ></input>

        <div>Variantes</div>
        <div></div>

        <div>Imagens</div>
        <input
        type='file'
        {...register('searchable')} 
        ></input>

        <div>Detalhes do Produto</div>
        <div>
          <div>
            <h6>Especificacoes Tecnicas</h6>
            <input
            {...register('technicalSpecifications')} 
            ></input>
          </div>
          <div>
            <h6>Texto Descricao</h6>
            <input
            {...register('InformationText')} 
            ></input>
          </div>
          <div>
            <h6>Imagens</h6>
            <input
            type='file'
            {...register('searchable')} 
            ></input>
          </div>
        </div>

        <div>Sku</div>
        <div>
          <div>
            <h6>Disponivel Para Venda</h6>
            <input
            type='checkbox'
            {...register('activeSell')} 
            ></input>
          </div>
        </div>
        
        <div>Url do Anuncio</div>
        <input
        {...register('urlProvider')} 
        ></input>

        <button type="submit">Register Item</button>
      </form>
    </>
  )
}

import Head from 'next/head';
import Image from 'next/image';
import { Products } from '..';
import { useCart } from '../../hooks/use-cart';

export default function Product({ product }:any) {
  const { id, title, image, price, description } = product;

  // const id = 'productId';
  // const title = 'productId';
  // const desc = 'productId';
  // const image = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';
  // const price = 1.0;

  const { addToCart } = useCart();

  return (
    <div>
      <Head>
        <title>{title} - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Image src={image} alt={title} width={500} height={500} />
        </div>

        <div>
          <h1>{title}</h1>

          <p>{description}</p>

          <p>${price.toFixed(2)}</p>

          <p>
            <button onClick={() => addToCart({ id })}>Buy</button>
          </p>
        </div>
      </main>

      {/* <footer >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo"  />
        </a>
      </footer> */}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products');
  const productos = await res.json();

  // const result = await axios.get('https://fakestoreapi.com/products');
  // const productos = result.data;

  console.log(productos, 'hola holaaa');

  const paths = productos.map((product: Products) => ({
    params: {
      productId: `${product.id}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch('https://fakestoreapi.com/products');
  const productos = await res.json();

  const product = productos.find(
    (product: any) => `${product.id}` === `${params.productId}`
  );
  return {
    props: {
      product,
    },
  };
}

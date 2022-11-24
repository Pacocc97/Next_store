import { NextPage } from 'next';
import { defaultConfig } from 'next/dist/server/config-shared';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Home: NextPage = () => {
  const [productos, setProductos] = useState<Array<Products>>([]);

  const defaultCart: any = {
    productos: {},
  };

  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.productos).map((key) => {
    const producto = productos.find(({ id }) => `${id} === ${key}`);
    return {
      ...cart.productos[key],
      pricePerItem: producto?.price,
    };
  });

  console.log(cartItems, 'Cantidad carrito');

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  function addToCart(id: number): any {
    updateCart((prev: any) => {
      let cartState = { ...prev };

      if (cartState.productos[id]) {
        cartState.productos[id].quantity = cartState.productos[id].quantity + 1;
      } else {
        cartState.productos[id] = {
          id,
          quantity: 1,
        };
      }

      return cartState;
    });
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
  }, []);

  console.log(productos, 'hola');
  console.log(cart, 'carrito');

  return (
    <>
      <Head>
        <title>Tienda</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] sm:text-red-500 md:text-green-500">
            Hola Mundo!
          </h1>

          <div>
            <h2 className="text-white">Carrito</h2>
            <p className="text-white">Items: {totalItems}</p>
            <p className="text-white">Total Cost: ${subtotal}</p>
            <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
              Check Out
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col max-w-xs gap-4 p-4 text-white rounded-xl bg-white/10 hover:bg-white/20"
              >
                <Image
                  src={producto.image}
                  alt="foto"
                  width={500}
                  height={500}
                />
                <h3 className="text-2xl font-bold">{producto.title}</h3>
                <div className="text-lg">{producto.description}</div>
                <button
                  onClick={() => {
                    addToCart(producto.id);
                  }}
                  className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                >
                  Comprar
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">hola</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

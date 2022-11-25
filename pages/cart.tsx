import Head from 'next/head';
import { useCart } from '../hooks/use-cart';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import { Products } from '.';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name',
  },
  {
    columnId: 'quantity',
    Header: 'Quantity',
  },
  {
    columnId: 'pricePerUnit',
    Header: 'Price Per Item',
  },
  {
    columnId: 'total',
    Header: 'Item Total',
  },
];

export default function Cart() {
  const [productos, setProductos] = useState<Array<Products>>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
  }, []);

  const { cartItems } = useCart();
  const data = cartItems.map(({ id, quantity, pricePerUnit }: any) => {
    const product = productos.find(({ id: pid }) => pid === id);
    const { title } = product || {};
    return {
      id,
      title,
      quantity,
      pricePerUnit: pricePerUnit, //.toFixed(2), checar esto
      total: quantity * pricePerUnit, //.toFixed(2), checar esto
    };
  });

  return (
    <div>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Cart</h1>

        <Table data={data} columns={columns} />

        <p>
          <button>Check Out</button>
        </p>
      </main>
    </div>
  );
}

import Head from 'next/head';



import Table from '../components/Table';
import Image from 'next/image';

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

export default function Home() {
  const data = [
    {
      id: 'my-product',
      title: 'My Cool Product',
      quantity: 1,
      pricePerUnit: 10.0,
      total: 10.0,
    },
  ];

  return (
    <div>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
           Cart
        </h1>

        <Table  data={data} columns={columns} />

        <p>
          <button>Check Out</button>
        </p>
      </main>

    </div>
  );
}

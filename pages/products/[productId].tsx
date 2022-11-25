import Head from 'next/head';
import Image from 'next/image';
import { Products } from '..';
import { useCart } from '../../hooks/use-cart';

export default function Product({ product }: any) {
  const { id, title, image, price, description, category, rating } = product;

  const { addToCart } = useCart();

  return (
    <div>
      <Head>
        <title>{title} - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="sticky top-0 bg-white shadow-sm">
          <div className="px-4 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-4">
            <div className="flex items-center justify-between md:justify-start"></div>
          </div>
        </div>

        <div className="py-6">
          <div className="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col -mx-4 md:flex-row">
              <div className="px-4 md:flex-1">
                <div x-data="{ image: 1 }" x-cloak>
                  <div className="h-64 mb-4 bg-gray-100 rounded-lg md:h-80">
                    <div
                      x-show="image === 1"
                      className="flex items-center justify-center h-64 mb-4 bg-gray-100 rounded-lg md:h-80"
                    >
                      <Image
                        src={image}
                        alt="producto"
                        width={200}
                        height={28}
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 md:flex-1">
                <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
                  {title}
                </h2>
                <p className="text-sm text-gray-500">
                  Categoría:{' '}
                  <a href="#" className="text-indigo-600 hover:underline">
                    {category}
                  </a>
                </p>
                <div>
                  <div className="flex items-center">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Rating star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                      {rating.rate}
                    </p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      {rating.count} reseñas
                    </a>
                  </div>
                </div>
                <div className="flex items-center my-4 space-x-4">
                  <div>
                    <div className="flex px-3 py-2 bg-gray-100 rounded-lg">
                      <span className="mt-1 mr-1 text-indigo-400">$</span>
                      <span className="text-3xl font-bold text-indigo-600">
                        {price}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-green-500">
                      Ahorre 12%
                    </p>
                    <p className="text-sm text-gray-400">Impuestos incluidos</p>
                  </div>
                </div>

                <p className="text-gray-500">{description}</p>

                <div className="flex py-4 space-x-4">
                  <div className="relative">
                    <div className="absolute left-0 right-0 block pt-2 text-xs font-semibold tracking-wide text-center text-gray-400 uppercase">
                      Qty
                    </div>
                    <select className="flex items-end pb-1 pl-4 pr-8 border border-gray-200 appearance-none cursor-pointer rounded-xl h-14">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>

                    <svg
                      className="absolute bottom-0 right-0 w-5 h-5 mb-2 mr-2 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>

                  <button
                    type="button"
                    className="px-6 py-2 font-semibold text-white bg-indigo-600 h-14 rounded-xl hover:bg-indigo-500"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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

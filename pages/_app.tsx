import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartContext, useCartState } from '../hooks/use-cart';
import Nav from '../components/Nav';

export default function App({ Component, pageProps }: AppProps) {
  const cart = useCartState();

  return (
    <CartContext.Provider value={cart}>
      <div className="px-4 py-2 text-indigo-200 bg-indigo-700 md:text-center">
        Inspired from Dribbble Shot by{' '}
        <a
          href="https://dribbble.com/shots/14127375-Product-Page"
          className="font-bold underline hover:text-indigo-100"
        >
          Vishnu Prasad
        </a>
        . See his works on{' '}
        <a
          href="https://dribbble.com/vlockn"
          className="font-bold underline hover:text-indigo-100"
        >
          Dribbble
        </a>
        .
      </div>
      <Nav />
      <Component {...pageProps} />;
    </CartContext.Provider>
  );
}

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartContext, useCartState } from '../hooks/use-cart';
import Nav from '../components/Nav';

export default function App({ Component, pageProps }: AppProps) {
  const cart = useCartState();

  return (
    <CartContext.Provider value={cart}>
      
      <Nav />
      <Component {...pageProps} />;
    </CartContext.Provider>
  );
}

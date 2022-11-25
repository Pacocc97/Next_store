import Link from 'next/link';
import { useCart } from '../hooks/use-cart';

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav>
      <p>
        <Link href="/">Space Jelly Shop</Link>
      </p>
      <p>
        <Link href="/cart">
          <button onClick={checkout}>Carrito ${subtotal.toFixed(2)}</button>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;

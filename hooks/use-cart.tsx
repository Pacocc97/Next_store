import { createContext, useEffect, useState, useContext } from 'react';

import { Products } from '../pages';

const defaultCart: any = {
  productos: {},
};

export const CartContext = createContext<any | undefined>(undefined);

export const useCartState = () => {
  const [productos, setProductos] = useState<Array<Products>>([]);

  const [cart, updateCart] = useState(defaultCart); // checar doble llamada!!!

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('mi_carrito');
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
    const data = JSON.stringify(cart);
    window.localStorage.setItem('mi_carrito', data);
  }, [cart]);

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
    console.log('Agregando');
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

  return { cart, updateCart, subtotal, totalItems, addToCart };
};

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}

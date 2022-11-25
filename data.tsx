/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Products } from './pages';

export const products = () => {
  const [productos, setProductos] = useState<Array<Products>>([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
  }, []);
  return <div>data</div>;
};

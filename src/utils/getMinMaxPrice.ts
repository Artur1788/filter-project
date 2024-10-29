import { Product } from '../types';

export const getMinMaxPrice = (products: Product[]) => {
  const sortedProducts = products.sort((a, b) => a.price - b.price);

  return {
    minPriceOfProducts: sortedProducts[0].price,
    maxPriceOfProducts: sortedProducts[sortedProducts.length - 1].price,
  };
};

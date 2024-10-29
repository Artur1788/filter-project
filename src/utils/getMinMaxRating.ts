import { Product } from '../types';

export const getMinMaxRating = (products: Product[]) => {
  const sortedProducts = products.sort((a, b) => a.rating - b.rating);

  return {
    minRatingOfProducts: sortedProducts[0].rating,
    maxRatingOfProducts: sortedProducts[sortedProducts.length - 1].rating,
  };
};

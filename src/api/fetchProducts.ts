import { products } from '../mock-data';
import { Product, ProductFilters } from '../types';

export const fetchProducts = async (
  options: ProductFilters
): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 1000));

  let filteredProducts = [...products];

  if (options.search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.brand.toLowerCase().includes(options.search!.toLowerCase())
    );
  }

  if (options.category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase() === options.category!.toLowerCase()
    );
  }

  if (options.maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= options.maxPrice!
    );
  }

  if (options.rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating <= options.rating!
    );
  }

  if (options.sortBy) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      if (options.sortBy === 'asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  }

  return filteredProducts;
};

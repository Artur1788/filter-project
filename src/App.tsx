import { useCallback, useEffect, useState } from 'react';

import { fetchProducts } from './api/';
import {
  ProductList,
  ProductListFilter,
  ProductListSort,
  Loader,
} from './components';
import { Product, ProductFilters } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});

  const handleFilter = useCallback((productFilters: ProductFilters) => {
    setFilters((prevProducts) => ({
      ...prevProducts,
      search: productFilters.search,
      category: productFilters.category,
      maxPrice: productFilters.maxPrice,
      rating: productFilters.rating,
    }));
  }, []);

  const handleSort = useCallback((productFilters: ProductFilters) => {
    setFilters((prevProducts) => ({
      ...prevProducts,
      sortBy: productFilters.sortBy,
    }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const products = await fetchProducts({
          search: filters.search,
          category: filters.category,
          maxPrice: filters.maxPrice,
          rating: filters.rating,
          sortBy: filters.sortBy,
        });
        setProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    filters.category,
    filters.maxPrice,
    filters.search,
    filters.rating,
    filters.sortBy,
  ]);

  return (
    <div className='relative flex flex-col gap-y-5 bg-neutral-800 min-h-dvh overflow-x-hidden'>
      <div className='flex flex-row sm:flex-col justify-between items-center sm:items-start sm:gap-y-5 py-2 pl-5'>
        <h1 className='font-bold text-4xl text-white sm:self-start'>
          Products
        </h1>
        <div className='flex sm:flex-col items-center sm:items-start'>
          <ProductListSort handleSort={handleSort} />
          <ProductListFilter
            handleFilter={handleFilter}
            isLoading={isLoading}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : products.length ? (
        <ProductList products={products} />
      ) : (
        <p className='text-center text-white'>No products found</p>
      )}
    </div>
  );
}

export default App;

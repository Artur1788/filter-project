import { FC, useState } from 'react';

import { Product } from '../../types';
import { ProductItem } from './components/ProductListItem';

interface ProductListProps {
  products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const [page, setPage] = useState(1);
  const start = (page - 1) * 6;
  const end = start + 6;
  const hasNextPage = products.length > end;
  const slicedProducts = products.slice(start, end);

  const changePage = (route?: 'prev' | 'next') => {
    if (route === 'prev') setPage((prevState) => prevState - 1);
    else setPage((prevState) => prevState + 1);
  };

  return (
    <>
      <div className='gap-6 grid grid-cols-[repeat(auto-fit,minmax(240px,_1fr))] mx-auto px-5 w-full max-w-screen-lg'>
        {slicedProducts.map(
          ({ brand, category, name, price, rating, id, imageUrl }) => (
            <ProductItem
              key={id}
              brand={brand}
              category={category}
              name={name}
              price={price}
              rating={rating}
              imageUrl={imageUrl}
            />
          )
        )}
      </div>
      <div className='flex justify-center items-center gap-x-5 px-5'>
        {page > 1 && (
          <button
            onClick={() => changePage('prev')}
            className='bg-slate-500 hover:bg-slate-400 px-4 py-2 rounded-md text-white transition-colors duration-300 cursor-pointer'
          >
            Back
          </button>
        )}
        {hasNextPage && (
          <button
            onClick={() => changePage()}
            className='bg-slate-500 hover:bg-slate-400 px-4 py-2 rounded-md text-white transition-colors duration-300 cursor-pointer'
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

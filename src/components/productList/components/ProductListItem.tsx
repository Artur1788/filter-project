import { FC } from 'react';

import { Product } from '../../../types';

interface ProductProps extends Product {}

export const ProductItem: FC<ProductProps> = ({
  name,
  category,
  brand,
  price,
  rating,
}) => {
  return (
    <div className='bg-neutral-700 px-3 py-5 rounded-lg'>
      <h2 className='font-bold text-white text-xl'>{name}</h2>
      <p className='text-sm text-white'>{category}</p>
      <p className='text-sm text-white'>{brand}</p>
      <p className='font-bold text-lg text-white'>{price}&nbsp;$</p>
      <p className='text-sm text-white'>Rating: {rating}</p>
    </div>
  );
};

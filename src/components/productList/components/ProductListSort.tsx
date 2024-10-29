import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

import { ArrowUpDown } from 'lucide-react';

import { useOutSideClick } from '../../../hooks';
import { ProductFilters } from '../../../types';

interface ProductListSortProps {
  handleSort: (sortBy: ProductFilters) => void;
}

export const ProductListSort: FC<ProductListSortProps> = ({ handleSort }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortText, setSortText] = useState<string>('');
  const [sortBy, setSortBy] = useState<ProductFilters['sortBy']>(() => {
    const sortBy = JSON.parse(localStorage.getItem('sortBy') as string);
    return sortBy;
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleIsOpen = () => setIsSortOpen((prevState) => !prevState);

  const handleSortByPrice = (
    e: MouseEvent<HTMLParagraphElement | HTMLHeadingElement>,
    sortType: 'asc' | 'desc' | ''
  ) => {
    localStorage.setItem('sortBy', JSON.stringify(sortType));

    if (sortType) setSortText(e.currentTarget.innerText);
    else setSortText('Sort');

    setIsSortOpen(false);

    if (sortType === 'asc') setSortBy('asc');
    else if (sortType === 'desc') setSortBy('desc');
    else setSortBy('');
  };

  useOutSideClick(dropdownRef, toggleIsOpen, isSortOpen);

  useEffect(() => {
    handleSort({
      sortBy,
    });
  }, [sortBy, handleSort]);

  return (
    <div
      ref={dropdownRef}
      className='relative sm:order-2'
    >
      <div
        onClick={toggleIsOpen}
        className='flex items-center gap-x-1 hover:hover:bg-slate-500 p-2 rounded-md text-white transition-colors duration-300 cursor-pointer'
      >
        <p>{sortText ? sortText : 'Sort'}</p>
        <ArrowUpDown className='w-5 h-5' />
      </div>
      {isSortOpen && (
        <div className='top-full right-0 sm:right-auto sm:left-0 z-10 absolute bg-neutral-900 shadow-lg rounded-md'>
          <div className='flex flex-col gap-y-2 text-white'>
            <h4
              onClick={(e) => handleSortByPrice(e, '')}
              className='hover:bg-neutral-500 px-4 py-2 rounded-md text-nowrap text-sm transition-colors duration-150 cursor-pointer'
            >
              Reset
            </h4>
            <div className='flex flex-col gap-y-3'>
              <p
                onClick={(e) => handleSortByPrice(e, 'desc')}
                className='hover:bg-neutral-500 px-4 py-2 rounded-md text-nowrap text-sm transition-colors duration-150 cursor-pointer'
              >
                Price (high to low)
              </p>
              <p
                onClick={(e) => handleSortByPrice(e, 'asc')}
                className='hover:bg-neutral-500 px-4 py-2 rounded-md text-nowrap text-sm transition-colors duration-150 cursor-pointer'
              >
                Price (low to high)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

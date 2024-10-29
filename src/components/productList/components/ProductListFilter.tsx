import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';

import { Menu, X } from 'lucide-react';

import { useDebounce, useOutSideClick } from '../../../hooks';
import { products } from '../../../mock-data';
import { ProductFilters } from '../../../types';
import { getMinMaxPrice, getMinMaxRating } from '../../../utils';
import { Loader } from '../..';

interface ProductListFilterProps {
  handleFilter: (filters: ProductFilters) => void;
  isLoading: boolean;
}

export const ProductListFilter: FC<ProductListFilterProps> = ({
  handleFilter,
  isLoading,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resetInProgress, setResetInProgress] = useState(false);
  const [search, setSearch] = useState<ProductFilters['search']>(() => {
    const search = JSON.parse(localStorage.getItem('search') as string) || '';
    return search;
  });
  const [category, setCategory] = useState<ProductFilters['category']>(() => {
    const category =
      JSON.parse(localStorage.getItem('category') as string) || '';
    return category;
  });
  const [maxPrice, setMaxPrice] = useState<ProductFilters['maxPrice']>(() => {
    const maxPrice = JSON.parse(localStorage.getItem('maxPrice') as string);
    return +maxPrice;
  });
  const [maxRating, setMaxRating] = useState<ProductFilters['rating']>(() => {
    const maxRating = JSON.parse(localStorage.getItem('maxRating') as string);
    return +maxRating;
  });

  const { minPriceOfProducts, maxPriceOfProducts } = getMinMaxPrice(products);
  const { minRatingOfProducts, maxRatingOfProducts } =
    getMinMaxRating(products);

  const debouncedSearch = useDebounce(search);
  const debouncedMaxPrice = useDebounce(maxPrice);
  const debouncedMaxRating = useDebounce(maxRating);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    localStorage.setItem('search', JSON.stringify(e.target.value));
    setSearch(e.target.value);
  };

  const handleCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    localStorage.setItem('category', JSON.stringify(e.target.value));
    setCategory(e.target.value as ProductFilters['category']);
  };

  const handleMaxPrice: ChangeEventHandler<HTMLInputElement> = (e) => {
    localStorage.setItem('maxPrice', JSON.stringify(e.target.value));
    setMaxPrice(e.target.valueAsNumber);
  };

  const handleMaxRating: ChangeEventHandler<HTMLInputElement> = (e) => {
    localStorage.setItem('maxRating', JSON.stringify(e.target.value));
    setMaxRating(e.target.valueAsNumber);
  };

  const resetFilters = () => {
    setResetInProgress(true);

    localStorage.removeItem('search');
    localStorage.removeItem('category');
    localStorage.removeItem('maxPrice');
    localStorage.removeItem('maxRating');

    setMaxPrice(0);
    setMaxRating(0);
    setSearch('');
    setCategory('');

    // Reset filters after 500ms which is debounce time
    // otherwise we should change 500ms to max
    // debounce time
    setTimeout(() => {
      setResetInProgress(false);
    }, 500);
  };

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  useOutSideClick(menuRef, toggleMenu, isMenuOpen);

  const loading = isLoading || resetInProgress;

  useEffect(() => {
    if (!resetInProgress) {
      handleFilter({
        category,
        search: debouncedSearch,
        maxPrice: debouncedMaxPrice,
        rating: debouncedMaxRating,
      });
    }
  }, [
    category,
    debouncedSearch,
    debouncedMaxPrice,
    debouncedMaxRating,
    handleFilter,
    resetInProgress,
  ]);

  return (
    <>
      <div className='sm:block sm:order-1 hidden mb-6'>
        <div className='flex items-center gap-x-2 mb-4'>
          <div className='flex flex-col gap-y-2 max-w-48'>
            <label
              htmlFor='search'
              className='text-sm text-white'
            >
              Search by brand
            </label>
            <input
              disabled={loading}
              id='search'
              className='border-neutral-700 bg-neutral-800 px-4 py-2 border rounded-lg w-full text-white focus-visible:placeholder:text-white caret-white'
              type='text'
              placeholder='Search...'
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label
              htmlFor='select'
              className='text-sm text-white'
            >
              Filter by category
            </label>
            <select
              disabled={loading}
              id='select'
              value={category}
              onChange={handleCategory}
              className='flex items-center border-neutral-700 bg-neutral-800 px-4 py-2 border rounded-lg w-full text-white focus-visible:placeholder:text-white caret-black'
            >
              <option value=''>All</option>
              <option value='electronics'>Electronics</option>
              <option value='clothing'>Clothing</option>
              <option value='footwear'>Footwear</option>
            </select>
          </div>
          <div className='relative flex flex-col gap-y-2 px-3'>
            {maxPrice ? (
              <small className='top-1 right-3 absolute text-white'>
                {maxPrice}
              </small>
            ) : null}
            <label className='text-white'>Filter price</label>
            <input
              disabled={loading}
              type='range'
              min={minPriceOfProducts}
              max={maxPriceOfProducts}
              value={maxPrice}
              step={0.1}
              onChange={handleMaxPrice}
              className='bg-neutral-800 rounded-lg w-full h-2'
            />
          </div>
          <div className='relative flex flex-col gap-y-2 px-3'>
            {maxRating ? (
              <small className='top-1 right-3 absolute text-white'>
                {maxRating}
              </small>
            ) : (
              ''
            )}
            <label className='text-white'>Filter rating</label>
            <input
              disabled={loading}
              type='range'
              min={minRatingOfProducts}
              max={maxRatingOfProducts}
              value={maxRating}
              step={0.1}
              onChange={handleMaxRating}
              className='bg-neutral-800 rounded-lg w-full h-2'
            />
          </div>
        </div>
        <button
          onClick={resetFilters}
          className='bg-neutral-600 hover:bg-neutral-700 px-4 py-2 rounded-md text-white transition-colors duration-300 cursor-pointer'
        >
          Reset Filters
        </button>
      </div>

      {/* Filter menu for mobile */}

      <div className='sm:hidden px-5'>
        <div
          className='hover:bg-slate-500 p-2 rounded-md transition-colors duration-300 cursor-pointer'
          onClick={toggleMenu}
        >
          <Menu className='rounded-md w-6 h-6 text-slate-300 cursor-pointer' />
        </div>
        <div
          ref={menuRef}
          className={`top-0 right-0 absolute bg-neutral-900 rounded-md  w-[min(384px,100%)] transition-transform duration-300 z-10
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className='relative flex flex-col justify-between gap-y-5 px-4 py-7 w-full h-full'>
            {loading && (
              <div className='z-10 absolute inset-0 flex justify-center items-center bg-neutral-900/90 rounded-md'>
                <Loader />
              </div>
            )}
            <X
              onClick={toggleMenu}
              className='top-4 right-7 absolute w-6 h-6 text-white cursor-pointer'
            />
            <div className='flex flex-col gap-y-2 max-w-48'>
              <label
                htmlFor='searchMB'
                className='text-sm text-white'
              >
                Search by brand
              </label>
              <input
                disabled={loading}
                id='searchMB'
                className='border-neutral-700 bg-neutral-800 px-4 py-2 border rounded-lg w-full text-white focus-visible:placeholder:text-white caret-white'
                type='text'
                placeholder='Search...'
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className='flex flex-col gap-y-2 max-w-48'>
              <label
                htmlFor='selectMB'
                className='text-sm text-white'
              >
                Filter by category
              </label>
              <select
                disabled={loading}
                id='selectMB'
                value={category}
                onChange={handleCategory}
                className='flex items-center border-neutral-700 bg-neutral-800 px-4 py-2 border rounded-lg w-full text-white focus-visible:placeholder:text-white caret-black'
              >
                <option value=''>All</option>
                <option value='electronics'>Electronics</option>
                <option value='clothing'>Clothing</option>
                <option value='footwear'>Footwear</option>
              </select>
            </div>
            <div className='relative flex flex-col gap-y-2'>
              {maxPrice ? (
                <small className='top-1 right-3 absolute text-white'>
                  {maxPrice}
                </small>
              ) : null}
              <label className='text-white'>Filter price</label>
              <input
                disabled={loading}
                type='range'
                min={minPriceOfProducts}
                max={maxPriceOfProducts}
                value={maxPrice}
                step={0.1}
                onChange={handleMaxPrice}
                className='bg-neutral-800 rounded-lg w-full h-2'
              />
            </div>
            <div className='relative flex flex-col gap-y-2'>
              {maxRating ? (
                <small className='top-1 right-3 absolute text-white'>
                  {maxRating}
                </small>
              ) : (
                ''
              )}
              <label className='text-white'>Filter rating</label>
              <input
                disabled={loading}
                type='range'
                min={minRatingOfProducts}
                max={maxRatingOfProducts}
                value={maxRating}
                step={0.1}
                onChange={handleMaxRating}
                className='bg-neutral-800 rounded-lg w-full h-2'
              />
            </div>
            <button
              onClick={resetFilters}
              className='flex justify-center items-center gap-x-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md text-white transition-colors duration-300 cursor-pointer'
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

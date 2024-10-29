import { ClipLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <ClipLoader
        color='#4676be'
        size={50}
      />
    </div>
  );
};

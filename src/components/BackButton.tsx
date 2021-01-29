import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackButton() {
  const history = useHistory();
  return (
    <button
      className='flex uppercase items-center font-semibold mb-2 border py-2 shadow-lg px-4'
      onClick={() => history.goBack()}
    >
      <svg
        className='w-6 h-6 mr-1'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
        />
      </svg>
      Go Back
    </button>
  );
}

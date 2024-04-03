import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-6'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <img src="./logo.svg" alt="logo" className='h-10 w-10 mr-3' />
          <span className='text-lg font-semibold'>Blog Den</span>
        </div>
        <div className='flex items-center space-x-4'>
          <a href='#' className='text-gray-400 hover:text-white transition duration-300 ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a href='#' className='text-gray-400 hover:text-white transition duration-300 ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-7-4a4 4 0 100 8 4 4 0 000-8zm-1 10v-2" />
            </svg>
          </a>
          <a href='#' className='text-gray-400 hover:text-white transition duration-300 ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15l-5-3-5 3-4-2.3V20h18v-7.3z" />
            </svg>
          </a>
        </div>
      </div>
      <div className='container mx-auto mt-4 text-sm text-center'>
        <p>&copy; {new Date().getFullYear()} Blog Den. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

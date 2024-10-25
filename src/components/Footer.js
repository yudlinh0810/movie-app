import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-40 text-neutral-300 py-3 mt-4'>
      <div className='flex items-center justify-center gap-6 '>
        <Link to={'/'} className='hover:text-blue-500'>
          About
        </Link>
        <Link to={'https://github.com/yudlinh0810/movie-app.git'} className='hover:text-blue-500'>
          Github
        </Link>
        <Link to={'/'} className='hover:text-blue-500'>
          App Movies
        </Link>
      </div>
      <Link
        to={'https://www.facebook.com/profile.php?id=100013389840204'}
        className='hover:text-blue-500'
      >
        YudLinh
      </Link>
    </footer>
  );
};

export default Footer;

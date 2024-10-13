import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Time from './Time';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { navigation } from '../contants/navigation';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  console.log('first');

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, []);

  const handleSubmitSearch = (e) => {
    navigate(`/search?q=${searchInput}`);
    e.preventDefault();
  };
  return (
    <header className='fixed w-full h-22 pt-1 bg-neutral-700 bg-opacity-70'>
      <div className='flex top-0 h-14 w-full'>
        <div className='grow h-14 w-24 flex items-center ml-8'>
          <Time />
        </div>
        <Link to={'/'} className='grow-0 h-14 flex items-center'>
          <img src={logo} alt='logo' width={100} className='hover:scale-125 cursor-pointer' />
        </Link>
        <div className='grow h-14 w-24 flex items-center ml-8 relative left-28'>
          <form className='flex' onSubmit={handleSubmitSearch}>
            <input
              placeholder='Search'
              className='h-7 p-2 bg-neutral-700 bg-opacity-10 outline-none border border-indigo-50 rounded-lg'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button>
              <CiSearch
                size={'1.3rem'}
                className='relative right-7 hover:scale-110 hover:text-neutral-100 hover:cursor-pointer'
              />
            </button>
          </form>
          <p className='relative left-28'>
            <NavLink to='login' className={'hover:text-neutral-100'}>
              SignIn
            </NavLink>
            /
            <NavLink to='register' className={'hover:text-neutral-100'}>
              SignUp
            </NavLink>
          </p>
        </div>
      </div>
      <div>
        <nav className='hidden lg:flex items-center justify-center gap-2 '>
          {navigation.map((nav, index) => {
            return (
              <div key={index} className='flex'>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={'flex px-3 hover:text-neutral-100'}
                >
                  {nav.label}
                  {nav.label === 'Nations' ? <IoMdArrowDropdown className='relative top-1' /> : ''}
                </NavLink>
              </div>
            );
          })}
          <NavLink className='flex hover:text-neutral-100 hover:cursor-pointer' to={'favourite'}>
            Favourite
            <CiHeart className='relative top-1 left-1' />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

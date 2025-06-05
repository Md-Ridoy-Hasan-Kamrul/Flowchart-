import { useContext, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useTheme } from '../../context/ThemeContext/ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const logOutHandler = () => {
    logOutUser();
    toast.success('LogOut Successful');
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const imagePath =
    theme === 'light-mode'
      ? '/images/black_logo.png'
      : '/images/white_logo.png';

  return (
    <nav className='bg-background text-white h-24'>
      <div className='max-w-[1400px] mx-auto flex justify-between items-center h-full px-6 py-6'>
        {/* Left: Logo container with fixed width */}
        <div className='w-[250px] flex items-center justify-center'>
          <Link to='/'>
            <img src='/logo.png' alt='Logo' />{' '}
          </Link>
        </div>

        {/* Middle: Desktop Menu */}
        <div
          className='hidden md:flex gap-6 text-md font-bold cursor-pointer items-center'
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          {user ? (
            <button onClick={logOutHandler} className='hover:text-gray-300'>
              Logout
            </button>
          ) : (
            <Link to='/login' className='hover:text-gray-300'>
              Login
            </Link>
          )}
          <Link to='/register' className='hover:text-gray-300'>
            Registration
          </Link>
          <Link to='/flowchart' className='hover:text-gray-300'>
            Flowchart
          </Link>
          <Link to='/flow' className='hover:text-gray-300'>
            Flowchart
          </Link>

          {/* Animated Theme Toggle Switch (Desktop) - Updated for visibility */}
          <div className='flex items-center ml-4'>
            <button
              onClick={toggleTheme}
              className={`
                relative flex items-center justify-between  border border-white
                w-35 h-10  rounded-full
                transition-colors duration-300 ease-in-out
                ${theme === 'dark-mode' ? 'bg-[#152E6C]' : 'bg-[#A00000]'}
                 // Slider এর বাইরে content না দেখানোর জন্য
              `}
            >
              {/* This is the moving background/slider */}
              <span
                className={`
                  absolute top-0 pr-2 px-2
                  w-1/2 h-full rounded-full
                  flex items-center justify-center // আইকন ও টেক্সট সেন্টারে রাখার জন্য
                  transition-transform duration-300 ease-in-out
                  ${
                    theme === 'light-mode'
                      ? 'translate-x-0 bg-background text-white border border-white '
                      : 'translate-x-full bg-background text-white border border-white '
                  }
                `}
                style={{
                  boxShadow:
                    theme === 'light-mode'
                      ? '0 0 8px rgba(0, 0, 0, 0.3)'
                      : 'none',
                }}
              >
                {/* স্লাইডারের ভিতরের আইকন ও টেক্সট */}
                {theme === 'light-mode' ? (
                  <>
                    <FaSun className='text-xl' />
                    <span className='ml-1 text-sm font-semibold'>Blue</span>
                  </>
                ) : (
                  <>
                    <FaMoon className='text-xl' />
                    <span className='ml-1 text-sm font-semibold'>Red</span>
                  </>
                )}
              </span>

              {/* Fixed "Light" text and icon (Visible when Dark mode is active) */}
              <span
                className={`
                  absolute left-0 w-1/2 h-full
                  flex items-center justify-center
                  z-10 // Ensure text is above the slider
                  ${
                    theme === 'dark-mode'
                      ? 'text-gray-300 opacity-100'
                      : 'text-white opacity-0'
                  }
                  transition-opacity duration-300
                `}
              >
                <div className='flex items-center justify-center px-1 '>
                  <FaSun className='text-xs	' />
                  <span className='ml-1 text-xs	 '>Blue</span>
                </div>
              </span>

              {/* Fixed "Dark" text and icon (Visible when Light mode is active) */}
              <span
                className={`
                  absolute right-0 w-1/2 h-full
                  flex items-center justify-center
                  z-10 // Ensure text is above the slider
                  ${
                    theme === 'light-mode'
                      ? 'text-white opacity-100'
                      : 'text-gray-300 opacity-0'
                  }
                  transition-opacity duration-300
                `}
              >
                <div className='flex items-center justify-center px-1'>
                  <FaMoon className='text-xs	' />
                  <span className='ml-1 text-xs	 font-semibold'>Red</span>
                </div>
              </span>
            </button>
          </div>
        </div>

        {/* Right: Mobile Hamburger with same fixed width */}
        <div className='md:hidden w-[80px] flex justify-center relative'>
          <button
            onClick={toggleMenu}
            className='text-2xl focus:outline-none'
            aria-label='Toggle menu'
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className='absolute top-full right-0 mt-10 w-52 bg-[#19398a] rounded-md shadow-lg z-50 flex flex-col py-2'>
              {user ? (
                <button
                  onClick={logOutHandler}
                  className='px-4 py-2 text-left hover:bg-[#2c4aab]'
                >
                  Logout
                </button>
              ) : (
                <Link
                  to='/login'
                  onClick={closeMenu}
                  className='px-4 py-2 hover:bg-[#2c4aab]'
                >
                  Login
                </Link>
              )}
              <Link
                to='/register'
                onClick={closeMenu}
                className='px-4 py-2 hover:bg-[#2c4aab]'
              >
                Registration
              </Link>
              <Link
                to='/flowchart'
                onClick={closeMenu}
                className='px-4 py-2 hover:bg-[#2c4aab]'
              >
                Flowchart
              </Link>
              {/* Animated Theme Toggle Switch (Mobile - Using React Icons) */}
              <button
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className='px-4 py-2 hover:bg-[#2c4aab] flex items-center gap-2 text-left '
              >
                {/* মোবাইল মেনুতে সরাসরি থিম আইকন ও টেক্সট দেখাবে */}
                {theme === 'dark-mode' ? (
                  <>
                    <div className='flex items-center justify-center px-1 border border-whit rounded-lg p-2 '>
                      <FaMoon className='text-sm' />
                      <span className='ml-2 text-xs	 text-white '>Red Mode</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex items-center justify-center px-1 border border-white p-2 rounded-lg'>
                      <FaSun className='text-sm' />
                      <span className='ml-2 text-xs	text-white'>Blue Mode</span>
                    </div>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

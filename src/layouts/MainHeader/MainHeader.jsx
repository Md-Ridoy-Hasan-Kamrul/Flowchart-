import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    logOutUser();
    toast.success('LogOut Successful');
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className='bg-[#19398a] text-white h-24'>
      <div className='max-w-[1400px] mx-auto flex justify-between items-center h-full px-6 py-6'>
        {/* Left: Logo container with fixed width */}
        <div className='w-[250px] flex items-center justify-center'>
          <Link to='/'>
            <img src='/logo.png' alt='Logo' />
          </Link>
        </div>

        {/* Middle: Desktop Menu */}
        <div
          className='hidden md:flex gap-6 text-md font-bold cursor-pointer'
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          {user ? (
            <button onClick={logOutHandler}>Logout</button>
          ) : (
            <Link to='/login' className='hover:text-gray-300'>
              Login
            </Link>
          )}
          <Link to='/register' className='hover:text-gray-300'>
            Registration
          </Link>
          <Link to="/flowchart" className="hover:text-gray-300">
            Flowchart
          </Link>
          
        </div>

        {/* Right: Mobile Hamburger with same fixed width */}
        <div className='md:hidden w-[80px] flex justify-center relative'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-2xl focus:outline-none'
            aria-label='Toggle menu'
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className='absolute top-full right-0 mt-10 w-48 bg-[#19398a] rounded-md shadow-lg z-50 flex flex-col py-2'>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

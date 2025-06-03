import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext/ThemeProvider';

function RegisterPage() {
  const { createUser, isLoading, setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      setIsLoading(true);
      const userCredential = await createUser(email, password);
      toast.success('Account created successfully!');
      navigate('/flowchart');
    } catch (error) {
      toast.error(error.message || 'Registration failed!');
    } finally {
      setIsLoading(false);
    }
  };
  const { theme } = useTheme();
  const themeImageMap = {
    'light-mode': './finalblue.png',
    'dark-mode': './finalRed.png',
  };

  return (
    // Apply the font family to the main section to affect all its children
    <section
      className='min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 flex items-center justify-center px-6 py-12'
      style={{ fontFamily: 'var(--font-secondary)' }}
    >
      <div className='container max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden h-full'>
        {/* Left Image Section */}
        <div className='md:w-1/2 hidden md:block p-12'>
          <img
            src={themeImageMap[theme] || './finalblue.png'}
            alt='Login Visual'
            className='object-cover w-full h-full'
          />
        </div>

        {/* Right Form Section */}
        <div className='md:w-1/2 w-full p-10 flex flex-col justify-center h-full'>
          <h2 className='text-3xl font-extrabold text-[#19398A] text-center mb-10'>
            Create an Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className='space-y-6'
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-semibold text-gray-700'
              >
                Full Name
              </label>
              <input
                id='name'
                type='text'
                placeholder='Your full name'
                {...register('name', { required: 'Full name is required' })}
                className={`w-full px-5 py-3 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19398A] transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'var(--font-secondary)' }} // Apply directly to input
              />
              {errors.name && (
                <p className='mt-1 text-red-600 text-sm'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-semibold text-gray-700'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                autoComplete='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full px-5 py-3 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19398A] transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'var(--font-secondary)' }} // Apply directly to input
              />
              {errors.email && (
                <p className='mt-1 text-red-600 text-sm'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-semibold text-gray-700'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                placeholder='********'
                autoComplete='new-password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`w-full px-5 py-3 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19398A] transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'var(--font-secondary)' }} // Apply directly to input
              />
              {errors.password && (
                <p className='mt-1 text-red-600 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3 rounded-xl bg-background text-white font-semibold text-lg hover:bg-[#152e6c] disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-3 transition'
              style={{ fontFamily: 'var(--font-secondary)' }} // Apply directly to button
            >
              {isLoading && (
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                  ></path>
                </svg>
              )}
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Link to Login */}
          <p className='mt-6 text-center text-gray-600'>
            Already have an account?{' '}
            <a
              href='/login'
              className='text-[#19398A] font-semibold hover:underline'
              style={{ fontFamily: 'var(--font-secondary)' }} // Apply directly to link
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;

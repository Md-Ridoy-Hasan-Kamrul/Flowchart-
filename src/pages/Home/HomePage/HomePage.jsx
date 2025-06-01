import { motion } from 'framer-motion';

function HomePage() {
  return (
    <div className='bg-[#E2EFFF] flex flex-col min-h-screen'>
      <section className='flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <motion.h1
          className='
            relative whitespace-nowrap
            text-center
            text-4xl sm:text-5xl md:text-6xl
            font-serif
            bg-gradient-to-r from-[#19398A] via-[#A2C77A] to-[#BC0A41]
            bg-clip-text text-transparent
          '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          Welcome to Bundoora
          <motion.span
            className='
              absolute top-0 left-0 h-full w-1/3
              bg-[#E2EFFF] opacity-30 blur-xl rotate-12
            '
            animate={{ x: ['-100%', '150%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            &nbsp;
          </motion.span>
        </motion.h1>

        <motion.img
          src='/hero.png'
          alt='Hero'
          className='max-w-full h-auto mt-6'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        />
      </section>
      
    </div>
  );
}

export default HomePage;

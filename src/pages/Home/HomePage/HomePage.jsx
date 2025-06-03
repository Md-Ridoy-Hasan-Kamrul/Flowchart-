import { motion } from 'framer-motion';

function HomePage() {
  return (
    <div className='bg-white flex flex-col min-h-screen'>
      <section className='flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='relative'>
          <motion.h1
            className='
              relative whitespace-nowrap
              text-center font-semibold
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
          </motion.h1>

          {/* Wave Animated Underline */}
          <div className='absolute w-full h-4 bottom-[-14px] overflow-hidden'>
            <motion.div
              className='h-full w-1/3 rounded-full opacity-70 blur-sm'
              style={{
                background: 'linear-gradient(90deg, #19398A, #A2C77A, #BC0A41)',
              }}
              animate={{
                x: ['-100%', '130%'],
                y: [0, -5, 0, 5, 0], // wave motion
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

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

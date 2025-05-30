// components/PopupModal/PopupModal.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { TbMessageShare } from 'react-icons/tb';

const PopupModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='bg-black/30 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
          >
            <TbMessageShare className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />
            <div className='relative z-10'>
              <div className='bg-white w-16 h-16 mb-4 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto'>
                <TbMessageShare />
              </div>
              <h3 className='text-3xl font-bold text-center mb-6'>
                Choose One!
              </h3>
              {/* <p className='text-center mb-6'>{message}</p> */}
              <div className='flex gap-2'>
                <button
                  onClick={onClose}
                  className='relative group w-full py-2 rounded-full bg-transparent text-white font-semibold overflow-hidden transition-colors hover:bg-white/10'
                >
                  <span className='relative z-10'>Skip</span>
                  <div className='absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 blur-sm'></div>
                </button>

                <button
                  onClick={onConfirm}
                  className='relative group w-full py-2 rounded-full bg-white text-indigo-600 font-semibold transition-all hover:opacity-90 active:scale-95'
                >
                  <span className='relative z-10 text-transparent bg-gradient-to-tr from-neutral-800 to-neutral-600 bg-clip-text'>
                    Next
                  </span>
                  <div className='absolute inset-0 rounded-full bg-gradient-to-br from-black/20 via-transparent to-transparent opacity-25 blur-sm mix-blend-multiply'></div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;

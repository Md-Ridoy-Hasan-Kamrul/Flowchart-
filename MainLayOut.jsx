import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ScrollToTop } from './src/components/ScrollToTop/ScrollToTop';
import MainFooter from './src/layouts/MainFooter/MainFooter';
import MainHeader from './src/layouts/MainHeader/MainHeader';
<<<<<<< HEAD

=======
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f
function MainLayout() {
  return (
    <>
      <header>
        <MainHeader />
      </header>

      <main>
        <Outlet />
      </main>
      <footer>
        <MainFooter />
      </footer>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme='colored'
      />

      <ScrollToTop />
    </>
  );
}

export default MainLayout;
<<<<<<< HEAD


=======
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f

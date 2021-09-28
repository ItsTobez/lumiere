import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

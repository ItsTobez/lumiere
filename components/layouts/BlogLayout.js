import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';
import ProseContainer from '@components/ui/ProseContainer';

export default function BlogLayout({ children }) {
  return (
    <>
      <Header />
      <ProseContainer>{children}</ProseContainer>
      <Footer />
    </>
  );
}

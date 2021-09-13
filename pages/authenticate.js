import { signIn } from 'next-auth/react';
import Layout from '@components/layouts/Layout';

export default function Authenticate() {
  return (
    <>
      <button type='button' onClick={() => signIn('github')} className='border'>
        Github
      </button>
    </>
  );
}

Authenticate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

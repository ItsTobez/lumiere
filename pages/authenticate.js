import { signIn } from 'next-auth/react';

export default function Authenticate() {
  return (
    <>
      <button type='button' onClick={() => signIn('github')} className='border'>
        Github
      </button>
    </>
  );
}

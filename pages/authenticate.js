import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';

export default function Authenticate({ providers }) {
  const redirectUrl = useRef();

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl.current = url.searchParams.get('callbackUrl');
  }, []);

  return (
    <main className='h-screen grid place-items-center bg-black'>
      <div className='absolute top-5 left-6'>
        <Link href='/'>
          <a>
            <figure className='relative w-14 h-14'>
              <Image
                src={projectLumiere}
                alt='Project Lumiere logo'
                layout='fill'
                objectFit='contain'
              />
            </figure>
          </a>
        </Link>
      </div>
      <div className='relative'>
        <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 animate-tilt animate-pulse'></div>
        <section className='relative max-w-3xl px-7 py-4 rounded-lg bg-black'>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => {
                signIn(provider.id, {
                  callbackUrl: redirectUrl.current,
                });
              }}
            >
              <p>Sign in with {provider.name}</p>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

Authenticate.getLayout = function getLayout(page) {
  return page;
};

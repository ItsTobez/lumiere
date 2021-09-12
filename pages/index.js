// pages/index.js maps to projectlumiere.org/ (our homepage)
// See https://nextjs.org/docs/routing/introduction#index-routes

import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import hackPlus from '@public/images/logos/HackPlus.svg';
import { Gradient } from '@lib/gradient';
import Layout from '@components/layouts/Layout';
import { FiChevronRight } from 'react-icons/fi';

export default function Home() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('.gradient-canvas');
  }, []);

  return (
    <>
      <Head>
        <title>Project Lumiere</title>
        <meta name='description' content='Project Lumiere website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='relative -mt-44 h-108'>
        <canvas
          className='gradient-canvas absolute top-0'
          data-js-darken-top
          data-transition-in
        />
      </div>

      <main className='container -mt-32'>
        <section className='mt-14 flex'>
          <div className='max-w-xl z-10'>
            <h1 className='heading-primary'>
              Jumpstart your{' '}
              <span className='gradient-text'>Computer Science</span> career
              now.
            </h1>
            <p className='mt-8 pr-8 text-lg'>
              Project Lumiere is a media publication platform that accelerates
              students in creating CompSci content. We make it easy for our
              creators to gain an audience and build a name in the industry.
            </p>
            <div className='mt-20 flex'>
              <button className='flex items-center mr-6 button-secondary pl-4 pr-2 py-2 text-xs'>
                <p className='mr-2'>Get started</p>
                <FiChevronRight className='w-5 h-5' />
              </button>
              <button className='button-tertiary px-4 py-2 text-xs'>
                Support us
              </button>
            </div>
          </div>
        </section>

        <section className='mt-48'>
          <div className='flex justify-between'>
            <figure className='relative w-36 h-12'>
              <Image
                src={hackPlus}
                alt='Hack Plus Logo'
                layout='fill'
                objectFit='contain'
              />
            </figure>
            <figure className='relative w-36 h-12'>
              <div className='bg-gray-600 h-full grid place-items-center'>
                Logo
              </div>
            </figure>
            <figure className='relative w-36 h-12'>
              <div className='bg-gray-600 h-full grid place-items-center'>
                Logo
              </div>
            </figure>
            <figure className='relative w-36 h-12'>
              <div className='bg-gray-600 h-full grid place-items-center'>
                Logo
              </div>
            </figure>
            <figure className='relative w-36 h-12'>
              <div className='bg-gray-600 h-full grid place-items-center'>
                Logo
              </div>
            </figure>
          </div>
        </section>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

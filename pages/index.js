// pages/index.js maps to projectlumiere.org/ (our homepage)
// See https://nextjs.org/docs/routing/introduction#index-routes

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import hackPlus from '@public/images/logos/HackPlus.svg';
import { Gradient } from '@lib/gradient';
import { FiChevronRight } from 'react-icons/fi';
import Layout from '@components/layouts/Layout';

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
      </Head>

      <div className='relative -mt-44 h-[396px] lg:h-[360px] sm:h-[320px]'>
        <canvas
          className='gradient-canvas absolute top-0'
          data-js-darken-top
          data-transition-in
        />
      </div>

      <div className='container -mt-32 lg:-mt-28 sm:-mt-9'>
        <section className='mt-14 sm:mt-0 flex'>
          <div className='max-w-xl z-10'>
            <h1 className='heading-primary'>
              Jumpstart your{' '}
              <span className='gradient-text'>Computer Science</span> career
              today.
            </h1>
            <p className='mt-10 pr-8 text-lg lg:text-base lg:pr-14 sm:text-sm sm:pr-0 sm:leading-relaxed xs:text-xs'>
              Project Lumiere is a media publication platform that accelerates
              students creating CompSci content. We make it easy for our
              creators to learn in public and simultaneously gain an audience.
            </p>
            <div className='mt-20 sm:mt-10 flex'>
              <Link href='/press'>
                <a className='flex items-center mr-6 button-secondary pl-4 pr-2 py-2 text-xs lg:text-2xs sm:pl-3 sm:pr-1.5 sm:py-1.5'>
                  <p className='mr-2'>See Publications</p>
                  <FiChevronRight className='w-5 h-5 lg:w-4 lg:h-4' />
                </a>
              </Link>
              <button
                type='button'
                className='button-tertiary px-4 py-2 text-xs lg:text-2xs sm:py-1.5 beta'
              >
                Support us
              </button>
            </div>
          </div>
        </section>

        <section className='mt-48'>
          <div className='flex justify-between flex-wrap'>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7'>
              <Image
                src={hackPlus}
                alt='Hack Plus Logo'
                layout='fill'
                objectFit='contain'
              />
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7 beta'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7 beta'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7 beta'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7 beta'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
          </div>
        </section>

        <main className='mb-36'>
          {/* <section className='mt-48'>
            <h2 className='heading-secondary'>
              Create beautiful and informative content
            </h2>
          </section>

          <section className='mt-48'>
            <h2 className='heading-secondary'>Technical writing, done right</h2>
          </section>

          <section className='mt-48'>
            <h2 className='heading-secondary'>
              Developed, managed, and run by students
            </h2>
          </section> */}
        </main>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

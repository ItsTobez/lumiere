import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import hackPlus from '@public/images/logos/HackPlus.svg';
import { Gradient } from '@lib/gradient';
import { FiChevronRight } from 'react-icons/fi';
import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';

export default function Home() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('.home-gradient-canvas');
  }, []);

  return (
    <div className='bg-gray-900'>
      <Head>
        <title>Lumiere | Beautiful CS Publications</title>
        <meta name='description' content='Lumiere website' />
      </Head>

      <Header pageType='home' />

      <div className='relative -mt-44 h-[396px] lg:h-[360px] sm:h-[320px]'>
        <canvas
          className='home-gradient-canvas absolute top-0'
          data-js-darken-top
          data-transition-in
        />
      </div>

      <div className='container -mt-32 lg:-mt-28 sm:-mt-9'>
        <section className='mt-14 sm:mt-0 flex'>
          <div className='max-w-xl z-10'>
            <h1 className='heading-primary !text-white'>
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
                <a className='flex items-center mr-6 button-secondary pl-4 pr-2 py-2 text-xs lg:text-2xs sm:pl-3 sm:pr-1.5 sm:py-1.5 !bg-gray-700 !border-gray-700 !text-gray-200 !hover:bg-gray-900 !hover:border-gray-300'>
                  <p className='mr-2'>See Publications</p>
                  <FiChevronRight className='w-5 h-5 lg:w-4 lg:h-4' />
                </a>
              </Link>
              <button
                type='button'
                className='button-tertiary px-4 py-2 text-xs lg:text-2xs sm:py-1.5 beta !border-gray-700 !text-gray-400 !hover:text-gray-300'
              >
                Support us
              </button>
            </div>
          </div>
        </section>

        <section className='mt-48 mb-32'>
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
      </div>

      <hr className='container border-gray-800' />

      <main className='mt-28 container'>
        <section>
          <div className='relative inline-block -rotate-6'>
            <div className='absolute bg-gradient-to-tr from-purple-600 to-blue-600 -inset-0.5 rounded-lg blur-xl opacity-40'></div>
            <div className='relative px-7 py-4 bg-gray-900 opacity-90 rounded-lg leading-none'>
              <pre className='language-jsx leading-normal text-xs'>
                <code className='language-jsx'>
                  <span className='token comment'>
                    {'// header component w/ navbar'}
                  </span>
                  <br />
                  <span className='token keyword module'>export</span>{' '}
                  <span className='token keyword module'>default</span>{' '}
                  <span className='token keyword'>function</span>{' '}
                  <span className='token function'>
                    <span className='token maybe-className-name'>Header</span>
                  </span>
                  <span className='token punctuation'>(</span>
                  <span className='token punctuation'>)</span>{' '}
                  <span className='token punctuation'>{'{'}</span>
                  <br />
                  <span className='token keyword control-flow ml-4'>
                    return
                  </span>{' '}
                  <span className='token punctuation'>(</span>
                  <br />
                  <span className='token tag'>
                    <span className='token tag'>
                      <span className='token punctuation ml-8'>&lt;</span>div
                    </span>
                    <span className='token punctuation'>&gt;</span>
                  </span>
                  <br />
                  <span className='token plain-text'></span>
                  <span className='token tag'>
                    <span className='token tag'>
                      <span className='token punctuation ml-12'>&lt;</span>
                      header
                    </span>
                    <span className='token punctuation'>&gt;</span>
                  </span>
                  <span className='token plain-text'>Header</span>
                  <span className='token tag'>
                    <span className='token tag'>
                      <span className='token punctuation'>&lt;/</span>header
                    </span>
                    <span className='token punctuation'>&gt;</span>
                  </span>
                  <span className='token plain-text'></span>
                  <br />
                  <span className='token tag'>
                    <span className='token tag'>
                      <span className='token punctuation ml-8'>&lt;/</span>div
                    </span>
                    <span className='token punctuation'>&gt;</span>
                  </span>
                  <br />
                  <span className='token punctuation ml-4'>)</span>
                  <span className='token punctuation'>;</span>
                  <br />
                  <span className='token punctuation'>{'}'}</span>
                </code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

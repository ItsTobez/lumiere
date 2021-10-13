import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import hackPlus from '@public/images/logos/HackPlus.svg';
import hackClub from '@public/images/logos/HackClub.svg';
import { Gradient } from '@lib/gradient';
import { FiChevronRight } from 'react-icons/fi';
import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';
import { useLocalStorage } from 'react-use';
import Tweet from '@components/ui/Tweet';
import { getTweets } from '@lib/twitter';
import { FaMarkdown, FaReact } from 'react-icons/fa';

export default function Home({ tweets }) {
  const [value, setValue] = useLocalStorage('refresh', false);

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('.home-gradient-canvas');
    if (value) {
      location.reload();
      setValue(false);
    }
  }, [value, setValue]);

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
            <h1 className='heading-primary text-gray-100'>
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
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7'>
              <Image
                src={hackClub}
                alt='Hack Plus Logo'
                layout='fill'
                objectFit='contain'
              />
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
            <figure className='relative w-32 h-12 lg:w-28 lg:h-9 md:w-24 md:h-7'>
              <div className='bg-gray-800 h-full grid place-items-center'></div>
            </figure>
          </div>
        </section>
      </div>

      <hr className='container border-gray-800' />

      <main className='mt-32 container'>
        <section className='flex justify-between items-center'>
          <figure className='flex-1'>
            <div className='group relative -rotate-3 group z-10'>
              <div className='absolute bg-gradient-to-tr from-amber-600 to-pink-600 -inset-0.5 rounded-lg blur-2xl group-hover:blur-xl group-hover:opacity-60 transition-all duration-200 opacity-50' />
              <Tweet key={tweets[0].id} forceDark {...tweets[0]} />
            </div>
            <div className='group relative inline-block rotate-3 bottom-4 left-28'>
              <div className='absolute bg-gradient-to-tr from-purple-600 to-blue-600 -inset-0.5 rounded-lg blur-2xl group-hover:blur-xl group-hover:opacity-60 transition-all duration-200 opacity-50' />
              <div className='relative px-7 py-4 bg-gray-900 opacity-90 rounded-lg leading-none'>
                <pre className='language-jsx leading-normal text-2xs'>
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
          </figure>
          <div className='flex-1 ml-32'>
            <h2 className='heading-secondary text-gray-200'>
              The most cutting-edge editing experience.
            </h2>
            <p className='mt-12 leading-relaxed'>
              Our live{' '}
              <a href='https://mdxjs.com/' target='_blank' rel='noreferrer'>
                MDX
              </a>{' '}
              editor empowers creators with capabilities never seen in
              traditional publication platforms. We support the entire
              GFM-Compliant{' '}
              <a
                href='https://daringfireball.net/projects/markdown/'
                target='_blank'
                rel='noreferrer'
              >
                Markdown
              </a>{' '}
              spec, in addition to an infinitely extensible set of{' '}
              <a href='https://reactjs.org/' target='_blank' rel='noreferrer'>
                React
              </a>{' '}
              components.
            </p>
            <hr className='border-gray-800 mt-9' />
            <div className='mt-6 flex items-center'>
              <FaMarkdown className='h-10 w-10 text-gray-500 hover:text-gray-300 transition-colors' />
              <FaReact className='h-8 w-8 ml-6 text-gray-500 hover:text-gray-300 transition-colors' />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const tweets = await getTweets(['1395436062411984899']);

  return { props: { tweets } };
};

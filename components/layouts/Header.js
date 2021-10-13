import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Popover } from '@headlessui/react';
import Avatar from '@components/ui/Avatar';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { Gradient } from '@lib/gradient';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';

export default function Header({
  pageType,
  setTitle,
  title,
  titleInput,
  setSlug,
  saveDraft,
  showUntitledError,
  collapsed,
  setCollapsed,
}) {
  useEffect(() => {
    if (!pageType) {
      const gradient = new Gradient();
      gradient.initGradient('.header-gradient-canvas');
    }
  }, [pageType]);

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (pageType === 'editor') {
    return (
      <>
        <header
          className={`relative h-18 lg:h-16 transition-transform origin-top ${
            collapsed ? 'scale-y-0' : 'scale-y-1'
          } flex items-center border-b border-gray-700 bg-gray-900 px-6`}
        >
          <div className='flex items-center'>
            <Link href='/'>
              <a>
                <figure className='relative w-10 h-10 lg:w-9 lg:h-9 mb-1'>
                  <Image
                    src={projectLumiere}
                    alt='Project Lumiere logo'
                    layout='fill'
                    objectFit='contain'
                  />
                </figure>
              </a>
            </Link>
            {setTitle ? (
              <input
                type='text'
                placeholder='Untitled'
                value={title}
                ref={titleInput}
                className={`rounded-lg bg-transparent text-xl lg:text-lg ml-3 py-2 lg:py-1.5 px-4 w-96 md:w-72 sm:w-48 hover:bg-gray-800 transition-colors text-gray-300 focus:outline-none focus:ring-2 ${
                  title ? 'focus:ring-blue-600' : 'focus:ring-red-600'
                } placeholder-gray-500`}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(
                    e.target.value
                      .replaceAll(/[`~!@#$%^&*()_+={}|[;:'"<>,./?]/g, '')
                      .replaceAll(' ', '-')
                      .toLowerCase()
                  );
                }}
              />
            ) : (
              <input
                type='text'
                value={title}
                className='rounded-lg bg-transparent text-xl ml-3 py-2 px-4 w-96 hover:bg-gray-800 transition-colors text-gray-300 cursor-not-allowed'
                disabled
              />
            )}
          </div>
          <div className='flex ml-auto'>
            <button
              className='button-tertiary text-xs lg:text-2xs px-4 py-3 mr-6'
              onClick={title ? saveDraft : showUntitledError}
            >
              Save draft
            </button>
            <Avatar
              profileImageSrc={session.user.image}
              profileName={session.user.name}
              renderPosition='fullscreen'
              pageType='editor'
            />
          </div>
        </header>
        <button
          className='rounded-b-md hover:rounded-b-full bg-gray-600 w-8 h-6 grid place-items-center absolute left-1/2 -translate-x-1/2 top-0 -translate-y-4 hover:translate-y-0 transition-all z-50'
          onClick={() => setCollapsed(!collapsed)}
        >
          <FiChevronUp
            className={`w-5 h-5 text-gray-100 -mt-0.5 transition-transform ${
              collapsed && 'rotate-180'
            }`}
          />
        </button>
      </>
    );
  } else if (pageType === 'home') {
    return (
      <header className='sticky top-0 z-50 backdrop-filter backdrop-saturate-200 backdrop-blur-sm h-18 lg:h-16 flex items-center border-b border-gray-700 bg-gray-900 bg-opacity-90'>
        <div className='container flex items-center'>
          <div className='border-r border-gray-700 pr-8 lg:pr-7 md:border-0 md:pr-0'>
            <Link href='/'>
              <a>
                <figure className='flex items-center'>
                  <div className='relative w-10 lg:w-8 h-10 lg:h-8 mr-1.5 mb-1'>
                    <Image
                      src={projectLumiere}
                      alt='Project Lumiere logo'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  <figcaption className='text-gray-200 text-2xl lg:text-xl font-semibold'>
                    Lumiere
                  </figcaption>
                </figure>
              </a>
            </Link>
          </div>
          <nav className='md:hidden'>
            <Popover.Group className='flex font-medium text-sm'>
              <Popover className='ml-8 lg:ml-7'>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <div className='flex hover:text-gray-300 transition-colors items-center'>
                        <p className='font-medium lg:text-xs'>Media</p>
                        <FiChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } ml-1 w-5 lg:w-4 h-5 lg:h-4 transition-transform`}
                        />
                      </div>
                    </Popover.Button>
                    <Popover.Panel className='absolute -bottom-5.5 left-0 bg-gray-900 border-b border-gray-700 bg-opacity-90 w-full z-10'>
                      <div className='container'>
                        <Link href='/press'>
                          <a className='block'>Lumiere Press</a>
                        </Link>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
              <Popover className='ml-8 lg:ml-7'>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <div className='flex hover:text-gray-300 transition-colors items-center'>
                        <p className='font-medium lg:text-xs'>Discover</p>
                        <FiChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } ml-1 w-5 lg:w-4 h-5 lg:h-4 transition-transform`}
                        />
                      </div>
                    </Popover.Button>
                    <Popover.Panel className='absolute -bottom-5.5 left-0 bg-gray-900 border-b border-gray-700 bg-opacity-90 w-full z-10'>
                      <div className='container beta'>This is Discover</div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </nav>
          <form className='flex relative items-center ml-auto mr-7 lg:mr-6 md:hidden beta'>
            <input
              type='text'
              name='search'
              placeholder='Search for anything'
              className={`py-3 lg:py-2.5 rounded-lg border-2 bg-transparent ${
                session ? 'pr-18 lg:pr-14' : 'pr-9 lg:pr-8'
              } pl-4 text-sm border-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-gray-600 placeholder-gray-500`}
            />
            <FiSearch className='absolute right-0 mr-4 w-6 h-6 text-gray-600' />
          </form>
          {session ? (
            <Avatar renderPosition='container' />
          ) : (
            <button
              type='button'
              className='text-sm lg:text-xs button-primary px-5 lg:px-4 py-3 lg:py-2.5 md:hidden'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}

          <button
            className='hidden md:grid ml-auto place-items-center rounded-2xl bg-gray-500 hover:bg-gray-400 w-12 h-8 opacity-80 hover:opacity-100 transition'
            onClick={() => setIsOpen(true)}
          >
            <IoReorderThreeOutline className='w-6 h-7 text-gray-100' />
          </button>
        </div>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='fixed z-10 inset-0 overflow-y-scroll'
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-900 opacity-95' />

            <div className='relative rounded w-screen h-screen mx-auto pt-16'>
              <button onClick={() => setIsOpen(false)}>X</button>
              <Dialog.Title>Mobile Navbar</Dialog.Title>
            </div>
          </div>
        </Dialog>
      </header>
    );
  } else {
    return (
      <header className='sticky top-0 z-50 h-18 lg:h-16 flex items-center border-b border-gray-700 bg-gray-900 mb-16'>
        <div className='absolute w-full h-full -mt-60 lg:-mt-64 z-0'>
          <div className='relative h-48'>
            <canvas
              className='header-gradient-canvas absolute top-0'
              data-js-darken-top
              data-transition-in
            />
          </div>
        </div>
        <div className='container flex items-center z-50'>
          <div className='border-r border-gray-700 pr-8 lg:pr-7 md:border-0 md:pr-0'>
            <Link href='/'>
              <a>
                <figure className='flex items-center'>
                  <div className='relative w-10 lg:w-8 h-10 lg:h-8 mr-1.5 mb-1'>
                    <Image
                      src={projectLumiere}
                      alt='Project Lumiere logo'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  <figcaption className='text-gray-200 text-2xl lg:text-xl font-semibold'>
                    Lumiere
                  </figcaption>
                </figure>
              </a>
            </Link>
          </div>
          <nav className='md:hidden'>
            <Popover.Group className='flex font-medium text-sm'>
              <Popover className='ml-8 lg:ml-7'>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <div className='flex hover:text-gray-300 transition-colors items-center'>
                        <p className='font-medium lg:text-xs'>Media</p>
                        <FiChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } ml-1 w-5 lg:w-4 h-5 lg:h-4 transition-transform`}
                        />
                      </div>
                    </Popover.Button>
                    <Popover.Panel className='absolute -bottom-5.5 left-0 bg-gray-900 border-b border-gray-700 bg-opacity-90 w-full z-10'>
                      <div className='container'>
                        <Link href='/press'>
                          <a className='block' onClick={() => setIsOpen(false)}>
                            Lumiere Press
                          </a>
                        </Link>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
              <Popover className='ml-8 lg:ml-7'>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <div className='flex hover:text-gray-300 transition-colors items-center'>
                        <p className='font-medium lg:text-xs'>Discover</p>
                        <FiChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } ml-1 w-5 lg:w-4 h-5 lg:h-4 transition-transform`}
                        />
                      </div>
                    </Popover.Button>
                    <Popover.Panel className='absolute -bottom-5.5 left-0 bg-gray-900 border-b border-gray-700 bg-opacity-90 w-full z-10'>
                      <div className='container beta'>This is Discover</div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </nav>
          <form className='flex relative items-center ml-auto mr-7 lg:mr-6 md:hidden beta'>
            <input
              type='text'
              name='search'
              placeholder='Search for anything'
              className={`py-3 lg:py-2.5 rounded-lg border-2 bg-transparent ${
                session ? 'pr-18 lg:pr-14' : 'pr-9 lg:pr-8'
              } pl-4 text-sm border-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-gray-600 placeholder-gray-500`}
            />
            <FiSearch className='absolute right-0 mr-4 w-6 h-6 text-gray-600' />
          </form>
          {session ? (
            <Avatar renderPosition='container' />
          ) : (
            <button
              type='button'
              className='text-sm lg:text-xs button-primary px-5 lg:px-4 py-3 lg:py-2.5 md:hidden'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}

          <button
            className='hidden md:grid ml-auto place-items-center rounded-2xl bg-gray-500 hover:bg-gray-400 w-12 h-8 opacity-80 hover:opacity-100 transition'
            onClick={() => setIsOpen(true)}
          >
            <IoReorderThreeOutline className='w-6 h-7 text-gray-100' />
          </button>
        </div>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='fixed z-10 inset-0 overflow-y-scroll'
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-900 opacity-95' />

            <div className='relative rounded w-screen h-screen mx-auto pt-16'>
              <button onClick={() => setIsOpen(false)}>X</button>
              <Dialog.Title>Mobile Navbar</Dialog.Title>
            </div>
          </div>
        </Dialog>
      </header>
    );
  }
}

import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Popover } from '@headlessui/react';
import Avatar from '@components/ui/Avatar';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';

export default function Header(props) {
  const { data: session } = useSession();

  if (props.pageType === 'editor') {
    return (
      <header className='relative h-18 flex items-center border-b border-gray-700 bg-gray-900 px-6'>
        <div className='flex items-center'>
          <Link href='/'>
            <a>
              <figure className='relative w-10 h-11 mb-1'>
                <Image
                  src={projectLumiere}
                  alt='Project Lumiere logo'
                  layout='fill'
                  objectFit='contain'
                />
              </figure>
            </a>
          </Link>
          {props.setTitle ? (
            <input
              type='text'
              placeholder='Untitled'
              value={props.title}
              ref={props.titleInput}
              className={`rounded-lg bg-transparent text-xl ml-3 py-2 px-4 w-96 hover:bg-gray-800 transition-colors duration-75 text-gray-300 focus:outline-none focus:ring-2 ${
                props.title ? 'focus:ring-blue-600' : 'focus:ring-red-600'
              } placeholder-gray-500`}
              onClick={(e) => e.target.select()}
              onChange={(e) => {
                props.setTitle(e.target.value);
                props.setSlug(
                  e.target.value.replaceAll(' ', '-').toLowerCase()
                );
              }}
            />
          ) : (
            <input
              type='text'
              value={props.title}
              className='rounded-lg bg-transparent text-xl ml-3 py-2 px-4 w-96 hover:bg-gray-800 transition-colors duration-75 text-gray-300 cursor-not-allowed'
              disabled
            />
          )}
        </div>
        <div className='flex ml-auto'>
          <button
            className='button-tertiary text-xs px-4 mr-6'
            onClick={props.title ? props.saveDraft : props.showUntitledError}
          >
            Save draft
          </button>
          <Avatar
            profileImageSrc={session.user.image}
            profileName={session.user.name}
            renderPosition='fullscreen'
          />
        </div>
      </header>
    );
  } else {
    return (
      <header className='sticky top-0 z-50 backdrop-filter backdrop-saturate-200 backdrop-blur-sm h-18 lg:h-16 flex items-center border-b border-gray-700 bg-gray-900 bg-opacity-90'>
        <div className='container flex items-center'>
          <div className='border-r border-gray-700 pr-8 lg:pr-7'>
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
          <nav>
            <Popover.Group className='flex font-medium text-sm'>
              <Popover className='ml-8 lg:ml-7'>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <div className='flex hover:text-gray-300 transition-colors duration-75 items-center'>
                        <p className='font-medium lg:text-xs'>Discover</p>
                        <FiChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } ml-1 w-5 lg:w-4 h-5 lg:h-4 transition-transform duration-75`}
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
                      <div className='flex hover:text-gray-300 transition-colors duration-75 items-center'>
                        <p className='font-medium lg:text-xs'>Media</p>
                        <FiChevronDown
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } ml-1 w-5 lg:w-4 h-5 lg:h-4 transition-transform duration-75`}
                        />
                      </div>
                    </Popover.Button>
                    <Popover.Panel className='absolute -bottom-5.5 left-0 bg-gray-900 border-b border-gray-700 bg-opacity-90 w-full z-10'>
                      <div className='container'>This is Media</div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </nav>
          <form className='flex relative items-center ml-auto mr-7 lg:mr-6'>
            <input
              type='text'
              name='search'
              placeholder='Search for anything'
              className={`py-3 lg:py-2.5 rounded-lg border-2 bg-transparent ${
                session ? 'pr-16' : 'pr-7'
              } lg:pr-12 pl-4 text-sm border-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-gray-600 placeholder-gray-500`}
            />
            <FiSearch className='absolute right-0 mr-4 w-6 h-6 text-gray-600' />
          </form>
          {session ? (
            <Avatar renderPosition='container' />
          ) : (
            <button
              type='button'
              className='text-sm lg:text-xs button-primary px-5 lg:px-4 py-3 lg:py-2.5'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    );
  }
}

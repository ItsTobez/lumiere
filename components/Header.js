import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Popover } from '@headlessui/react';
import Avatar from '@components/Avatar';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className='sticky top-0 z-50 backdrop-filter backdrop-saturate-200 backdrop-blur-sm h-18 flex items-center border-b border-gray-500 bg-gray-700 bg-opacity-90'>
      <div className='container flex items-center'>
        <div className='border-r border-gray-500 pr-8'>
          <Link href='/'>
            <a>
              <figure className='flex items-center'>
                <div className='relative w-10 h-10 mr-2 mb-1'>
                  <Image
                    src={projectLumiere}
                    alt='Project Lumiere logo'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
                <figcaption className='text-gray-200 text-2xl font-semibold'>
                  Lumiere
                </figcaption>
              </figure>
            </a>
          </Link>
        </div>
        <nav>
          <Popover.Group className='flex font-medium text-sm'>
            <Popover className='ml-8'>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <div className='flex hover:text-gray-300 transition-colors'>
                      <p className='font-medium'>Discover</p>
                      <FiChevronDown
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } ml-1 w-5 h-5 transition-transform`}
                      />
                    </div>
                  </Popover.Button>
                  <Popover.Panel className='absolute -bottom-5 left-0 bg-gray-700 opacity-80 w-full z-10'>
                    <div className='container'>
                      <Link href='/settings'>
                        <a>Go to settings</a>
                      </Link>
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
            <Popover className='ml-8'>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <div className='flex hover:text-gray-300 transition-colors'>
                      <p className='font-medium'>Media</p>
                      <FiChevronDown
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } ml-1 w-5 h-5 transition-transform`}
                      />
                    </div>
                  </Popover.Button>
                  <Popover.Panel className='absolute -bottom-5 left-0 bg-gray-700 opacity-80 w-full z-10'>
                    <div className='container'>This is Discover</div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </Popover.Group>
        </nav>
        <form className='flex relative items-center ml-auto mr-7'>
          <input
            type='text'
            name='search'
            placeholder='Search for anything'
            className='py-3 rounded-lg border-2 bg-transparent pr-16 pl-5 text-sm border-gray-500'
          />
          <FiSearch className='absolute right-0 mr-5 w-6 h-6' />
        </form>
        {session ? (
          <Avatar
            profileImageSrc={session.user.image}
            profileName={session.user.name}
          />
        ) : (
          <button
            type='button'
            className='text-sm button-primary px-5 py-3'
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';

export default function Avatar({ renderPosition }) {
  const { data: session } = useSession();

  return (
    <Menu as='div' className='md:hidden'>
      <Menu.Button className='flex cursor-pointer'>
        <div className='p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full hover:opacity-80 transition-opacity duration-75'>
          <div className='p-0.5 bg-gray-900 rounded-full'>
            <figure className='relative w-10 lg:w-9 h-10 lg:h-9'>
              <Image
                src={session.user.image}
                alt={`Picture of ${session.user.name}`}
                layout='fill'
                objectFit='contain'
                className='rounded-full'
              />
            </figure>
          </div>
        </div>
      </Menu.Button>

      <Menu.Items as='div' className='absolute w-full left-0 bottom-0 z-10'>
        <div
          className={`${
            renderPosition === 'container' && 'container'
          } relative`}
        >
          <Menu.Item
            as='div'
            className={`absolute ${
              renderPosition === 'container'
                ? 'right-12 bg-opacity-95 xl:right-8'
                : 'right-4'
            } top-0.25 rounded-b-lg bg-gray-800 border-b border-l border-r border-gray-700`}
          >
            <div className='flex justify-between items-center border-b border-gray-700 px-7 py-5 beta'>
              <Link href='/me/settings'>
                <a className='block p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full hover:opacity-80 transition-opacity duration-75'>
                  <div className='p-0.5 bg-gray-900 rounded-full'>
                    <figure className='relative w-8 h-8'>
                      <Image
                        src={session.user.image}
                        alt={`Picture of ${session.user.name}`}
                        layout='fill'
                        objectFit='contain'
                        className='rounded-full'
                      />
                    </figure>
                  </div>
                </a>
              </Link>
              <div className='ml-4'>
                <Link href='/me/settings'>
                  <a className='text-gray-300 hover:text-gray-200 transition-colors duration-75 font-medium inline-block'>
                    {session.user.username}
                  </a>
                </Link>
                <Link href='/me/settings'>
                  <a className='block text-sm hover:text-gray-300 transition-colors duration-75'>
                    {session.user.email}
                  </a>
                </Link>
              </div>
            </div>
            <div className='my-4'>
              <Link href='/editor'>
                <a className='px-7 py-2 block hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70 transition-all duration-75'>
                  New Publication
                </a>
              </Link>
              <Link href='/me/drafts'>
                <a className='px-7 py-2 block hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70 transition-all duration-75'>
                  Drafts
                </a>
              </Link>
              <Link href='/me/publications'>
                <a className='px-7 py-2 block hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70 transition-all duration-75'>
                  Publications
                </a>
              </Link>
            </div>
            <div className='pt-4 mb-4 border-t border-gray-700'>
              <Link href='/me/statistics'>
                <a className='px-7 py-2 block hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70 transition-all duration-75'>
                  Statistics
                </a>
              </Link>
              <Link href='/me/settings'>
                <a className='px-7 py-2 block hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70 transition-all duration-75'>
                  Settings
                </a>
              </Link>
            </div>
            <div className='flex justify-center'>
              <button
                className='text-sm block w-full bg-gray-700 hover:bg-gray-600 transition-colors duration-75 text-gray-200 rounded-b-md py-4'
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign out
              </button>
            </div>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

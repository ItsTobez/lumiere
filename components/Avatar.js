import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';

export default function Avatar({ renderPosition }) {
  const { data: session } = useSession();

  return (
    <Menu>
      <Menu.Button className='flex cursor-pointer'>
        <div className='p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full'>
          <div className='p-0.5 bg-gray-800 rounded-full'>
            <figure className='relative w-10 h-10'>
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

      {renderPosition === 'container' && (
        <Menu.Items as='div' className='absolute w-full left-0 bottom-0 z-10'>
          <div className='container relative'>
            <Menu.Item
              as='div'
              className='absolute right-12 top-0.25 rounded-b-lg bg-gray-700 opacity-90 px-10 py-8'
            >
              <p>{session.user.username}</p>
              <p>{session.user.email}</p>
              <p>{session.user.id}</p>
              <Link href='/editor'>
                <a className='block'>New Publication</a>
              </Link>
              <Link href='/me/drafts'>
                <a className='block'>Drafts</a>
              </Link>
              <Link href='/me/publications'>
                <a className='block'>Publications</a>
              </Link>
              <button
                className='text-sm button-primary px-5 py-3'
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      )}

      {renderPosition === 'fullscreen' && (
        <Menu.Items as='div' className='absolute w-full left-0 bottom-0 z-10'>
          <div className='relative'>
            <Menu.Item
              as='div'
              className='absolute right-4 top-0.25 rounded-b-lg bg-gray-700 opacity-90 px-10 py-8'
            >
              <p>{session.user.username}</p>
              <p>{session.user.email}</p>
              <p>{session.user.id}</p>
              <Link href='/editor'>
                <a className='block'>New Publication</a>
              </Link>
              <Link href='/me/drafts'>
                <a className='block'>Drafts</a>
              </Link>
              <Link href='/me/publications'>
                <a className='block'>Publications</a>
              </Link>
              <button
                className='text-sm button-primary px-5 py-3'
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      )}
    </Menu>
  );
}

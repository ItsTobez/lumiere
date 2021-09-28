import { useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/MDXContent';
import Split from 'react-split';
import { signIn, useSession } from 'next-auth/react';
import Avatar from '@components/ui/Avatar';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const saveDraft = async () => {
    try {
      const body = { title, content, slug };
      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') return null;

  return (
    <>
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
          <input
            type='text'
            placeholder='Untitled'
            value={title}
            className='rounded-lg bg-transparent text-xl ml-3 py-2 px-4 w-96 hover:bg-gray-800 transition-colors duration-75 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500'
            onClick={(e) => e.target.select()}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.replaceAll(' ', '-').toLowerCase());
            }}
          />
        </div>
        <div className='flex ml-auto'>
          <button
            className='button-tertiary text-xs px-4 mr-6'
            onClick={title ? saveDraft : () => setIsOpen(true)}
          >
            Save draft
          </button>
          {session && (
            <Avatar
              profileImageSrc={session.user.image}
              profileName={session.user.name}
              renderPosition='fullscreen'
            />
          )}
        </div>
      </header>

      <Split
        sizes={[50, 50]}
        minSize={200}
        gutterSize={10}
        dragInterval={1}
        snapOffset={30}
        className='split h-editor overflow-y-hidden'
        gutter={(_, direction) => {
          const gutter = document.createElement('div');
          gutter.className = `gutter gutter-${direction}`;
          return gutter;
        }}
      >
        <section>
          <MonacoEditor
            defaultLanguage='markdown'
            value={content}
            theme='vs-dark'
            options={{
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
            }}
            onChange={(value) => setContent(value)}
          />
        </section>
        <article className='break-words overflow-y-auto bg-white px-8 py-12'>
          <MDXContent mdx={content} />
        </article>
      </Split>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10'
          onClose={() => setIsOpen(false)}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-900 opacity-70' />
            </Transition.Child>

            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='relative inline-block w-full max-w-xl text-left align-middle transition-all duration-75 transform rounded-lg'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur opacity-75 animate-tilt animate-pulse'></div>
                <section className='relative bg-gray-900 rounded-lg px-10 py-6'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-medium leading-6'
                  >
                    Set a title
                  </Dialog.Title>

                  <Dialog.Description as='p' className='mt-6'>
                    You must set a title to your publication before saving.
                  </Dialog.Description>

                  <div className='mt-4 flex justify-end'>
                    <button
                      type='button'
                      className='button-tertiary text-sm px-4 py-2.5 mr-3'
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </section>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

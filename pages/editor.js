import { useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/MDXContent';
import Split from 'react-split';
import { signIn, useSession } from 'next-auth/react';
import Avatar from '@components/Avatar';
import { Dialog, Transition } from '@headlessui/react';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const saveDraft = async () => {
    try {
      const body = { title, content };
      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') return null;

  return (
    <>
      <header className='relative h-18 flex items-center border-b border-gray-500 bg-gray-700'>
        <Link href='/'>
          <a>
            <figure className='flex items-center'>
              <div className='relative w-10 h-10 mb-1'>
                <Image
                  src={projectLumiere}
                  alt='Project Lumiere logo'
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            </figure>
          </a>
        </Link>
        {session && (
          <Avatar
            profileImageSrc={session.user.image}
            profileName={session.user.name}
          />
        )}
        <button
          className='button-tertiary text-xs px-4 py-2'
          onClick={() => setIsOpen(true)}
        >
          Save draft
        </button>
      </header>

      <Split
        sizes={[50, 50]}
        minSize={400}
        gutterSize={20}
        dragInterval={1}
        snapOffset={50}
        className='split h-editor overflow-y-hidden'
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
        <section>
          <MDXContent mdx={content} />
        </section>
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
              <Dialog.Overlay className='fixed inset-0' />
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
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-xl bg-black'>
                <Dialog.Title as='h3' className='text-xl font-medium leading-6'>
                  Set a title
                </Dialog.Title>

                <div className='mt-4 flex justify-end'>
                  <button
                    type='button'
                    className='button-tertiary text-xs px-4 py-2 mr-3'
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type='button'
                    className='button-primary text-xs px-4 py-2'
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

Editor.getLayout = function getLayout(page) {
  return page;
};

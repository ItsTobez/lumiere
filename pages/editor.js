import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/editor/MDXContent';
import Split from 'react-split';
import { signIn, useSession } from 'next-auth/react';
import Avatar from '@components/ui/Avatar';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const titleInput = useRef(null);
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

  const showTitleError = () => {
    titleInput.current.focus();
    toast('You must set a title to your publication before saving.');
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
            ref={titleInput}
            className={`rounded-lg bg-transparent text-xl ml-3 py-2 px-4 w-96 hover:bg-gray-800 transition-colors duration-75 text-gray-300 focus:outline-none focus:ring-2 ${
              title ? 'focus:ring-blue-600' : 'focus:ring-red-600'
            } placeholder-gray-500`}
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
            onClick={title ? saveDraft : showTitleError}
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

      <Toaster position='bottom-left' />
    </>
  );
}

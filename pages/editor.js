import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/MDXContent';
import Split from 'react-split';
import { signIn, useSession } from 'next-auth/react';
import Avatar from '@components/Avatar';

export default function Editor() {
  const [content, setContent] = useState('');
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

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
        <button className='button-tertiary text-xs px-4 py-2'>
          Save draft
        </button>
        <button className='button-primary text-xs px-4 py-2'>Publish</button>
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
    </>
  );
}

Editor.getLayout = function getLayout(page) {
  return page;
};

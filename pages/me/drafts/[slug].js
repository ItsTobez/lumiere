import prisma from '@lib/prisma';
import { getSession, useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Split from 'react-split';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/editor/MDXContent';
import Avatar from '@components/ui/Avatar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditDraft(props) {
  const title = props.title;
  const [content, setContent] = useState(props.content);
  const slug = props.slug;
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const saveDraft = async () => {
    try {
      const body = { content, slug };
      await fetch('/api/post/update', {
        method: 'PATCH',
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
          <h1 className='rounded-lg bg-transparent text-xl ml-3 py-2 px-4 w-96 hover:bg-gray-800 transition-colors duration-75 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 cursor-not-allowed'>
            {title}
          </h1>
        </div>
        <div className='flex ml-auto'>
          <button
            className='button-tertiary text-xs px-4 mr-6'
            onClick={saveDraft}
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
        minSize={400}
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
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const authorUsername = session.user.username;
  const slug = params.slug;

  const post = await prisma.post.findUnique({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
    select: {
      title: true,
      slug: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  post.createdAt = String(post.createdAt);
  post.updatedAt = String(post.updatedAt);

  return {
    props: post,
  };
};

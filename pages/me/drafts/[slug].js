import prisma from '@lib/prisma';
import { getSession, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MDXEditor from '@components/editor/MDXEditor';
import Header from '@components/layouts/Header';

export default function EditDraft(props) {
  const title = props.title;
  const [content, setContent] = useState(props.content);
  const slug = props.slug;
  const router = useRouter();
  const { status } = useSession({
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
      <Header
        pageType='editor'
        title={title}
        content={content}
        setContent={setContent}
        saveDraft={saveDraft}
      />
      <MDXEditor content={content} setContent={setContent} />
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

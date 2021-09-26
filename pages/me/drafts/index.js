import Layout from '@components/layouts/Layout';
import Post from '@components/Post';
import prisma from '@lib/prisma';
import { getSession, useSession, signIn } from 'next-auth/react';

export default function Drafts({ drafts }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === 'loading') return null;

  return (
    <main className='container'>
      <h1>Drafts</h1>
      {drafts.map((draft) => (
        <Post post={draft} key={draft.id} />
      ))}
    </main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { username: session.user.username },
      published: false,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  drafts.forEach((draft) => {
    draft.createdAt = String(draft.createdAt);
    draft.updatedAt = String(draft.updatedAt);
  });

  return {
    props: { drafts },
  };
};

Drafts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

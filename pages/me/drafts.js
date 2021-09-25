import Layout from '@components/layouts/Layout';
import prisma from '@lib/prisma';
import { getSession, useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Drafts({ drafts }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  useEffect(() => {
    console.log(drafts);
  }, [drafts]);

  if (status === 'loading') return <h1>LOADING</h1>;

  return (
    <main className='container'>
      <h1>Drafts</h1>
      {drafts.map((draft) => (
        <article key={draft.id}>
          <h2>{draft.title}</h2>
          <p>{draft.content}</p>
          <p>Created at: {draft.createdAt}</p>
          <p>Updated at: {draft.updatedAt}</p>
        </article>
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

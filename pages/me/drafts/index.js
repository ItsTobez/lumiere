import Layout from '@components/layouts/Layout';
import Draft from '@components/ui/Draft';
import Head from 'next/head';
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
    <>
      <Head>
        <title>My Drafts</title>
      </Head>

      <>
        <h1 className="mb-5 heading-primary">My Drafts</h1>
        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full p-5 border border-gray-700 rounded-xl">
            <h2 className="text-xl font-bold">No drafts were found.</h2>
            <p>
              Go ahead and create a post! Saved drafts can be found here after
              you create a post.
            </p>
          </div>
        ) : (
          drafts.map((draft) => <Draft post={draft} key={draft.id} />)
        )}
      </>
    </>
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

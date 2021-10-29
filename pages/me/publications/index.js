import Layout from '@components/layouts/Layout';
import Publication from '@components/ui/Publication';
import prisma from '@lib/prisma';
import Head from 'next/head';
import { getSession, useSession, signIn } from 'next-auth/react';

export default function Publications({ publications }) {
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
        <title>My Publications</title>
      </Head>
      <main className="container">
        <h1 className="mb-5 heading-primary">Your Publications</h1>
        {publications.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full p-5 border border-gray-700 rounded-xl">
            <h2 className="text-xl font-bold">No publications were found.</h2>
            <p>
              Go ahead and create a post! Publications can be found here after
              you publish a draft.
            </p>
          </div>
        ) : (
          publications.map((publication) => (
            <Publication
              post={publication}
              key={publication.id}
              visibility="private"
            />
          ))
        )}
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { publication: [] } };
  }

  const publications = await prisma.post.findMany({
    where: {
      author: { username: session.user.username },
      published: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  publications.forEach((publication) => {
    publication.createdAt = String(publication.createdAt);
    publication.updatedAt = String(publication.updatedAt);
  });

  return {
    props: { publications },
  };
};

Publications.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

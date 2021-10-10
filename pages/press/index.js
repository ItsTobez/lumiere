import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import prisma from '@lib/prisma';
import Publication from '@components/ui/Publication';

export default function Press({ publications }) {
  return (
    <>
      <Head>
        <title>Lumiere Press</title>
      </Head>

      <main className='container'>
        <h1>Public Publications</h1>
        {publications.map((publication) => (
          <Publication
            key={publication.id}
            post={publication}
            visibility='public'
          />
        ))}
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const publications = await prisma.post.findMany({
    where: {
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

Press.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

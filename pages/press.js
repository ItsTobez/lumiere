import Layout from '@components/layouts/Layout';
import prisma from '@lib/prisma';
import Image from 'next/image';

export default function Publications({ publications }) {
  return (
    <main className='container'>
      <h1>Publications</h1>
      {publications.map((publication) => (
        <div key={publication.id}>
          <h2>{publication.title}</h2>
          <p>{publication.slug}</p>
          <p>{publication.authorUsername}</p>
          <figure className='relative w-10 h-10'>
            <Image
              src={publication.author.image}
              alt={`Image of ${publication.author.name}`}
              layout='fill'
            />
          </figure>
        </div>
      ))}
    </main>
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
      authorUsername: true,
      author: true,
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

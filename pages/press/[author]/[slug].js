import prisma from '@lib/prisma';
import { useState, useEffect } from 'react';
import Article from '@components/ui/Article';
import Layout from '@components/layouts/Layout';
import { compileMDX } from '@lib/xdm';

export default function Publication({
  title,
  content,
  createdAt,
  updatedAt,
  author,
}) {
  const [mdxLoading, setMDXLoading] = useState(true);
  const [MDXOutput, setMDXOutput] = useState(() => {
    const mdxComponent = ({ children }) => <>{children}</>;
    return mdxComponent;
  });

  useEffect(() => {
    compileMDX(content, setMDXOutput, setMDXLoading);
  }, [content]);

  return (
    <Article
      title={title}
      createdAt={createdAt}
      updatedAt={updatedAt}
      authorName={author.username}
      authorImage={author.image}
    >
      {mdxLoading ? <p>LOADING</p> : <MDXOutput />}
    </Article>
  );
}

export const getServerSideProps = async ({ params }) => {
  const authorUsername = params.author;
  const slug = params.slug;

  const post = await prisma.post.findUnique({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
    select: {
      title: true,
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

  post.createdAt = String(post.createdAt);
  post.updatedAt = String(post.updatedAt);

  return {
    props: post,
  };
};

Publication.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

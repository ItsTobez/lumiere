import prisma from '@lib/prisma';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { evaluate } from 'xdm';
import * as runtime from 'react/jsx-runtime.js';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeWrap from 'rehype-wrap';
import rehypeTOC from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import MDXComponents from '@components/editor/MDXComponents';
import Header from '@components/layouts/Header';

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

  const compileMDX = async (mdx) => {
    const { default: Content } = await evaluate(mdx, {
      ...runtime,
      useDynamicImport: true,
      remarkPlugins: [remarkGfm, remarkUnwrapImages],
      rehypePlugins: [
        [rehypeWrap, { wrapper: 'main' }],
        rehypeSlug,
        [rehypeTOC, { position: 'afterend' }],
      ],
    });

    setMDXOutput(() => {
      const mdxComponent = () => <Content components={MDXComponents} />;
      return mdxComponent;
    });

    setMDXLoading(false);
  };

  useEffect(() => {
    compileMDX(content);
  }, [content]);

  return (
    <>
      <Header />
      <article className='break-words overflow-y-auto bg-[#fafafa] max-w-none prose h-screen'>
        <div className='max-w-4xl mx-auto px-6 py-6'>
          <div className='heading-secondary text-black'>Information</div>

          <p>Title: {title}</p>
          <p>Written by: {author.username}</p>
          <Image
            src={author.image}
            alt={`Image of ${author.username}`}
            width={60}
            height={60}
          />
          <p>Created at: {createdAt}</p>
          <p>Last updated at: {updatedAt}</p>

          <div className='heading-secondary text-black'>Compiled MDX</div>

          <div className='border rounded-md px-6'>
            {mdxLoading ? <p>LOADING</p> : <MDXOutput />}
          </div>
        </div>
      </article>
    </>
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

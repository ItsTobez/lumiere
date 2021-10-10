import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Article({
  children,
  pageType,
  title,
  createdAt,
  updatedAt,
  authorName,
  authorImage,
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <article className='break-words overflow-y-auto bg-gray-100 dark:bg-gray-900 max-w-none prose dark:prose-dark smooth-scroll'>
      <div className='container py-12'>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme}
          </button>
        )}
        {title && (
          <section className='mb-12 border border-gray-300 dark:border-gray-700 rounded-lg pt-8 pb-2 px-12'>
            <h1 className='!text-6xl !mb-4'>{title}</h1>
            {pageType === 'publication' && (
              <>
                <p>Created at: {createdAt}</p>
                <p>Updated at: {updatedAt}</p>
              </>
            )}
            <div className='flex items-center'>
              <p className='mr-4'>{authorName}</p>
              <Image
                src={authorImage}
                alt={`Image of ${authorName}`}
                width={40}
                height={40}
              />
            </div>
          </section>
        )}
        {children}
      </div>
    </article>
  );
}

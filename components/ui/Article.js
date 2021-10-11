import Image from 'next/image';
import ProseContainer from '@components/ui/ProseContainer';

export default function Article({
  children,
  pageType,
  title,
  createdAt,
  updatedAt,
  authorName,
  authorImage,
}) {
  return (
    <ProseContainer>
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
      <section className={`${pageType === 'publication' ? 'py-0' : 'py-12'}`}>
        {children}
      </section>
    </ProseContainer>
  );
}

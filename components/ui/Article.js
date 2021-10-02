import Image from 'next/image';

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
    <article className='break-words overflow-y-auto bg-[#fafafa] max-w-none prose'>
      <div className='container py-12'>
        <section className='mb-12 border rounded-lg pt-8 pb-2 px-12'>
          <div className='mb-4'>
            <button className='beta mr-4'>Change theme</button>
            <button className='beta'>Change colors</button>
          </div>
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
        {children}
      </div>
    </article>
  );
}

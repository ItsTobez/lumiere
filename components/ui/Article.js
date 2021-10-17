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
      <div className="py-12">
        {title && (
          <section className="px-12 pt-10 pb-4 mb-12 border border-gray-300 rounded-lg dark:border-gray-700">
            <h1 className="!text-6xl !mb-4">{title}</h1>
            {pageType === 'publication' && (
              <>
                <p>Created at: {createdAt}</p>
                <p>Updated at: {updatedAt}</p>
              </>
            )}
            <div className="flex items-center">
              <p className="mr-4">{authorName}</p>
              <Image
                src={authorImage}
                alt={`Image of ${authorName}`}
                width={40}
                height={40}
              />
            </div>
          </section>
        )}
        <section className="flex flex-row-reverse">{children}</section>
      </div>
    </ProseContainer>
  );
}

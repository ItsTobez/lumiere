export default function ProseContainer({ children }) {
  return (
    <article className='break-words overflow-y-auto bg-gray-100 dark:bg-gray-900 max-w-none prose dark:prose-dark smooth-scroll'>
      <div className='container'>{children}</div>
    </article>
  );
}

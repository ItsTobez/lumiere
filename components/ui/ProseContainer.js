export default function ProseContainer({ children }) {
  return (
    <article className="overflow-y-auto prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark smooth-scroll">
      <div className="container">{children}</div>
    </article>
  );
}

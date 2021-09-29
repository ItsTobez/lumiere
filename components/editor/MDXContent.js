import { ErrorBoundary } from 'react-error-boundary';
import { useState, useMemo } from 'react';
import { evaluateMDX } from '@lib/xdm';

export default function MDXContent({ mdx }) {
  const [MDXOutput, setMDXOutput] = useState(() => {
    const mdxComponent = ({ children }) => <>{children}</>;
    return mdxComponent;
  });
  const [error, setError] = useState(null);

  const ErrorFallback = ({ error }) => {
    return (
      <div>
        <h2>Error compiling your code.</h2>
        <pre>{error.message}</pre>
      </div>
    );
  };

  useMemo(() => {
    evaluateMDX(mdx, setMDXOutput, setError);
  }, [mdx]);

  return (
    <article className='break-words overflow-y-auto bg-[#fafafa] max-w-none prose'>
      <div className='max-w-4xl mx-auto px-6 py-6'>
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={mdx}>
          <MDXOutput />
          {error && error.message}
        </ErrorBoundary>
      </div>
    </article>
  );
}

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
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={mdx}>
      <MDXOutput />
      {error && error.message}
    </ErrorBoundary>
  );
}

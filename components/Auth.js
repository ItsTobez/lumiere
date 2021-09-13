import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Auth({ children }) {
  const { data: session, loading } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (loading) return;
    if (!isUser) signIn();
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  return <div className='bg-red-500 h-108'>Loading... (loading animation)</div>;
}

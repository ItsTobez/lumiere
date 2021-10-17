import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { useLocalStorage } from 'react-use';

export default function Username() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [_, setValue] = useLocalStorage('refresh', false);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const submitUsername = async (e) => {
    e.preventDefault();

    try {
      const body = { username: `@${username}` };
      const response = await fetch('/api/user/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        setValue(true);
        await router.push(router.query.callbackUrl);
      } else {
        setError('Username already taken');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') return null;

  return (
    <>
      <Head>
        <title>Username | Lumiere</title>
      </Head>
      <div className="grid h-screen text-center place-items-center">
        <main>
          <figure className="flex justify-center">
            <Image
              src={projectLumiere}
              alt="Project Lumiere logo"
              height={100}
              width={100}
            />
          </figure>
          <h1 className="mt-2 text-gray-100 heading-primary">
            Welcome to Lumiere!
          </h1>
          <p className="mt-2 mb-5">
            Let&#39;s get started. Set your username below and you&#39;re all
            set to go.
          </p>
          <form onSubmit={submitUsername} className="space-x-2">
            <span>@</span>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              className="py-3 lg:py-2.5 rounded-lg border-2 bg-transparent pr-9 lg:pr-8 pl-4 text-sm border-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-gray-600 placeholder-gray-500"
            />
            <input
              type="button"
              value="Submit username"
              className="px-5 py-3 lg:py-2.5 text-sm button-tertiary bg-transparent cursor-pointer"
              disabled={!username}
            />
          </form>
          <p>{error}</p>
        </main>
      </div>
    </>
  );
}

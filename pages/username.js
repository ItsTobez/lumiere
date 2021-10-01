import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Username() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

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
        await router.push(router.query.callbackUrl);
      } else {
        setError('Username already taken');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Set your username</h1>
      <form onSubmit={submitUsername}>
        <span>@</span>
        <input
          type='text'
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input type='submit' value='Submit username' disabled={!username} />
      </form>
      <p>{error}</p>
      <p>
        Okay I really need to work on this LMFAO. PR
        https://github.com/AnthonyKuang/ProjectLumiere/blob/main/pages/username.js
      </p>
    </>
  );
}

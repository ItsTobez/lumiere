import { useRouter } from 'next/router';
import { getTimeAndDate } from '@lib/utilities/formatDate';

export default function Post({ post }) {
  const router = useRouter();

  const publishPost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/publish', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className='border border-gray-300 dark:border-gray-700 p-5 rounded-xl cursor-pointer'
        onClick={() => router.push(`/me/drafts/${post.slug}`)}
      >
        <h2 className='font-bold text-xl'>{post.title}</h2>
        <p>Created on {getTimeAndDate(post.createdAt)}</p>
        <p>Updated on {getTimeAndDate(post.updatedAt)}</p>
      </div>
      <div className='flex space-x-2 mt-2'>
        <button
          className='p-2.5 button-tertiary'
          onClick={() => publishPost(post.slug)}
        >
          Publish
        </button>
        <button
          className='p-2.5 button-tertiary transition-colors border-red-500 text-red-500 hover:text-red-400'
          onClick={() => deletePost(post.slug)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

import { useRouter } from 'next/router';
import Image from 'next/image';
import { getTimeAndDate } from '@lib/utilities/formatDate';

export default function Publication({ post, visibility }) {
  const router = useRouter();

  const unpublishPost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/unpublish', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/publications');
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (slug) => {
    router.push(`/me/publications/${slug}`);
  };

  const deletePost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/publications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className='border border-gray-300 dark:border-gray-700 p-5 rounded-xl cursor-pointer'
        onClick={() =>
          router.push(`/press/${post.author.username}/${post.slug}`)
        }
      >
        <h2 className='font-bold text-xl'>{post.title}</h2>
        <div className='flex items-center my-2 space-x-2'>
          <Image
            src={post.author.image}
            alt={`Image of ${post.author.username}`}
            className='rounded-full'
            width={40}
            height={40}
          />
          <p>{post.author.username}</p>
        </div>
        <p>Created on {getTimeAndDate(post.createdAt)}</p>
        <p>Updated on {getTimeAndDate(post.updatedAt)}</p>
      </div>
      {visibility === 'private' && (
        <div className='flex flex-row mt-2 space-x-2'>
          <button
            className='p-2.5 button-tertiary'
            onClick={() => editPost(post.slug)}
          >
            Edit
          </button>
          <button
            className='p-2.5 button-tertiary'
            onClick={() => unpublishPost(post.slug)}
          >
            Unpublish
          </button>
          <button
            className='p-2.5 button-tertiary border-red-700 hover:border-red-400'
            onClick={() => deletePost(post.slug)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}

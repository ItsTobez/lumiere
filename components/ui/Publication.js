import { useRouter } from 'next/router';
import Image from 'next/image';

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

  const getDateAndTime = (string) => {
    return new Date(string).toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true});
  }

  return (
    <>
      <div
        className='border border-gray-700 p-5 rounded-xl cursor-pointer'
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
        <p>Created on {getDateAndTime(post.createdAt)}</p>
        <p>Updated on {getDateAndTime(post.updatedAt)}</p>
      </div>
      {visibility === 'private' && (
        <div className='flex flex-row space-x-2'>
          <button
            className='mt-2 p-2.5 button-tertiary'
            onClick={() => editPost(post.slug)}
          >
            Edit
          </button>
          <button
            className='mt-2 p-2.5 button-tertiary'
            onClick={() => unpublishPost(post.slug)}
          >
            Unpublish
          </button>
          <button
            className='mt-2 p-2.5 button-tertiary border-red-700 hover:border-red-400'
            onClick={() => deletePost(post.slug)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}

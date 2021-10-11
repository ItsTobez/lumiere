import { useRouter } from 'next/router';

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

  const getDateAndTime = (string) => {
      return new Date(string).toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true});
  }

  return (
    <>
      <div
        className='border border-gray-700 p-5 rounded-xl cursor-pointer'
        onClick={() => router.push(`/me/drafts/${post.slug}`)}
      >
        <h2 className='font-bold text-xl'>{post.title}</h2>
        <p>Created on {getDateAndTime(post.createdAt)}</p>
        <p>Updated on {getDateAndTime(post.updatedAt)}</p>
      </div>
        <div className='flex flex-row space-x-2'>
          <button
            className='mt-2 p-2.5 button-tertiary'
            onClick={() => publishPost(post.slug)}
          >
            Publish
          </button>
          <button
            className='mt-2 p-2.5 button-tertiary border-red-700 hover:border-red-400'
            onClick={() => deletePost(post.slug)}
          >
            Delete
          </button>
        </div>
    </>
  );
}

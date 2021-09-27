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

  return (
    <>
      <article
        className='border border-gray-600 cursor-pointer'
        onClick={() => router.push(`/me/drafts/${post.slug}`)}
      >
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>Created at: {post.createdAt}</p>
        <p>Updated at: {post.updatedAt}</p>
      </article>
      <button
        className='border border-gray-600'
        onClick={() => publishPost(post.slug)}
      >
        Publish
      </button>
      <button
        className='border border-gray-600'
        onClick={() => deletePost(post.slug)}
      >
        Delete
      </button>
    </>
  );
}

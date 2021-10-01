import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Publication({ post, visibility }) {
  const router = useRouter();

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
        className='border border-gray-700 cursor-pointer'
        onClick={() =>
          router.push(`/press/${post.author.username}/${post.slug}`)
        }
      >
        <h2>{post.title}</h2>
        <p>Author: {post.author.username}</p>
        <Image
          src={post.author.image}
          alt={`Image of ${post.author.username}`}
          width={40}
          height={40}
        />
        <p>Created at: {post.createdAt}</p>
        <p>Updated at: {post.updatedAt}</p>
      </div>
      {visibility === 'private' && (
        <button
          className='border border-gray-700'
          onClick={() => deletePost(post.slug)}
        >
          Delete
        </button>
      )}
    </>
  );
}

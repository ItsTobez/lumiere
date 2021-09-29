import { useState, useRef } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import MDXEditor from '@components/editor/MDXEditor';
import Header from '@components/layouts/Header';
import { useBeforeunload } from 'react-beforeunload';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const titleInput = useRef(null);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const saveDraft = async () => {
    try {
      const body = { title, content, slug };
      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  const showUntitledError = () => {
    titleInput.current.focus();
    toast('You must set a title to your publication before saving.');
  };

  useBeforeunload((event) => {
    if (title !== '' || content !== '') {
      event.preventDefault();
    }
  });

  if (status === 'loading') return null;

  return (
    <>
      <Header
        pageType='editor'
        title={title}
        titleInput={titleInput}
        saveDraft={saveDraft}
        showUntitledError={showUntitledError}
        setTitle={setTitle}
        setSlug={setSlug}
      />
      <MDXEditor content={content} setContent={setContent} />
      <Toaster position='bottom-left' />
    </>
  );
}

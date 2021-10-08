import { useState, useRef } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import MDXEditor from '@components/editor/MDXEditor';
import Header from '@components/layouts/Header';
import { useBeforeunload } from 'react-beforeunload';

export default function Editor() {
  const initialContent = `# Markdown Syntax - Heading 1

## Heading 2

### Heading 3

#### Heading 4

> Block quote

- Unordered
- List

1. Ordered
2. List

A paragraph, with a line break below:

---

\`\`\`js
// javascript
some.code();
\`\`\`

\`\`\`jsx
// jsx
export default function Header() {
  return (
    <div>
      <header>Header</header>
    </div>
  );
}
\`\`\`

Codeblocks come with automatic syntax highlighting!

a [link](https://example.com), an ![image](https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)

Some _emphasis_, something **strong**, and finally a little \`code()\`.

---

# Github Flavored Markdown

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a   | b   |   c |  d  |
| --- | :-- | --: | :-: |

## Tasklist

- [ ] to do
- [x] done

---

# Extending Markdown

## Hints

!> Here is a tip (green).

?> Here is a warning (yellow).

x> Here is an error (red).

## Emojis

:dog:

:cat:

:joy:

## HTML Support

<div>
  1. Item1 2. Item2
  <div>3. Item3</div>
</div>

---

# JSX Components

## Confetti 

<ConfettiComponent />

## CodeSandbox Button

<CodeSandboxButton
  files={{
    'package.json': {
      content: {
        dependencies: {
          react: 'latest',
          'react-dom': 'latest',
        },
      },
    },
    'index.html': {
      content: \`<div id="root"></div>\`,
    },
  }}
>
  This goes to CodeSandbox, with all of the files defined as props
</CodeSandboxButton>

## CodeSandbox Embed

<CodeSandboxEmbed
  files={{
    'package.json': {
      content: {
        dependencies: {
          react: 'latest',
          'react-dom': 'latest',
        },
      },
    },
    'index.html': {
      content: \`<div id="root"></div>\`,
    },
  }}
/>

---

# Creating your own components

export const CoolComponent = ({ children }) => {
  return (
    <a href='https://mdxjs.com/' target='_blank'>
      {children}
    </a>
  );
};

<CoolComponent>This is pretty cool!</CoolComponent>`;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(initialContent);
  const [slug, setSlug] = useState('');
  const titleInput = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession({
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
      <MDXEditor
        content={content}
        setContent={setContent}
        title={title}
        authorName={session.user.username}
        authorImage={session.user.image}
      />
      <Toaster position='bottom-left' />
    </>
  );
}

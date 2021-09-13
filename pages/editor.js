import Split from 'react-split';
import { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { getSession, signIn } from 'next-auth/react';

export default function Editor({ session }) {
  useEffect(() => {
    console.log(session);
  }, [session]);

  const [content, setContent] = useState(
    '# This is the heading to your MDX masterpiece!'
  );

  if (!session) signIn();

  return (
    <Split
      minSize={500}
      expandToMin={false}
      gutterSize={10}
      direction='horizontal'
      cursor='col-resize'
      className='split'
    >
      <div className='border border-gray-100 h-screen'>
        <MonacoEditor
          defaultLanguage='markdown'
          defaultValue={content}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onChange={(value) => setContent(value)}
        />
      </div>
      <div className='border border-gray-100 h-screen'>2</div>
    </Split>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      session: await getSession(req),
    },
  };
}

import Split from 'react-split';
import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

export default function Editor() {
  const [content, setContent] = useState(
    '# This is the heading to your MDX masterpiece!'
  );

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

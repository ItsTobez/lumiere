import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/editor/MDXContent';
import Split from 'react-split';

export default function MDXEditor({ content, setContent }) {
  return (
    <Split
      sizes={[50, 50]}
      minSize={200}
      gutterSize={10}
      dragInterval={1}
      snapOffset={30}
      className='split h-editor overflow-y-hidden'
      gutter={(_, direction) => {
        const gutter = document.createElement('div');
        gutter.className = `gutter gutter-${direction}`;
        return gutter;
      }}
    >
      <section>
        <MonacoEditor
          defaultLanguage='markdown'
          value={content}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
            wordWrap: 'on',
          }}
          onChange={(value) => setContent(value)}
        />
      </section>
      <MDXContent mdx={content} />
    </Split>
  );
}

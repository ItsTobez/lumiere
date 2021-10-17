import MonacoEditor from '@monaco-editor/react';
import MDXContent from '@components/editor/MDXContent';
import Split from 'react-split';

export default function MDXEditor({
  content,
  setContent,
  title,
  authorName,
  authorImage,
  collapsed,
}) {
  return (
    <Split
      sizes={[50, 50]}
      minSize={0}
      gutterSize={10}
      dragInterval={1}
      snapOffset={30}
      className={`flex ${
        collapsed ? 'h-screen -mt-18' : 'h-editor-lg lg:h-editor-sm'
      } overflow-y-hidden`}
      gutter={(_, direction) => {
        const gutter = document.createElement('div');
        gutter.className = `gutter gutter-${direction}`;
        return gutter;
      }}
    >
      <section>
        <MonacoEditor
          defaultLanguage="markdown"
          value={content}
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },
            tabSize: 2,
            wordWrap: 'on',
          }}
          onChange={(value) => setContent(value)}
        />
      </section>
      <MDXContent
        mdx={content}
        title={title}
        authorName={authorName}
        authorImage={authorImage}
      />
    </Split>
  );
}

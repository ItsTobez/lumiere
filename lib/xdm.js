import { evaluate } from 'xdm';
import * as runtime from 'react/jsx-runtime.js';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import MDXComponents from '@components/editor/MDXComponents';

export const evaluateMDX = async (mdx, setMDXOutput, setError) => {
  try {
    const { default: Content } = await evaluate(mdx, {
      ...runtime,
      useDynamicImport: true,
      remarkPlugins: [remarkGfm, remarkUnwrapImages],
    });

    setError(null);
    setMDXOutput(() => {
      const mdxComponent = () => <Content components={MDXComponents} />;
      return mdxComponent;
    });
  } catch (error) {
    setError(error);
  }
};

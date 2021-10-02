import { evaluate } from 'xdm';
import * as runtime from 'react/jsx-runtime.js';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkEmoji from 'remark-emoji';
import remarkHint from 'remark-hint';
import rehypeWrap from 'rehype-wrap';
import rehypeTOC from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';
import MDXComponents from '@components/editor/MDXComponents';

export const evaluateMDX = async (mdx, setMDXOutput, setError) => {
  try {
    const { default: Content } = await evaluate(mdx, {
      ...runtime,
      useDynamicImport: true,
      remarkPlugins: [remarkGfm, remarkUnwrapImages, remarkEmoji, remarkHint],
      rehypePlugins: [
        [rehypeWrap, { wrapper: 'main' }],
        rehypeSlug,
        [rehypeTOC, { position: 'afterend' }],
        rehypePrism,
      ],
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

export const compileMDX = async (mdx, setMDXOutput, setMDXLoading) => {
  const { default: Content } = await evaluate(mdx, {
    ...runtime,
    useDynamicImport: true,
    remarkPlugins: [remarkGfm, remarkUnwrapImages, remarkEmoji, remarkHint],
    rehypePlugins: [
      [rehypeWrap, { wrapper: 'main' }],
      rehypeSlug,
      [rehypeTOC, { position: 'afterend' }],
      rehypePrism,
    ],
  });

  setMDXOutput(() => {
    const mdxComponent = () => <Content components={MDXComponents} />;
    return mdxComponent;
  });

  setMDXLoading(false);
};

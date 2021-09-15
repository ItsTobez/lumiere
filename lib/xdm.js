import { evaluate } from 'xdm';
import * as runtime from 'react/jsx-runtime.js';

export const evaluateMDX = async (mdx, setMDXOutput, setError) => {
  try {
    const { default: content } = await evaluate(mdx, {
      ...runtime,
      useDynamicImport: true,
    });

    setError(null);
    setMDXOutput(content);
  } catch (error) {
    setError(error);
  }
};

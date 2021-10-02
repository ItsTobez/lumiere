import { useState } from 'react';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { TicTacToe } from '@anatu/tictactoegame';
import CodeSandboxButton from '@uiw/react-codesandbox';
import CodepenButton from '@uiw/react-codepen';
import StackBlitzButton from '@uiw/react-stackblitz';

const a = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
};

const img = ({ src, alt }) => {
  return (
    <figure>
      <img src={src} alt={alt} />
      <figcaption>{alt}</figcaption>
    </figure>
  );
};

const ConfettiComponent = () => {
  const [coords, setCoords] = useState(undefined);
  const [pieces, setPieces] = useState(0);
  const [count, setCount] = useState(0);

  const onClick = (e) => {
    setCount(count + 1);
    setPieces(pieces + 24);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  const onComplete = () => {
    setPieces(0);
  };

  return (
    <>
      You{' '}
      <button
        type='button'
        onClick={onClick}
        className='bg-blue-550 cursor-help'
      >
        clicked me
      </button>{' '}
      exactly {count} times
      {pieces ? (
        <Confetti
          colors={['#0366d6']}
          numberOfPieces={pieces}
          confettiSource={coords}
          recycle={false}
          onConfettiComplete={onComplete}
        />
      ) : null}
    </>
  );
};

const CodeSandboxEmbed = (props) => {
  return (
    <div className='h-[800px]'>
      <CodeSandboxButton {...props} />
    </div>
  );
};

const MDXComponents = {
  a,
  img,
  ConfettiComponent,
  TicTacToe,
  CodeSandboxButton,
  CodeSandboxEmbed,
  CodepenButton,
  StackBlitzButton,
};

export default MDXComponents;

import Link from 'next/link';

const NextLink = (props) => {
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

const EpicComponent = (props) => {
  return <div className='bg-pink-500'>{props.children}</div>;
};

const CoolComponent = () => {
  return <section className='bg-blue-600'>This is a cool component</section>;
};

const MDXComponents = {
  a: NextLink,
  EpicComponent,
  CoolComponent,
};

export default MDXComponents;

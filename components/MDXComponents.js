import Link from 'next/link';
import Image from 'next/image';

const NextLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
};

const MDXComponents = {
  img: Image,
  a: NextLink,
};

export default MDXComponents;

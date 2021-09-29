import Link from 'next/link';

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

const img = (props) => {
  return (
    <figure>
      <img src={props.src} alt={props.alt} />
      <figcaption>{props.alt}</figcaption>
    </figure>
  );
};

const MDXComponents = {
  a,
  img,
};

export default MDXComponents;

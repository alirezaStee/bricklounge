import Image from 'next/image';

interface SocialMediaLinkProps {
  href: string;
  id: string;
  alt: string;
  src: string;
}

export default function SocialMediaLink({
  href,
  id,
  alt,
  src,
}: SocialMediaLinkProps) {
  return (
    <a href={href} id={id} aria-label={alt}>
      <Image alt={alt} src={src} width={32} height={32} />
    </a>
  );
}


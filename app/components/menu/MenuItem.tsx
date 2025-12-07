import Image from 'next/image';
import { formatPrice } from '../../lib/utils';
import { COLORS, IMAGE_PATHS } from '../../lib/constants';

interface MenuItemProps {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  className?: string;
  onClick?: () => void;
}

export default function MenuItem({
  id,
  name,
  imageSrc,
  price,
  className = '',
  onClick,
}: MenuItemProps) {
  return (
    <div
      className="flex items-center justify-center"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative flex h-52 w-52 items-center justify-center overflow-hidden rounded-full shadow-lg sm:h-[245px] sm:w-[245px] ${className}`}
          style={{ backgroundColor: COLORS.primary }}
        >
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-contain"
            placeholder="blur"
            blurDataURL={IMAGE_PATHS.placeholder}
          />
        </div>
        <span className="mt-0.5 text-center text-sm font-semibold text-white">
          {name}
        </span>
        <span className="mt-0.5 text-center text-sm font-semibold text-white">
          {formatPrice(price)}
        </span>
      </div>
    </div>
  );
}


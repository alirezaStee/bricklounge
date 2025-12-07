import Image from 'next/image';

interface CategoryItemProps {
  id: number | string;
  name: string;
  iconSrc: string;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function CategoryItem({
  id,
  name,
  iconSrc,
  className = '',
  onClick,
  isSelected = false,
}: CategoryItemProps) {
  const borderClass = isSelected
    ? 'border-3 border-[rgb(210,199,152)]'
    : '';

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
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ${borderClass} ${className}`}
        >
          <Image
            src={iconSrc}
            alt={`${name} icon`}
            width={35}
            height={35}
            className="h-[35px] w-[35px]"
          />
        </div>
        <span className="mt-0.5 text-center text-sm font-semibold text-white">
          {name}
        </span>
      </div>
    </div>
  );
}


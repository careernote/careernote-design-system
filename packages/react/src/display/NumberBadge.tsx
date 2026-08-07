interface NumberBadgeProps {
  number: number;
  size?: number;
  className?: string;
}

export function NumberBadge({ number, size = 22, className = '' }: NumberBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-red bg-white100 text-detail font-bold text-red ${className}`}
      style={{ width: size, height: size }}
    >
      {number}
    </span>
  );
}

import type { AccentColor } from '../../data/portfolioData'
import { accentBg } from '../../data/portfolioData'
import { cn } from '../../lib/utils'

type ButtonColor = AccentColor | 'white' | 'ink'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const colorClass: Record<ButtonColor, string> = {
  ...accentBg,
  white: 'bg-white',
  ink: 'bg-neo-ink text-neo-bg',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
  icon: 'p-3',
}

/** Class string for a Neo-Brutalist button; works on <button> and <a>. */
export function buttonVariants({
  color = 'yellow',
  size = 'md',
  className,
}: { color?: ButtonColor; size?: ButtonSize; className?: string } = {}) {
  return cn(
    'inline-flex select-none items-center justify-center gap-2 border-3 border-neo-ink font-bold uppercase tracking-wide',
    'shadow-neo transition-[transform,box-shadow] duration-100 ease-out',
    'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-md',
    'active:translate-x-1 active:translate-y-1 active:shadow-none',
    'disabled:pointer-events-none disabled:opacity-60',
    colorClass[color],
    sizeClass[size],
    className,
  )
}

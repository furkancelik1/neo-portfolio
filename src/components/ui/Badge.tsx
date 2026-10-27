import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import type { AccentColor } from '../../data/portfolioData'
import { accentBg } from '../../data/portfolioData'
import { cn } from '../../lib/utils'

interface BadgeProps extends HTMLMotionProps<'span'> {
  color?: AccentColor | 'white' | 'ink'
  icon?: ReactNode
  /** Show a pulsing status dot (e.g. "Open to Work"). */
  pulse?: boolean
  children: ReactNode
}

const colors = { ...accentBg, white: 'bg-white', ink: 'bg-neo-ink text-neo-bg' }

export default function Badge({ color = 'white', icon, pulse, className, children, ...rest }: BadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-2 border-3 border-neo-ink px-3 py-1.5 font-mono text-xs font-bold uppercase shadow-neo-sm sm:text-sm',
        colors[color],
        className,
      )}
      {...rest}
    >
      {pulse && (
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neo-ink opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neo-ink" />
        </span>
      )}
      {icon}
      {children}
    </motion.span>
  )
}

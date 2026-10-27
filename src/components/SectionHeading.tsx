import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { AccentColor } from '../data/portfolioData'
import { accentBg } from '../data/portfolioData'
import { cn } from '../lib/utils'

interface Props {
  index: string
  title: string
  accent?: AccentColor
  className?: string
  /** Giant outlined number drifting behind the heading (off inside sticky containers). */
  ghost?: boolean
}

export default function SectionHeading({ index, title, accent = 'yellow', className, ghost = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], [90, -90])
  const ghostX = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <div ref={ref} className={cn('relative mb-12', className)}>
      {ghost && (
        <motion.span
          aria-hidden="true"
          style={reduce ? undefined : { y: ghostY, x: ghostX }}
          className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(6rem,20vw,15rem)] leading-none text-transparent opacity-20 [-webkit-text-stroke:2px_#0A0A0A] sm:-top-16"
        >
          {index}
        </motion.span>
      )}

      <motion.div
        initial={{ opacity: 0, x: -40, rotate: -3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative flex items-end gap-4"
      >
        <span className="font-mono text-sm font-bold">{index}</span>
        <h2
          className={cn(
            'border-4 border-neo-ink px-4 py-2 text-4xl shadow-neo-md sm:text-5xl',
            accentBg[accent],
          )}
        >
          {title}
        </h2>
      </motion.div>
    </div>
  )
}

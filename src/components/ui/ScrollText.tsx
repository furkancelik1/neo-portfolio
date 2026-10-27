import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/utils'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block" aria-hidden="true">
      {children}
    </motion.span>
  )
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })

  if (reduce)
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )

  const words = text.split(' ')
  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const start = i / words.length
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

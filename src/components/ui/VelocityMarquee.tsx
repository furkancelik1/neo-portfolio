import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/utils'

interface Props {
  items: string[]
  /** Base speed in % of one copy per second. Negative scrolls right. */
  baseVelocity?: number
  /** How many times the item list repeats inside one copy (make one copy wider than the screen). */
  repeat?: number
  className?: string
  separator?: string
}

/**
 * Infinite marquee that speeds up with scroll velocity and flips direction
 * when the user scrolls up.
 */
export default function VelocityMarquee({
  items,
  baseVelocity = 3,
  repeat = 1,
  className,
  separator = '✦',
}: Props) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  // Two identical copies side by side: wrapping between -50% and 0 loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = velocityFactor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * Math.abs(f)
    baseX.set(baseX.get() + moveBy)
  })

  const copy = Array.from({ length: repeat }, () => items).flat()

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1].map((c) => (
          <div key={c} className="flex shrink-0" aria-hidden={c === 1}>
            {copy.map((item, i) => (
              <span key={`${c}-${i}`} className="flex items-center gap-6 pr-6">
                {item}
                <span className="text-[0.7em] opacity-80">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

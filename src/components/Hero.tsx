import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowDownRight, Code2, Mail, Sparkles, Zap } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { personalInfo, techStack } from '../data/portfolioData'
import { useScrollTo } from '../providers/lenisContext'
import Badge from './ui/Badge'
import CodeCard from './ui/CodeCard'
import VelocityMarquee from './ui/VelocityMarquee'
import { buttonVariants } from './ui/button'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 420, damping: 18 } },
}

const badgeColors = ['lime', 'yellow', 'cyan'] as const
const badgeIcons = [null, <Code2 key="c" className="h-4 w-4" strokeWidth={3} />, <Zap key="z" className="h-4 w-4" strokeWidth={3} />]

export default function Hero() {
  const scrollTo = useScrollTo()
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Pointer-driven 3D tilt for the ID card
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 })

  // Scroll-out parallax: text drifts up and fades, card sinks and rotates.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 14])
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetTilt = () => {
    px.set(0)
    py.set(0)
  }


  const headline = ['Hi, I’m', personalInfo.shortName]

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.35fr_1fr] md:pt-20">
        <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.ul variants={container} className="mb-7 flex flex-wrap gap-3" aria-label="Status">
            {personalInfo.badges.map((label, i) => (
              <motion.li key={label} variants={pop}>
                <Badge
                  color={badgeColors[i % badgeColors.length]}
                  pulse={i === 0}
                  icon={badgeIcons[i % badgeIcons.length]}
                  whileHover={{ rotate: i % 2 ? 3 : -3, y: -3 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  {label}
                </Badge>
              </motion.li>
            ))}
          </motion.ul>

          <h1 className="text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.92]">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  variants={rise}
                  className={i === 1 ? 'relative inline-block' : 'inline-block'}
                >
                  {i === 1 ? (
                    <>
                      <span className="relative z-10">{line}</span>
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-[-0.1em] bottom-[0.08em] z-0 h-[0.32em] origin-left bg-neo-pink"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span variants={rise} className="inline-block text-[0.62em]">
                {personalInfo.role}
              </motion.span>
            </span>
          </h1>

          <motion.p variants={rise} className="mt-6 max-w-xl text-lg font-medium sm:text-xl">
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollTo('#projects')}
              className={buttonVariants({ color: 'yellow', size: 'lg', className: 'group' })}
            >
              See my work
              <ArrowDownRight
                className="h-5 w-5 transition-transform group-hover:rotate-[-45deg]"
                strokeWidth={3}
              />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className={buttonVariants({ color: 'white', size: 'lg' })}
            >
              <Mail className="h-5 w-5" strokeWidth={3} /> Get in touch
            </button>
          </motion.div>
        </motion.div>
        </motion.div>

        {/* ID card with tilt + draggable stickers */}
        <motion.div style={reduce ? undefined : { y: cardY, rotate: cardRotate, scale: cardScale }}>
        <motion.div
          initial={{ opacity: 0, y: -60, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm"
          style={{ perspective: 900 }}
        >
          <motion.div
            onPointerMove={onPointerMove}
            onPointerLeave={resetTilt}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="neo-card aspect-[4/5] bg-neo-cyan p-4 shadow-neo-xl"
          >
            <div className="flex h-full flex-col justify-between border-4 border-neo-ink bg-neo-bg p-4 sm:p-5">
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase">
                <span>ID / 001</span>
                <Sparkles className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <CodeCard />
              <div>
                <p className="font-bold">{personalInfo.name}</p>
                <p className="font-mono text-xs uppercase">{personalInfo.location}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            drag
            dragConstraints={sectionRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, rotate: 0, cursor: 'grabbing' }}
            initial={{ rotate: -8 }}
            className="absolute -left-5 -top-5 z-10 cursor-grab touch-none border-3 border-neo-ink bg-neo-yellow px-3 py-1 font-display text-sm uppercase shadow-neo"
            title="Drag me"
          >
            Est. 2022
          </motion.div>
          <motion.div
            drag
            dragConstraints={sectionRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, rotate: 0, cursor: 'grabbing' }}
            initial={{ rotate: 10 }}
            className="absolute -bottom-6 -right-4 z-10 flex h-20 w-20 cursor-grab touch-none items-center justify-center rounded-full border-3 border-neo-ink bg-neo-pink text-center font-display text-xs uppercase leading-tight shadow-neo"
            title="Drag me"
          >
            Drag
            <br />
            me!
          </motion.div>
        </motion.div>
        </motion.div>
      </div>

      {/* Tech marquee — speeds up and reverses with scroll velocity */}
      <div className="relative z-10 -rotate-1 border-y-4 border-neo-ink bg-neo-ink py-3 font-display text-xl uppercase text-neo-bg sm:text-2xl">
        <VelocityMarquee items={techStack} baseVelocity={2} />
      </div>
    </section>
  )
}

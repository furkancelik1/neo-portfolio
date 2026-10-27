import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { accentBg, accentHex, timeline, type TimelineItem } from '../data/portfolioData'
import { cn } from '../lib/utils'
import SectionHeading from './SectionHeading'

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const Icon = item.type === 'work' ? Briefcase : GraduationCap
  const right = index % 2 === 1 // desktop: odd entries sit on the right

  return (
    <li className="relative pl-16 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
      {/* Node: outer span positions (CSS transform), inner span animates. */}
      <span className="absolute left-0 top-3 z-10 md:left-1/2 md:-translate-x-1/2">
        <motion.span
          initial={{ backgroundColor: '#FFFFFF', scale: 0.7 }}
          whileInView={{ backgroundColor: accentHex[item.accent], scale: 1 }}
          viewport={{ margin: '0px 0px -45% 0px' }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="flex h-10 w-10 items-center justify-center border-4 border-neo-ink shadow-neo-sm"
        >
          <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        </motion.span>
      </span>

      {/* Big period label on the opposite side (desktop only) */}
      <div
        className={cn(
          'hidden pt-3 md:block',
          right ? 'md:col-start-1 md:row-start-1 md:text-right' : 'md:col-start-2 md:row-start-1',
        )}
      >
        <motion.p
          initial={{ opacity: 0, x: right ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="font-display text-3xl uppercase lg:text-4xl"
        >
          {item.period}
        </motion.p>
        {item.location && <p className="mt-1 font-mono text-sm font-bold uppercase">{item.location}</p>}
      </div>

      <motion.div
        initial={{ opacity: 0, x: right ? 60 : -60, rotate: right ? 2 : -2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        whileHover={{ x: -4, y: -4 }}
        className={cn(
          'neo-card overflow-hidden transition-shadow hover:shadow-neo-xl',
          right ? 'md:col-start-2 md:row-start-1' : 'md:col-start-1 md:row-start-1',
        )}
      >
        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-2 border-b-4 border-neo-ink px-5 py-2',
            accentBg[item.accent],
          )}
        >
          <span className="font-mono text-xs font-bold uppercase">
            {item.type === 'work' ? 'Work' : 'Education'}
          </span>
          <span className="font-mono text-xs font-bold uppercase md:hidden">
            {item.period}
            {item.location && ` · ${item.location}`}
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-xl leading-tight sm:text-2xl">{item.title}</h3>
          <p className="mt-1 font-bold">{item.organization}</p>
          <p className="mt-3">{item.description}</p>
        </div>
      </motion.div>
    </li>
  )
}

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })

  return (
    <section id="experience" className="section-pad overflow-x-clip">
      <SectionHeading index="03" title="Experience" accent="lime" />

      <div ref={listRef} className="relative">
        {/* Track + scroll-driven fill, centred on the 40px node */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[14px] top-3 w-3 border-2 border-neo-ink bg-white md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            className="h-full w-full origin-top bg-[repeating-linear-gradient(180deg,#0A0A0A_0_10px,#FF5CDB_10px_20px)]"
            style={{ scaleY: fill }}
          />
        </div>

        <ol className="relative flex flex-col gap-12 md:gap-16">
          {timeline.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

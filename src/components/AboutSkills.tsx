import { motion, type Variants } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { accentBg, personalInfo, projects, skillGroups, type AccentColor } from '../data/portfolioData'
import { cn } from '../lib/utils'
import SectionHeading from './SectionHeading'
import ScrollText from './ui/ScrollText'

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 24 } },
}

const groupContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const badgeContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
}

const badgeIn: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 20 } },
}

// Deterministic per-badge tilt so neighbours lean in different directions.
const tilts = [-6, 5, -3, 7, -5, 4]

function SkillBadge({ label, accent, i }: { label: string; accent: AccentColor; i: number }) {
  return (
    <motion.li
      variants={badgeIn}
      whileHover={{ rotate: tilts[i % tilts.length], y: -6, scale: 1.06 }}
      whileTap={{ scale: 0.92, rotate: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 600, damping: 12 }}
      className={cn(
        'cursor-default border-3 border-neo-ink bg-white px-3 py-1.5 font-mono text-sm font-bold uppercase',
        'shadow-neo-sm transition-colors duration-150',
        // Hover flips the badge to the group accent.
        accent === 'yellow' && 'hover:bg-neo-yellow',
        accent === 'pink' && 'hover:bg-neo-pink',
        accent === 'cyan' && 'hover:bg-neo-cyan',
        accent === 'lime' && 'hover:bg-neo-lime',
        accent === 'orange' && 'hover:bg-neo-orange',
        accent === 'violet' && 'hover:bg-neo-violet',
      )}
    >
      {label}
    </motion.li>
  )
}

export default function AboutSkills() {
  const stats = [
    { value: String(skillGroups.reduce((n, g) => n + g.items.length, 0)), label: 'Tools in the kit' },
    { value: String(projects.length), label: 'Featured projects' },
    { value: '∞', label: 'Coffee consumed' },
  ]

  return (
    <section id="about" className="section-pad">
      <SectionHeading index="01" title="About" accent="pink" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="neo-card p-6 sm:p-8"
          >
            <div className="mb-4 flex items-center gap-2 font-mono text-sm font-bold uppercase">
              <MapPin className="h-4 w-4" strokeWidth={3} /> {personalInfo.location}
            </div>
            <div className="space-y-4">
              {personalInfo.bio.map((p, i) => (
                <ScrollText
                  key={p.slice(0, 24)}
                  text={p}
                  className={i === 0 ? 'text-xl font-bold leading-snug sm:text-2xl' : 'text-lg'}
                />
              ))}
            </div>
          </motion.div>

          <motion.ul
            variants={groupContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-3 gap-3 sm:gap-4"
          >
            {stats.map((s, i) => (
              <motion.li
                key={s.label}
                variants={reveal}
                className={cn(
                  'border-4 border-neo-ink p-3 shadow-neo sm:p-4',
                  ['bg-neo-yellow', 'bg-neo-cyan', 'bg-neo-lime'][i],
                )}
              >
                <p className="font-display text-3xl leading-none sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase sm:text-sm">{s.label}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={groupContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={reveal} className="neo-card">
              <h3
                className={cn(
                  'flex items-center justify-between border-b-4 border-neo-ink px-4 py-2 text-lg',
                  accentBg[group.accent],
                )}
              >
                {group.category}
                <span className="font-mono text-sm">{String(group.items.length).padStart(2, '0')}</span>
              </h3>
              <motion.ul variants={badgeContainer} className="flex flex-wrap gap-2.5 p-4">
                {group.items.map((item, i) => (
                  <SkillBadge key={item} label={item} accent={group.accent} i={i} />
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

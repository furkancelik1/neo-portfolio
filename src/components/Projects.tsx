import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { accentBg, personalInfo, projects, type Project } from '../data/portfolioData'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { cn } from '../lib/utils'
import SectionHeading from './SectionHeading'
import SocialIcon from './SocialIcon'
import { buttonVariants } from './ui/button'

const githubUrl = personalInfo.socials.find((s) => s.platform === 'github')?.href ?? '#'

function ProjectCard({ project, index, className }: { project: Project; index: number; className?: string }) {
  return (
    <motion.article
      whileHover={{ rotate: index % 2 ? 1.2 : -1.2, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={cn(
        'flex flex-col border-4 border-neo-ink shadow-neo-lg',
        accentBg[project.accent],
        className,
      )}
    >
      <header className="flex items-center justify-between border-b-4 border-neo-ink px-5 py-3">
        <span className="font-display text-3xl leading-none">{String(index + 1).padStart(2, '0')}</span>
        <div className="flex gap-2">
          {project.featured && <span className="neo-tag bg-neo-ink text-neo-bg">Featured</span>}
          {project.year && <span className="neo-tag">{project.year}</span>}
        </div>
      </header>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="text-3xl leading-none sm:text-4xl lg:text-5xl">{project.title}</h3>
        <p className="mt-4 flex-1 text-base font-medium sm:text-lg">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
          {project.tags.map((tag) => (
            <li key={tag} className="neo-tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ color: 'ink', size: 'sm' })}
            >
              Live demo <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ color: 'white', size: 'sm' })}
            >
              <SocialIcon platform="github" className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function MoreCard({ className }: { className?: string }) {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'group flex flex-col justify-between border-4 border-dashed border-neo-ink bg-white p-7 transition-colors hover:bg-neo-yellow',
        className,
      )}
    >
      <span className="font-mono text-sm font-bold uppercase">More on GitHub</span>
      <span className="font-display text-4xl uppercase leading-none sm:text-5xl">
        See all
        <br />
        repos
      </span>
      <ArrowRight className="h-12 w-12 transition-transform group-hover:translate-x-3" strokeWidth={3} />
    </a>
  )
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 })
  return (
    <div className="h-4 w-full border-3 border-neo-ink bg-white" aria-hidden="true">
      <motion.div className="h-full origin-left bg-neo-pink" style={{ scaleX }} />
    </div>
  )
}

/** Desktop: vertical scroll drives a horizontal card track inside a sticky viewport. */
function HorizontalProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // Measure how far the track must travel; re-measure on resize.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    // ResizeObserver fires once on observe, which covers the initial measurement.
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  // Cards lean into the direction of travel; the faster you scroll, the more they skew.
  const velocity = useVelocity(scrollYProgress)
  const skewX = useSpring(useTransform(velocity, [-1.5, 1.5], [7, -7]), { stiffness: 300, damping: 40 })
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(projects.length, Math.floor(v * projects.length) + 1)).padStart(2, '0'),
  )

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      // Vertical room equal to the horizontal travel, plus one viewport for the sticky frame.
      style={{ height: `calc(${distance}px + 100vh)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24">
        <div className="mx-auto mb-8 flex w-full max-w-6xl items-end justify-between gap-6 px-6">
          <SectionHeading index="02" title="Projects" accent="cyan" className="mb-0" ghost={false} />
          <div className="hidden w-64 shrink-0 items-center gap-3 lg:flex">
            <span className="whitespace-nowrap font-mono text-sm font-bold tabular-nums">
              <motion.span>{counter}</motion.span> / {String(projects.length).padStart(2, '0')}
            </span>
            <ProgressBar progress={scrollYProgress} />
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, skewX }}
          className="flex w-max items-stretch gap-8 py-4 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-12"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              className="h-[min(30rem,62vh)] w-[min(34rem,46vw)] shrink-0"
            />
          ))}
          <MoreCard className="h-[min(30rem,62vh)] w-[min(20rem,30vw)] shrink-0" />
        </motion.div>
      </div>
    </section>
  )
}

/** Mobile / reduced motion: a plain vertical stack with reveal-on-scroll. */
function StackedProjects() {
  return (
    <section id="projects" className="section-pad">
      <SectionHeading index="02" title="Projects" accent="cyan" />
      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <ProjectCard project={project} index={i} className="h-full" />
          </motion.div>
        ))}
        <MoreCard className="min-h-48 sm:col-span-2" />
      </div>
    </section>
  )
}

export default function Projects() {
  const isDesktop = useMediaQuery('(min-width: 768px) and (min-height: 560px)')
  const reduce = useReducedMotion()
  return isDesktop && !reduce ? <HorizontalProjects /> : <StackedProjects />
}

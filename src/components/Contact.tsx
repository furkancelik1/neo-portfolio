import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import { cn } from '../lib/utils'
import SectionHeading from './SectionHeading'
import SocialIcon from './SocialIcon'
import { buttonVariants } from './ui/button'

const socialColors = ['bg-neo-cyan', 'bg-neo-lime', 'bg-neo-pink', 'bg-neo-violet']

/** Clipboard API with a textarea fallback for older / insecure contexts. */
async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  ta.remove()
  if (!ok) throw new Error('Copy failed')
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<number | undefined>(undefined)
  const cardRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'start 30%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 0])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleCopy = async () => {
    try {
      await copyText(personalInfo.email)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <section id="contact" className="section-pad">
      <SectionHeading index="04" title="Contact" accent="orange" />

      <motion.div
        ref={cardRef}
        style={reduce ? undefined : { scale, rotate, y }}
        className="relative border-4 border-neo-ink bg-neo-yellow p-6 shadow-neo-xl sm:p-10 lg:p-12"
      >
        <span className="neo-tag absolute -top-4 right-6 rotate-3 bg-neo-pink px-3 py-1 text-sm shadow-neo-sm">
          Replies within 24h
        </span>

        <h3 className="max-w-3xl text-[clamp(2.25rem,7vw,4rem)] leading-[0.95]">
          Got a project? Let&apos;s build it.
        </h3>
        <p className="mt-4 max-w-xl text-lg font-medium">
          I&apos;m currently {personalInfo.availability.toLowerCase()}. My inbox is always open.
        </p>

        {/* Email row: mailto + copy */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <a href={`mailto:${personalInfo.email}`} className={buttonVariants({ color: 'pink', size: 'lg' })}>
            <Send className="h-5 w-5" strokeWidth={3} /> Say hello
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className={buttonVariants({
              color: status === 'copied' ? 'lime' : status === 'error' ? 'orange' : 'white',
              size: 'lg',
              className: 'min-w-0 justify-between normal-case sm:min-w-[22rem]',
            })}
            aria-label={`Copy email address ${personalInfo.email}`}
          >
            <span className="truncate font-mono text-sm sm:text-base">{personalInfo.email}</span>
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  {status === 'copied' ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    <Copy className="h-5 w-5" strokeWidth={3} />
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </div>
        <p className="mt-2 h-5 font-mono text-xs font-bold uppercase" aria-live="polite">
          {status === 'copied' && 'Email copied to clipboard ✓'}
          {status === 'error' && 'Couldn’t copy — select the address manually'}
        </p>

        {/* Socials */}
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {personalInfo.socials.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <motion.a
                href={s.href}
                target={s.platform === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                whileHover={{ rotate: i % 2 ? 2 : -2, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  'group flex items-center justify-between border-4 border-neo-ink px-4 py-4 font-bold uppercase shadow-neo transition-shadow hover:shadow-neo-lg',
                  socialColors[i % socialColors.length],
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border-3 border-neo-ink bg-white">
                    <SocialIcon platform={s.platform} />
                  </span>
                  {s.label}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={3}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

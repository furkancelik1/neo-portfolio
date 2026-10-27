import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { navLinks, personalInfo } from '../data/portfolioData'
import { cn } from '../lib/utils'
import { useScrollTo } from '../providers/lenisContext'

export default function Navbar() {
  const scrollTo = useScrollTo()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 h-1.5 origin-left bg-neo-pink"
        style={{ scaleX: progress }}
      />
      <nav
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between border-4 border-neo-ink bg-white px-4 py-3 transition-shadow',
          scrolled ? 'shadow-neo-md' : 'shadow-neo',
        )}
        aria-label="Main"
      >
        <a
          href="#top"
          onClick={(e) => handleNav(e, '#top')}
          className="border-3 border-neo-ink bg-neo-yellow px-2 py-1 font-display text-lg uppercase leading-none shadow-neo-sm"
        >
          {personalInfo.shortName}.dev
        </a>

        <ul className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="block whitespace-nowrap border-3 border-transparent px-3 py-1.5 font-bold uppercase transition-all hover:border-neo-ink hover:bg-neo-cyan hover:shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="neo-btn ml-2 whitespace-nowrap bg-neo-pink px-4 py-2"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="border-3 border-neo-ink bg-neo-yellow p-1.5 shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15 }}
            className="mx-auto mt-2 flex max-w-6xl flex-col border-4 border-neo-ink bg-white shadow-neo-md md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="border-b-3 border-neo-ink last:border-b-0">
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="block px-4 py-3 font-bold uppercase hover:bg-neo-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

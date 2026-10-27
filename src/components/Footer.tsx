import { ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'
import { useScrollTo } from '../providers/lenisContext'

const year = new Date().getFullYear()

export default function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className="border-t-4 border-neo-ink bg-neo-ink text-neo-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="font-mono text-sm">
          © {year} {personalInfo.name}. Built with React, Tailwind &amp; too much coffee.
        </p>
        <button
          type="button"
          onClick={() => scrollTo('#top')}
          className="neo-btn border-neo-bg bg-neo-yellow px-3 py-2 text-sm text-neo-ink"
        >
          Back to top <ArrowUp className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </footer>
  )
}

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { personalInfo } from '../../data/portfolioData'

type TokenKind = 'kw' | 'var' | 'key' | 'str' | 'punc' | 'bool'
type Token = [TokenKind, string]

const tokenClass: Record<TokenKind, string> = {
  kw: 'text-neo-pink',
  var: 'text-neo-yellow',
  key: 'text-neo-cyan',
  str: 'text-neo-lime',
  bool: 'text-neo-orange',
  punc: 'text-neo-bg/70',
}

const stack = ['React', 'Node', 'TS']

const lines: Token[][] = [
  [['kw', 'const '], ['var', 'furkan'], ['punc', ' = {']],
  [['key', '  role'], ['punc', ': '], ['str', `"${personalInfo.role}"`], ['punc', ',']],
  [
    ['key', '  stack'],
    ['punc', ': ['],
    ...stack.flatMap((s, i): Token[] => [
      ['str', `"${s}"`],
      ['punc', i < stack.length - 1 ? ', ' : ''],
    ]),
    ['punc', '],'],
  ],
  [['key', '  based'], ['punc', ': '], ['str', `"${personalInfo.location}"`], ['punc', ',']],
  [['key', '  openToWork'], ['punc', ': '], ['bool', 'true'], ['punc', ',']],
  [['punc', '}']],
]

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.9 } },
}

// Each line "types" in from left to right.
const line: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.35, ease: 'linear' } },
}

/** Mini code editor that types out a JS object describing the developer. */
export default function CodeCard() {
  const reduce = useReducedMotion()

  return (
    <div className="border-3 border-neo-ink bg-neo-ink shadow-neo-sm">
      {/* Editor tab bar */}
      <div className="flex items-center gap-2 border-b-3 border-neo-ink bg-neo-yellow px-3 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-neo-ink bg-neo-pink" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-neo-ink bg-neo-lime" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-neo-ink bg-neo-cyan" />
        <span className="ml-2 font-mono text-[11px] font-bold">furkan.ts</span>
      </div>

      <motion.pre
        variants={list}
        initial={reduce ? 'show' : 'hidden'}
        animate="show"
        className="overflow-hidden p-2.5 font-mono text-[10px] leading-relaxed sm:p-4 sm:text-xs"
      >
        <span className="sr-only">
          {`${personalInfo.role} based in ${personalInfo.location}, open to work. Stack: ${stack.join(', ')}.`}
        </span>
        {lines.map((tokens, i) => (
          <motion.div key={i} variants={line} className="flex whitespace-pre" aria-hidden="true">
            <span className="mr-3 hidden w-3 select-none text-right text-neo-bg/30 sm:inline-block">{i + 1}</span>
            <code>
              {tokens.map(([kind, text], j) => (
                <span key={j} className={tokenClass[kind]}>
                  {text}
                </span>
              ))}
              {i === lines.length - 1 && (
                <motion.span
                  className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-neo-yellow"
                  animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                />
              )}
            </code>
          </motion.div>
        ))}
      </motion.pre>
    </div>
  )
}

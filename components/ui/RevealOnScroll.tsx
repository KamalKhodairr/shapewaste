'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3
  style?: React.CSSProperties
  as?: React.ElementType
}

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  style,
  as: Tag = 'div',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )

    io.observe(el)
    // Safety net — fire after 3s regardless
    const safety = setTimeout(() => el.classList.add('in'), 3000)

    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [])

  const delayClass = delay > 0 ? ` d${delay}` : ''
  const classes = `reveal${delayClass}${className ? ` ${className}` : ''}`

  return <Tag ref={ref} className={classes} style={style}>{children}</Tag>
}

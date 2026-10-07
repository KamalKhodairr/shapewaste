import { ReactNode } from 'react'

interface ArticleLayoutProps {
  main: ReactNode
  aside: ReactNode
}

export default function ArticleLayout({ main, aside }: ArticleLayoutProps) {
  return (
    <div
      className="artgrid"
      style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 'clamp(36px,5vw,76px)', alignItems: 'start' }}
    >
      <style>{`
        @media(max-width:860px){
          .artgrid{grid-template-columns:1fr!important;}
          .toc-aside{display:none!important;}
        }
      `}</style>
      <article>{main}</article>
      <aside className="toc-aside" style={{ position: 'sticky', top: 32 }}>{aside}</aside>
    </div>
  )
}

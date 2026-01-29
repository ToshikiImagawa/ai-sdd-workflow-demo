import {ReactNode, Ref} from 'react'

type Props = {
  id: string
  left: ReactNode
  right: ReactNode
  sectionRef?: Ref<HTMLElement>
}

export function BleedLayout({id, left, right, sectionRef}: Props) {
  return (
    <section ref={sectionRef} className="slide-container bleed-image-layout" id={id}>
      <div className="bleed-content">{left}</div>
      {right}
    </section>
  )
}

import {useEffect, useRef} from 'react'
import Reveal from 'reveal.js'

export function useReveal() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!deckRef.current) return

    const deck = new Reveal(deckRef.current, {
      width: 1280,
      height: 720,
      margin: 0,
      minScale: 0.2,
      maxScale: 2.0,
      center: false,
      controls: true,
      slideNumber: 'c/t',
      hash: true,
      transition: 'slide',
      progress: true,
      keyboard: true,
      touch: true,
      navigationMode: 'linear',
    })

    deck.initialize()

    return () => {
      deck.destroy()
    }
  }, [])

  return deckRef
}

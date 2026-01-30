import { describe, expect, it, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { SlideRenderer } from '../SlideRenderer'
import { registerDefaultComponents } from '../registerDefaults'
import { defaultPresentationData } from '../../data'
import { theme } from '../../theme'

function renderWithTheme(ui: React.ReactNode) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('SlideRenderer', () => {
  beforeEach(() => {
    registerDefaultComponents()
  })

  it('デフォルトデータで全スライドがレンダリングされる', () => {
    const { container } = renderWithTheme(<SlideRenderer slides={defaultPresentationData.slides} />)
    const sections = container.querySelectorAll('section.slide-container')
    expect(sections.length).toBe(defaultPresentationData.slides.length)
  })

  it('各スライドに正しいidが設定される', () => {
    const { container } = renderWithTheme(<SlideRenderer slides={defaultPresentationData.slides} />)
    for (const slide of defaultPresentationData.slides) {
      const section = container.querySelector(`#${slide.id}`)
      expect(section).not.toBeNull()
    }
  })

  it('タイトルスライドにh1要素が含まれる', () => {
    const titleSlide = defaultPresentationData.slides[0]
    const { container } = renderWithTheme(<SlideRenderer slides={[titleSlide]} />)
    const h1 = container.querySelector('h1')
    expect(h1).not.toBeNull()
    expect(h1?.textContent).toContain(titleSlide.content.title)
  })

  it('two-columnスライドにh2タイトルが含まれる', () => {
    const contentSlide = defaultPresentationData.slides.find((s) => s.layout === 'two-column')!
    const { container } = renderWithTheme(<SlideRenderer slides={[contentSlide]} />)
    const h2 = container.querySelector('h2.slide-title')
    expect(h2).not.toBeNull()
    expect(h2?.textContent).toBe(contentSlide.content.title)
  })

  it('workflowスライドにステップが含まれる', () => {
    const workflowSlide = defaultPresentationData.slides.find((s) => s.layout === 'workflow')!
    const { container } = renderWithTheme(<SlideRenderer slides={[workflowSlide]} />)
    const steps = (workflowSlide.content as Record<string, unknown>).steps as Array<{ title: string }>
    for (const step of steps) {
      expect(container.textContent).toContain(step.title)
    }
  })

  it('featuresスライドにタイル情報が含まれる', () => {
    const featuresSlide = defaultPresentationData.slides.find((s) => s.layout === 'features')!
    const { container } = renderWithTheme(<SlideRenderer slides={[featuresSlide]} />)
    const tiles = (featuresSlide.content as Record<string, unknown>).tiles as Array<{ title: string }>
    for (const tile of tiles) {
      expect(container.textContent).toContain(tile.title)
    }
  })

  it('summaryスライドにタイトルが含まれる', () => {
    const summarySlide = defaultPresentationData.slides.find((s) => s.layout === 'summary')!
    const { container } = renderWithTheme(<SlideRenderer slides={[summarySlide]} />)
    expect(container.textContent).toContain(summarySlide.content.title)
  })

  it('metaが指定されたスライドにdata-transition属性が設定される', () => {
    const slideWithMeta = {
      id: 'test-meta',
      layout: 'title' as const,
      content: { title: 'Test' },
      meta: { transition: 'fade' },
    }
    const { container } = renderWithTheme(<SlideRenderer slides={[slideWithMeta]} />)
    const section = container.querySelector('#test-meta')
    expect(section?.getAttribute('data-transition')).toBe('fade')
  })

  it('空のスライド配列で何もレンダリングされない', () => {
    const { container } = renderWithTheme(<SlideRenderer slides={[]} />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBe(0)
  })
})

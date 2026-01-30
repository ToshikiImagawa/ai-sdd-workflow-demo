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

  it('デフォルトデータで10枚のスライドがレンダリングされる', () => {
    const { container } = renderWithTheme(<SlideRenderer slides={defaultPresentationData.slides} />)
    const sections = container.querySelectorAll('section.slide-container')
    expect(sections.length).toBe(10)
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
    expect(h1?.textContent).toContain('AI-SDD-Workflow')
  })

  it('ContentLayoutスライドにh2タイトルが含まれる', () => {
    const contentSlide = defaultPresentationData.slides[1]
    const { container } = renderWithTheme(<SlideRenderer slides={[contentSlide]} />)
    const h2 = container.querySelector('h2.slide-title')
    expect(h2).not.toBeNull()
    expect(h2?.textContent).toBe('Introduction: The Problem')
  })

  it('ワークフロースライドにステップが含まれる', () => {
    const workflowSlide = defaultPresentationData.slides[4]
    const { container } = renderWithTheme(<SlideRenderer slides={[workflowSlide]} />)
    expect(container.textContent).toContain('Specify')
    expect(container.textContent).toContain('Plan')
    expect(container.textContent).toContain('Task')
    expect(container.textContent).toContain('Implement')
  })

  it('フィーチャースライドにタイル情報が含まれる', () => {
    const featuresSlide = defaultPresentationData.slides[5]
    const { container } = renderWithTheme(<SlideRenderer slides={[featuresSlide]} />)
    expect(container.textContent).toContain('Auto Review')
    expect(container.textContent).toContain('Task Breakdown')
    expect(container.textContent).toContain('Vibe Detector')
  })

  it('サマリースライドにGitHubリンク情報が含まれる', () => {
    const summarySlide = defaultPresentationData.slides[9]
    const { container } = renderWithTheme(<SlideRenderer slides={[summarySlide]} />)
    expect(container.textContent).toContain('Start SDD Today')
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

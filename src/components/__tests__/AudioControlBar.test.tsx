import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AudioControlBar } from '../AudioControlBar'

describe('AudioControlBar', () => {
  it('自動再生ボタンが表示される', () => {
    render(<AudioControlBar autoPlay={false} onAutoPlayChange={() => {}} autoSlideshow={false} onAutoSlideshowChange={() => {}} />)
    const button = screen.getByRole('button', { name: '自動再生をONにする' })
    expect(button).toBeDefined()
  })

  it('自動スライドショーボタンが表示される', () => {
    render(<AudioControlBar autoPlay={false} onAutoPlayChange={() => {}} autoSlideshow={false} onAutoSlideshowChange={() => {}} />)
    const button = screen.getByRole('button', { name: '自動スライドショーをONにする' })
    expect(button).toBeDefined()
  })

  it('自動再生ボタンクリックで onAutoPlayChange が呼ばれる', () => {
    const onChange = vi.fn()
    render(<AudioControlBar autoPlay={false} onAutoPlayChange={onChange} autoSlideshow={false} onAutoSlideshowChange={() => {}} />)

    fireEvent.click(screen.getByRole('button', { name: '自動再生をONにする' }))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('自動再生 ON 時にクリックで OFF が呼ばれる', () => {
    const onChange = vi.fn()
    render(<AudioControlBar autoPlay={true} onAutoPlayChange={onChange} autoSlideshow={false} onAutoSlideshowChange={() => {}} />)

    fireEvent.click(screen.getByRole('button', { name: '自動再生をOFFにする' }))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('自動スライドショーボタンクリックで onAutoSlideshowChange が呼ばれる', () => {
    const onChange = vi.fn()
    render(<AudioControlBar autoPlay={false} onAutoPlayChange={() => {}} autoSlideshow={false} onAutoSlideshowChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: '自動スライドショーをONにする' }))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('aria-pressed が状態を反映する', () => {
    render(<AudioControlBar autoPlay={true} onAutoPlayChange={() => {}} autoSlideshow={false} onAutoSlideshowChange={() => {}} />)

    const autoPlayBtn = screen.getByRole('button', { name: '自動再生をOFFにする' })
    const autoSlideshowBtn = screen.getByRole('button', { name: '自動スライドショーをONにする' })

    expect(autoPlayBtn.getAttribute('aria-pressed')).toBe('true')
    expect(autoSlideshowBtn.getAttribute('aria-pressed')).toBe('false')
  })
})

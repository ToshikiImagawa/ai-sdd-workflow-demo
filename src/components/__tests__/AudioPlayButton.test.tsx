import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AudioPlayButton } from '../AudioPlayButton'

describe('AudioPlayButton', () => {
  it('idle 状態でスピーカーアイコンが表示される', () => {
    render(<AudioPlayButton playbackState="idle" onToggle={() => {}} />)
    const button = screen.getByRole('button', { name: '音声を再生' })
    expect(button).toBeDefined()
  })

  it('playing 状態でタイトルが「音声を停止」になる', () => {
    render(<AudioPlayButton playbackState="playing" onToggle={() => {}} />)
    const button = screen.getByRole('button', { name: '音声を停止' })
    expect(button).toBeDefined()
  })

  it('クリックで onToggle が呼ばれる', () => {
    const onToggle = vi.fn()
    render(<AudioPlayButton playbackState="idle" onToggle={onToggle} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('playing 状態でクリックすると onToggle が呼ばれる', () => {
    const onToggle = vi.fn()
    render(<AudioPlayButton playbackState="playing" onToggle={onToggle} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})

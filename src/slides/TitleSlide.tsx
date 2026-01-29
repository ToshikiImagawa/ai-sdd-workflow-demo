import {SlideHeading} from '../components/SlideHeading'
import {SubtitleText} from '../components/SubtitleText'
import {TitleLayout} from '../layouts'

export function TitleSlide() {
  return (
    <TitleLayout id="slide1">
      <SlideHeading title="AI-SDD-Workflow" variant="h1" sx={{color: 'var(--theme-text-heading)'}} />
      <SubtitleText>
        脱・Vibe Coding。
        <br />
        仕様駆動で実現する、確実なAIソフトウェア開発。
      </SubtitleText>
    </TitleLayout>
  )
}

import {BulletList} from '../components/BulletList'
import {SlideHeading} from '../components/SlideHeading'
import {TwoColumnGrid} from '../components/TwoColumnGrid'
import {VibeCodingDemo} from '../visuals/VibeCodingDemo'
import {ContentLayout} from '../layouts'

export function ProblemSlide() {
  return (
    <ContentLayout id="slide2" title="Introduction: The Problem">
      <TwoColumnGrid
        left={
          <>
            <SlideHeading
              title={'"Vibe Coding" の限界'}
              variant="h3"
              description="AIに対して「いい感じに作って」と指示していませんか？"
            />
            <BulletList
              items={[
                <>
                  <strong>曖昧な指示:</strong> AIが意図を推測する必要がある
                </>,
                <>
                  <strong>認識のズレ:</strong> 推測に基づく実装は、開発者の意図と乖離しやすい
                </>,
                <>
                  <strong>バグの温床:</strong> 制御不能なコードが生成される
                </>,
              ]}
            />
          </>
        }
        right={<VibeCodingDemo />}
      />
    </ContentLayout>
  )
}

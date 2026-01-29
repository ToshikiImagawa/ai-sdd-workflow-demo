import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import {BulletListItem} from '../components/BulletListItem'
import {TwoColumnGrid} from '../components/TwoColumnGrid'
import {VibeCodingDemo} from '../visuals/VibeCodingDemo'
import {ContentLayout} from '../layouts'

export function ProblemSlide() {
  return (
    <ContentLayout id="slide2" title="Introduction: The Problem">
      <TwoColumnGrid
        left={
          <>
            <Typography variant="h3" sx={{mb: '12px'}}>
              "Vibe Coding" の限界
            </Typography>
            <Typography variant="body1" sx={{mb: '20px'}}>
              AIに対して「いい感じに作って」と指示していませんか？
            </Typography>
            <List disablePadding>
              <BulletListItem
                primary={
                  <>
                    <strong>曖昧な指示:</strong> AIが意図を推測する必要がある
                  </>
                }
              />
              <BulletListItem
                primary={
                  <>
                    <strong>認識のズレ:</strong> 推測に基づく実装は、開発者の意図と乖離しやすい
                  </>
                }
              />
              <BulletListItem
                primary={
                  <>
                    <strong>バグの温床:</strong> 制御不能なコードが生成される
                  </>
                }
              />
            </List>
          </>
        }
        right={<VibeCodingDemo />}
      />
    </ContentLayout>
  )
}

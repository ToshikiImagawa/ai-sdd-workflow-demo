import DescriptionIcon from '@mui/icons-material/Description'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import TrafficIcon from '@mui/icons-material/Traffic'
import { FeatureTileGrid } from '../components/FeatureTileGrid'
import { ContentLayout } from '../layouts'

const tiles = [
  {
    icon: <DescriptionIcon sx={{ fontSize: 32 }} />,
    title: 'Auto Review',
    description: 'ドキュメント生成後、即座にAIレビュアーが起動。人間の介入前に品質を担保します。',
  },
  {
    icon: <PlaylistAddCheckIcon sx={{ fontSize: 32 }} />,
    title: 'Task Breakdown',
    description: '設計書から実装タスクを自動分解。TDDベースの小さなステップで確実な実装を支援。',
  },
  {
    icon: <TrafficIcon sx={{ fontSize: 32 }} />,
    title: 'Vibe Detector',
    description: 'ユーザーの指示の曖昧さを3段階（赤/黄/緑）で自動判定し、リスクを警告。',
  },
]

export function AutomationSlide() {
  return (
    <ContentLayout id="slide6" title="Powerful Automation">
      <FeatureTileGrid tiles={tiles} />
    </ContentLayout>
  )
}

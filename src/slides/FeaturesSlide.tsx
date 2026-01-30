import MemoryIcon from '@mui/icons-material/Memory'
import SearchIcon from '@mui/icons-material/Search'
import { FeatureTileGrid } from '../components/FeatureTileGrid'
import { ContentLayout } from '../layouts'

const tiles = [
  {
    icon: <MemoryIcon sx={{ fontSize: 32 }} />,
    title: 'Context Efficiency',
    description:
      'レビュー処理を独立したサブエージェントに隔離。メインコンテキストのトークン消費を抑え、長期間の開発でも軽快な動作を維持。',
  },
  {
    icon: <SearchIcon sx={{ fontSize: 32 }} />,
    title: 'Clarification',
    description: (
      <>
        <code>/clarify</code>{' '}
        コマンドが仕様の穴を9つのカテゴリで自動スキャン。質問と回答を自動的に仕様書へ統合し、手戻りを防ぎます。
      </>
    ),
  },
]

export function FeaturesSlide() {
  return (
    <ContentLayout id="slide8" title="Advanced Features">
      <FeatureTileGrid tiles={tiles} />
    </ContentLayout>
  )
}

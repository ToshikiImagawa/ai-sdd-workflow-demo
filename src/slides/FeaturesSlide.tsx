import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MemoryIcon from '@mui/icons-material/Memory'
import SearchIcon from '@mui/icons-material/Search'
import {ContentLayout} from '../layouts'

const tiles = [
  {
    icon: <MemoryIcon sx={{fontSize: 32}} />,
    title: 'Context Efficiency',
    description:
      'レビュー処理を独立したサブエージェントに隔離。メインコンテキストのトークン消費を抑え、長期間の開発でも軽快な動作を維持。',
  },
  {
    icon: <SearchIcon sx={{fontSize: 32}} />,
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
      <Stack direction="row" spacing="30px" sx={{width: '100%'}}>
        {tiles.map((tile) => (
          <Card key={tile.title} sx={{flex: 1, p: '30px'}}>
            <CardContent sx={{p: 0, '&:last-child': {pb: 0}}}>
              <Avatar
                sx={{
                  width: 62,
                  height: 62,
                  mb: '20px',
                  bgcolor: 'rgba(var(--theme-primary-rgb), 0.06)',
                  border: '1px solid rgba(var(--theme-primary-rgb), 0.12)',
                  borderRadius: '14px',
                  color: 'var(--theme-primary)',
                }}
                variant="rounded"
              >
                {tile.icon}
              </Avatar>
              <Typography variant="h3" sx={{mb: '12px'}}>
                {tile.title}
              </Typography>
              <Typography variant="body2">{tile.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </ContentLayout>
  )
}

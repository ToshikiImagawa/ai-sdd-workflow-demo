import type {ReactNode} from 'react'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import {BulletListItem} from './BulletListItem'

type Props = {
  title: string
  items: ReactNode[]
}

export function TitledBulletList({title, items}: Props) {
  return (
    <>
      <Typography variant="h3" sx={{mb: '12px'}}>
        {title}
      </Typography>
      <List disablePadding>
        {items.map((item, i) => (
          <BulletListItem key={i} primary={item} />
        ))}
      </List>
    </>
  )
}

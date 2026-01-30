import type { ReactNode } from 'react'
import Grid from '@mui/material/Grid'

type Props = {
  left: ReactNode
  right: ReactNode
}

export function TwoColumnGrid({ left, right }: Props) {
  return (
    <Grid container spacing="60px" sx={{ alignItems: 'stretch', height: '100%' }}>
      <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        {left}
      </Grid>
      <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        {right}
      </Grid>
    </Grid>
  )
}

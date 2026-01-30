import type { ReactNode } from 'react'
import Grid from '@mui/material/Grid'

type Props = {
  left: ReactNode
  right: ReactNode
}

export function TwoColumnGrid({ left, right }: Props) {
  return (
    <Grid container spacing="60px" sx={{ alignItems: 'center' }}>
      <Grid size={6}>{left}</Grid>
      <Grid size={6}>{right}</Grid>
    </Grid>
  )
}

import type {ReactNode} from 'react'
import type {SxProps, Theme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

type Props = {
  title: string
  description?: ReactNode | ReactNode[]
  sx?: SxProps<Theme>
}

export function SlideHeading({title, description, sx}: Props) {
  const items = Array.isArray(description) ? description : description != null ? [description] : []

  return (
    <>
      <Typography variant="h2" sx={{mb: '20px', ...sx}}>
        {title}
      </Typography>
      {items.map((item, i) => (
        <Typography key={i} variant="body1" sx={i < items.length - 1 ? {mb: '16px'} : undefined}>
          {item}
        </Typography>
      ))}
    </>
  )
}

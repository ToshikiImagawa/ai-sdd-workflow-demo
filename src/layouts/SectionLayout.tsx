import Box from '@mui/material/Box'

type Props = { id: string; children: React.ReactNode }

export function SectionLayout({ id, children }: Props) {
  return (
    <section className="slide-container" id={id}>
      <Box className="section-title-layout">{children}</Box>
    </section>
  )
}

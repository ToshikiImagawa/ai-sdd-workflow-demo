import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = { id: string; title: string; children: React.ReactNode };

export function ContentLayout({id, title, children}: Props) {
    return (
        <section className="slide-container" id={id}>
            <Typography variant="h2" className="slide-title">
                {title}
            </Typography>
            <Box className="content-area">
                {children}
            </Box>
        </section>
    );
}

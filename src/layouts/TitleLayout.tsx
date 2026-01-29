import Box from '@mui/material/Box';

type Props = { id: string; children: React.ReactNode };

export function TitleLayout({id, children}: Props) {
    return (
        <section className="slide-container" id={id}>
            <Box className="title-layout">
                {children}
            </Box>
        </section>
    );
}

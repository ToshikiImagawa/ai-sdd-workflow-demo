import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function TitleSlide() {
    return (
        <section className="slide-container" id="slide1">
            <Box className="title-layout">
                <Typography variant="h1" sx={{mb: '20px', color: 'var(--theme-text-heading)'}}>
                    AI-SDD-Workflow
                </Typography>
                <Typography variant="subtitle1">
                    脱・Vibe Coding。<br/>
                    仕様駆動で実現する、確実なAIソフトウェア開発。
                </Typography>
            </Box>
        </section>
    );
}

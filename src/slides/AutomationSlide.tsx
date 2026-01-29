import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TrafficIcon from '@mui/icons-material/Traffic';
import {ContentLayout} from '../layouts';

const tiles = [
    {
        icon: <DescriptionIcon sx={{fontSize: 32}}/>,
        title: 'Auto Review',
        description: 'ドキュメント生成後、即座にAIレビュアーが起動。人間の介入前に品質を担保します。',
    },
    {
        icon: <PlaylistAddCheckIcon sx={{fontSize: 32}}/>,
        title: 'Task Breakdown',
        description: '設計書から実装タスクを自動分解。TDDベースの小さなステップで確実な実装を支援。',
    },
    {
        icon: <TrafficIcon sx={{fontSize: 32}}/>,
        title: 'Vibe Detector',
        description: 'ユーザーの指示の曖昧さを3段階（赤/黄/緑）で自動判定し、リスクを警告。',
    },
];

export function AutomationSlide() {
    return (
        <ContentLayout id="slide6" title="Powerful Automation">
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
                            <Typography variant="body2">
                                {tile.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </ContentLayout>
    );
}

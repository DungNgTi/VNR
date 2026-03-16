import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function Author({ authors, date }) {
    if (!authors || authors.length === 0) return null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar key={index} alt={author.Name} src={author.Image} sx={{ width: 24, height: 24 }} />
                    ))}
                </AvatarGroup>
                <Typography variant="caption">
                    {authors.map((author) => author.Name).join(', ')}
                </Typography>
            </Box>
            <Typography variant="caption">{date}</Typography>
        </Box>
    );
}
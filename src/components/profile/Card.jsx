import { Box, Typography, Avatar, Chip, Stack } from "@mui/material"

export function ProfileCard({ item, parallaxOffset = 0, parallax = false }) {
    const { Image, Title, Description, Tags, Date: date, Content } = item

    return (
        <Box
            sx={{
                flexShrink: 0,
                width: { xs: 240, md: 280 },
                height: "100%", // Đảm bảo chiếm trọn chiều cao của slide
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                transform: parallax ? `translateY(${parallaxOffset}px)` : "none",
                transition: "transform 0.1s linear",
            }}
        >
            <Avatar
                src={Image?.[0]}
                alt={Title}
                sx={{ width: 80, height: 80 }}
            />

            {Title && (
                <Typography variant="h6" fontWeight={700} textAlign="center" dangerouslySetInnerHTML={{ __html: Title }} />
            )}

            {Description && (
                <Typography variant="body2" color="text.secondary" textAlign="center" dangerouslySetInnerHTML={{ __html: Description }} />
            )}

            {Content && (
                <Typography variant="caption" color="text.secondary" textAlign="center" dangerouslySetInnerHTML={{ __html: Content }} />
            )}

            {Tags?.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                    {Tags.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" variant="outlined" />
                    ))}
                </Stack>
            )}

            {date && (
                <Typography variant="caption" color="text.disabled">
                    {date}
                </Typography>
            )}
        </Box>
    )
}
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import { dataItemProps } from '../../schemas/data'

const Chevron = ({ open }) => (
    <Box sx={{ flexShrink: 0, color: open ? "primary.main" : "text.disabled", transition: "transform .25s, color .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "flex" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    </Box>
)

export default ({ item = dataItemProps, index = 0, open = false, onToggle }) => (
    <Box
        onClick={onToggle}
        sx={{
            mb: 1,
            borderRadius: 2,
            border: "1px solid",
            borderColor: open ? "primary.main" : "divider",
            backgroundColor: open ? "action.selected" : "background.paper",
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color .2s, background-color .2s",
            "&:hover": { borderColor: open ? "primary.main" : "text.disabled" },
        }}
    >
        {/* Header */}
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ py: 2, px: 2, userSelect: "none", "&:hover .acc-title": { color: "primary.main" } }}
        >
            <Box sx={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: open ? "primary.main" : "action.disabled", transition: "background .2s" }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: open ? "primary.contrastText" : "text.secondary", lineHeight: 1 }}>
                    {index + 1}
                </Typography>
            </Box>

            <Typography
                className="acc-title"
                variant="body1"
                fontWeight={600}
                sx={{ flex: 1, transition: "color .15s", color: open ? "primary.main" : "text.primary", textAlign: "left" }}
                dangerouslySetInnerHTML={{ __html: item.Title }}
            />

            {!open && item.Tags?.filter(Boolean).length > 0 && (
                <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", sm: "flex" } }}>
                    {item.Tags.filter(Boolean).slice(0, 2).map((tag, t) => (
                        <Chip key={t} label={tag} size="small" sx={{ height: 20, fontSize: 10, fontWeight: 600 }} />
                    ))}
                </Stack>
            )}

            <Chevron open={open} />
        </Stack>

        {/* Body */}
        <Collapse in={open} unmountOnExit>
            <Box sx={{ px: 2, pb: 2.5, backgroundColor: "action.selected" }}>
                <Divider sx={{ mb: 2 }} />

                {item.Description && (
                    <Box
                        sx={{ typography: "body2", color: "text.secondary", lineHeight: 1.8, mb: item.Content ? 1.5 : 0, "& p": { mb: 1.5 }, "& *:last-child": { mb: 0 } }}
                        dangerouslySetInnerHTML={{ __html: item.Description }}
                    />
                )}
                {item.Content && (
                    <Box
                        sx={{ typography: "body2", lineHeight: 1.8, "& p": { mb: 1.5 }, "& *:last-child": { mb: 0 } }}
                        dangerouslySetInnerHTML={{ __html: item.Content }}
                    />
                )}

                {item.Tags?.filter(Boolean).length > 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={0.5} mt={2}>
                        {item.Tags.filter(Boolean).map((tag, t) => (
                            <Chip key={t} label={tag} size="small" variant="outlined" color="primary" />
                        ))}
                    </Stack>
                )}
            </Box>
        </Collapse>
    </Box>
)
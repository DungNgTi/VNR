import { Box, Typography, Chip, Stack, Divider, Collapse, Paper, Avatar } from "@mui/material"
import { useState } from "react"
import { comparisonProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

function BaselinePanel({ item }) {
    if (!item) return null
    const initials = item.Title?.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase()

    return (
        <Box sx={{ width: { xs: "100%", md: 260 }, flexShrink: 0, borderRight: { md: "1px solid" }, borderBottom: { xs: "1px solid", md: "none" }, borderColor: "divider", pr: { md: 3 }, pb: { xs: 3, md: 0 } }}>
            <Avatar variant="rounded" sx={{ width: 44, height: 44, mb: 2, bgcolor: "action.selected", color: "text.secondary", fontWeight: 700 }}>
                {initials}
            </Avatar>
            {item.Date && <Typography variant="overline" color="text.disabled" display="block" sx={{ mb: 0.5 }}>{item.Date}</Typography>}
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, lineHeight: 1.3 }} dangerouslySetInnerHTML={{ __html: item.Title }} />
            {item.Description && <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item.Description }} />}
            {item.Content && <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{item.Content}</Typography>}
            {item.Tags?.filter(Boolean).length > 0 && (
                <Stack direction="row" flexWrap="wrap" gap={0.5} mt={1.5}>
                    {item.Tags.filter(Boolean).map((tag, i) => <Chip key={i} label={tag} size="small" variant="outlined" />)}
                </Stack>
            )}
        </Box>
    )
}

function ItemRow({ item, isActive, onClick, index }) {
    return (
        <Paper
            onClick={onClick}
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2, cursor: "pointer", borderColor: isActive ? "primary.main" : "divider", bgcolor: isActive ? "primary.50" : "background.paper", transition: "all .15s", "&:hover": { borderColor: "primary.light", bgcolor: isActive ? "primary.50" : "action.hover" } }}
        >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Avatar sx={{ width: 28, height: 28, fontSize: 12, fontWeight: 700, bgcolor: isActive ? "primary.main" : "action.selected", color: isActive ? "primary.contrastText" : "text.secondary", mt: "2px", flexShrink: 0 }}>
                    {index + 1}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1} mb={0.4}>
                        <Typography variant="body2" fontWeight={700} color={isActive ? "primary.main" : "text.primary"} noWrap dangerouslySetInnerHTML={{ __html: item.Title || `Mục ${index + 1}` }} />
                        {item.Date && <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>{item.Date}</Typography>}
                    </Stack>
                    {item.Description && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden", lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: item.Description }} />
                    )}
                    {item.Tags?.filter(Boolean).length > 0 && (
                        <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.75}>
                            {item.Tags.filter(Boolean).slice(0, 3).map((tag, i) => (
                                <Chip key={i} label={tag} size="small" sx={{ height: 18, fontSize: 10, fontWeight: 600, bgcolor: isActive ? "primary.100" : "action.hover", color: isActive ? "primary.dark" : "text.secondary", border: "none" }} />
                            ))}
                        </Stack>
                    )}
                </Box>
            </Stack>

            <Collapse in={isActive} unmountOnExit>
                <Divider sx={{ my: 1.5 }} />
                {item.Content && <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{item.Content}</Typography>}
            </Collapse>
        </Paper>
    )
}

export default function ComparisonModule({ data = [dataItemProps], config = comparisonProps }) {
    const { Title, Description, Config: { FromIndex = [0], ToIndex = [1] } = {} } = config
    const fromItem = FromIndex.map(i => data[i]).filter(Boolean)[0]
    const toItems = ToIndex.map(i => data[i]).filter(Boolean)
    const [active, setActive] = useState(0)

    return (
        <Box>
            {Title && <Typography variant="h4" sx={{ mb: 0.5 }} dangerouslySetInnerHTML={{ __html: Title }} />}
            {Description && <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: Description }} />}

            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
                <BaselinePanel item={fromItem} />
                <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
                    {toItems.map((item, i) => (
                        <ItemRow key={i} item={item} index={i} isActive={active === i} onClick={() => setActive(active === i ? null : i)} />
                    ))}
                </Stack>
            </Stack>
        </Box>
    )
}
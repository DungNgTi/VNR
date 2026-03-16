import { Box, Typography, Chip, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import { diffWords } from "diff"
import { comparisonProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

const REMOVED_COLOR  = "rgba(255, 80,  80,  0.12)"
const ADDED_COLOR    = "rgba(40,  167, 69,  0.12)"
const REMOVED_BORDER = "rgba(255, 80,  80,  0.4)"
const ADDED_BORDER   = "rgba(40,  167, 69,  0.4)"
const REMOVED_LABEL  = "rgba(200, 40,  40,  1)"
const ADDED_LABEL    = "rgba(30,  130, 50,  1)"

function SidePanel({ item, changes, side }) {
    const bg     = side === "old" ? REMOVED_COLOR  : ADDED_COLOR
    const border = side === "old" ? REMOVED_BORDER : ADDED_BORDER
    const label  = side === "old" ? REMOVED_LABEL  : ADDED_LABEL
    const hasChanges = changes.some(c => c.added || c.removed)

    return (
        <Box sx={{
            flex: 1,
            backgroundColor: hasChanges ? bg : "action.hover",
            border: "1px solid",
            borderColor: hasChanges ? border : "divider",
            borderRadius: 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            p: 2.5,
            minHeight: 200,
        }}>
            {item?.Title && (
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: hasChanges ? label : "text.primary" }}>
                    {item.Title}
                </Typography>
            )}
            {item?.Date && (
                <Typography variant="caption" color="text.disabled" display="block" sx={{ mb: 1 }}>
                    {item.Date}
                </Typography>
            )}

            <Typography variant="body2" component="p" sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {changes
                    .filter(c => side === "old" ? !c.added : !c.removed)
                    .map((c, i) => {
                        const isChanged = side === "old" ? c.removed : c.added
                        if (!isChanged) return <span key={i}>{c.value}</span>
                        return (
                            <Box key={i} component="mark" sx={{
                                background:   side === "old" ? "rgba(255,80,80,0.18)" : "rgba(40,167,69,0.18)",
                                color:        label,
                                borderRadius: "3px",
                                px:           "2px",
                                fontWeight:   600,
                            }}>
                                {c.value}
                            </Box>
                        )
                    })
                }
            </Typography>

            {item?.Tags?.filter(Boolean).length > 0 && (
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 1.5 }}>
                    {item.Tags.filter(Boolean).map((tag, i) => (
                        <Chip key={i} label={tag} size="small" variant="outlined"
                            sx={{ borderColor: border, color: label }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}

function SideTabs({ items, activeIndex, onChange, side }) {
    const color      = side === "old" ? REMOVED_LABEL  : ADDED_LABEL
    const dotColor   = side === "old" ? "error.main"   : "success.main"
    const headerText = side === "old" ? "CŨ"      : "MỚI"
    const legendBg   = side === "old" ? REMOVED_COLOR  : ADDED_COLOR
    const legendBdr  = side === "old" ? REMOVED_BORDER : ADDED_BORDER

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

            {/* Header */}
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, px: 0.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: legendBg, border: `1px solid ${legendBdr}` }} />
                <Typography variant="caption" fontWeight={700} color="text.secondary">{headerText}</Typography>
            </Box> */}

            {/* Tab bar */}
            <Box sx={{
                border: "1px solid", borderColor: "divider",
                borderRadius: "8px 8px 0 0",
                backgroundColor: "action.hover",
                overflow: "hidden",
            }}>
                <Tabs
                    value={activeIndex}
                    onChange={(_, v) => onChange(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    TabIndicatorProps={{ style: { backgroundColor: color } }}
                    sx={{
                        minHeight: 40,
                        "& .MuiTab-root": {
                            minHeight: 40,
                            fontSize: 12,
                            fontWeight: 600,
                            textTransform: "none",
                            px: 2,
                            color: "text.secondary",
                        },
                        "& .Mui-selected": { color: `${color} !important` },
                    }}
                >
                    {items.map((item, i) => (
                        <Tab
                            key={i}
                            label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <Typography variant="caption" fontWeight={600} sx={{ lineHeight: 1 }}>
                                        {item?.Title || `Mục ${i + 1}`}
                                    </Typography>
                                </Box>
                            }
                        />
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}

export default function ComparisonModule({
    data   = [dataItemProps],
    config = comparisonProps
}) {
    const { Title, Description } = config
    const { FromIndex = [0], ToIndex = [1] } = config.Config || {}

    const fromItems = FromIndex.map(i => data[i]).filter(Boolean)
    const toItems   = ToIndex.map(i => data[i]).filter(Boolean)

    const [fromTab, setFromTab] = useState(0)
    const [toTab,   setToTab]   = useState(0)

    const oldItem  = fromItems[fromTab]
    const newItem  = toItems[toTab]
    const oldText  = oldItem?.Content || oldItem?.Description || ""
    const newText  = newItem?.Content || newItem?.Description || ""
    const changes  = diffWords(oldText, newText, {
        intlSegmenter: new Intl.Segmenter("vi", { granularity: "word" })
    })
    const hasChanges = changes.some(c => c.added || c.removed)

    return (
        <Box sx={{ width: "100%" }}>

            {Title       && <Typography variant="h4"    sx={{ mb: 0.5 }}>{Title}</Typography>}
            {Description && <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{Description}</Typography>}

            {/* Two independent tab bars side by side */}
            <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
                <SideTabs items={fromItems} activeIndex={fromTab} onChange={setFromTab} side="old" />
                <SideTabs items={toItems}   activeIndex={toTab}   onChange={setToTab}   side="new" />
            </Box>

            {/* Change badge */}
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 0.5, py: 1 }}>
                {hasChanges
                    ? <Chip label="Có thay đổi"    size="small" sx={{ backgroundColor: "rgba(255,180,0,0.15)", color: "warning.dark", fontWeight: 600, fontSize: 11 }} />
                    : <Chip label="Không thay đổi" size="small" sx={{ backgroundColor: "rgba(40,167,69,0.1)",  color: "success.dark", fontWeight: 600, fontSize: 11 }} />
                }
                <Typography variant="caption" color="text.disabled">
                    So sánh mục <strong>{fromTab + 1}</strong> với mục <strong>{toTab + 1}</strong>
                </Typography>
            </Box> */}

            {/* Side by side panels */}
            <Box sx={{ display: "flex", gap: "15px" }}>
                <SidePanel item={oldItem} changes={changes} side="old" />
                <SidePanel item={newItem} changes={changes} side="new" />
            </Box>

        </Box>
    )
}
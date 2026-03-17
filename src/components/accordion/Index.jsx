import { useState } from "react"
import { Box, Typography, Stack, Chip, Collapse, Divider } from "@mui/material"
import { accordionProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"
import AccordionItem from "./Item";

export default function AccordionModule({ data = [dataItemProps], config = accordionProps }) {
    const { Title, Description, Config: { DefaultExpanded = 0, Alignment = "Left" } = {} } = config
    const centered = Alignment === "Center"

    const [expanded, setExpanded] = useState(DefaultExpanded)
    const toggle = i => setExpanded(prev => prev === i ? null : i)

    return (
        <Box sx={{ width: "100%", textAlign: centered ? "center" : "left" }}>
            {Title       && <Typography variant="h4"    sx={{ mb: 0.5 }} dangerouslySetInnerHTML={{ __html: Title }} />}
            {Description && <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: Description }} />}

            <Box sx={{ maxWidth: 860, mx: centered ? "auto" : 0 }}>
                {data?.map((item, i) => (
                    <AccordionItem
                        key={i}
                        item={item}
                        index={i}
                        open={expanded === i}
                        onToggle={() => toggle(i)}
                    />
                ))}
            </Box>
        </Box>
    )
}
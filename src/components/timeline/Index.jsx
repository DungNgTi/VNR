import {
    Box,
    Typography,
    Chip,
    Avatar,
    Paper
} from "@mui/material"

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from "@mui/lab"

import { timelineProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

function TimelineCard({ item, alignment }) {
    const { Image, Title, Description, Content, Tags, Author, Date: date, Link } = item

    const handleClick = () => {
        if (Link?.Href) window.open(Link.Href, Link.Target || "_self")
    }

    return (
        <Paper
            variant="outlined"
            onClick={Link?.Href ? handleClick : undefined}
            sx={{
                p: 2.5,
                cursor: Link?.Href ? "pointer" : "default",
                "&:hover": Link?.Href ? { backgroundColor: "action.hover" } : {},
                textAlign: alignment === "Right" ? "right" : "left",
            }}
        >

            {date && (
                <Typography variant="caption" color="primary" fontWeight={600}>
                    {date}
                </Typography>
            )}

            {Title && (
                <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }} dangerouslySetInnerHTML={{ __html: Title }} />
            )}

            {Description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} dangerouslySetInnerHTML={{ __html: Description }} />
            )}

            {Content && (
                <Typography variant="body2" sx={{ mt: 1 }} dangerouslySetInnerHTML={{ __html: Content }} />
            )}

            {Tags?.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                    {Tags.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" variant="outlined" />
                    ))}
                </Box>
            )}

            {Author?.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
                    {Author.map((a, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Avatar src={a.Image} alt={a.Name} sx={{ width: 20, height: 20 }} />
                            <Typography variant="caption" color="text.secondary">
                                {a.Name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

        </Paper>
    )
}

function VerticalTimeline({ data, alignment }) {

    let position = "right"

    if (alignment === "Left") position = "left"
    if (alignment === "Right") position = "right"
    if (alignment === "Center") position = "alternate"

    return (
        <Timeline position={position}>

            {data.map((item, index) => {

                const isLast = index === data.length - 1

                return (
                    <TimelineItem key={index}>

                        {alignment === "Center" && (
                            <TimelineOppositeContent
                                sx={{ flex: 0.3 }}
                                color="text.secondary"
                            >
                                {item.Date}
                            </TimelineOppositeContent>
                        )}

                        <TimelineSeparator>

                            <TimelineDot color="primary">

                                {item.Image?.[0] && (
                                    <Avatar
                                        src={item.Image[0]}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                )}

                            </TimelineDot>

                            {!isLast && <TimelineConnector />}

                        </TimelineSeparator>

                        <TimelineContent>
                            <TimelineCard item={item} alignment={alignment} />
                        </TimelineContent>

                    </TimelineItem>
                )
            })}

        </Timeline>
    )
}

export default function TimelineModule({
    data = [dataItemProps],
    config = timelineProps
}) {

    const { Title, Description } = config
    const { Direction = "Vertical", Alignment = "Left" } = config.Config || {}

    return (
        <Box sx={{ width: "100%" }}>

            {Title && (
                <Typography variant="h4" sx={{ mb: 1 }} dangerouslySetInnerHTML={{ __html: Title }} />
            )}

            {Description && (
                <Typography variant="body1" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: Description }} />
            )}

            <VerticalTimeline data={data} alignment={Alignment} />

        </Box>
    )
}
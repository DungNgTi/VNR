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

import { styled } from "@mui/material/styles"
import Scroller from "../scroller/Index"

const StyledCard = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "clickable"
})(({ theme, clickable }) => ({
    padding: theme.spacing(2.5),
    cursor: clickable ? "pointer" : "default",
    transition: "all 0.2s ease",

    ...(clickable && {
        // 👇 default highlighted color
        "& .card-title": {
            color: theme.palette.primary.main
        },

        "&:hover": {
            boxShadow: theme.shadows[4],
            transform: "translateY(-2px)"
        },

        "&:hover .card-title": {
            textDecoration: "underline",
            textDecorationThickness: "2px",
            textUnderlineOffset: "3px",
            color: theme.palette.primary.dark
        }
    })
}))

function TimelineCard({ item, alignment }) {
    const { Image, Title, Description, Content, Tags, Author, Date: date, Link } = item

    const handleClick = () => {
        if (Link?.Href) window.open(Link.Href, Link.Target || "_self")
    }

    return (
        <StyledCard
            variant="outlined"
            clickable={!!Link?.Href}
            onClick={Link?.Href ? handleClick : undefined}
            sx={{
                textAlign: alignment === "Right" ? "right" : "left"
            }}
        >

            {date && (
                <Typography variant="caption" color="primary" fontWeight={600}>
                    {date}
                </Typography>
            )}

            {Title && (
                <Typography
                    className="card-title"
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        mt: 0.5,
                        textDecoration: "none",
                        textDecorationColor: Link?.Href ? "primary.main" : "transparent",
                    }}
                    dangerouslySetInnerHTML={{ __html: Title }}
                />
            )}

            {Description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} dangerouslySetInnerHTML={{ __html: Description }} />
            )}

            {Content && (
                <Typography variant="body2" sx={{ mt: 1 }} dangerouslySetInnerHTML={{ __html: Content }} />
            )}
            {Image?.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Scroller
                        items={Image}
                        slidesPerView={1.2}
                        spaceBetween={12}
                        sx={{
                            width: "100%",
                            "& .swiper": {
                                width: "100%"
                            },
                            "& .swiper-slide": {
                                width: "100% !important",  
                            }
                        }}
                        renderSlide={(img, i) => (
                            <Box
                                key={i}
                                component="img"
                                src={img}
                                alt={`image-${i}`}
                                sx={{
                                    width: "100%",
                                    height: 500,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    justifyContent: "center",
                                    userSelect: "none",
                                    pointerEvents: "none"
                                }}
                            />
                        )}
                    />
                </Box>
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

        </StyledCard>
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
                            <TimelineDot color="primary"></TimelineDot>
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
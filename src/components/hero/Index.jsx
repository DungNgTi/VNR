import { Box, Typography, Chip, Stack } from "@mui/material"
import { heroProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

const sizeMap = {
    Small: { minHeight: "40vh", titleVariant: "h5", descVariant: "body2" },
    Medium: { minHeight: "60vh", titleVariant: "h4", descVariant: "body1" },
    Large: { minHeight: "80vh", titleVariant: "h2", descVariant: "h6" },
}

const alignmentMap = {
    Left: { alignItems: "flex-start", textAlign: "left" },
    Center: { alignItems: "center", textAlign: "center" },
    Right: { alignItems: "flex-end", textAlign: "right" },
}

export default function HeroModule({
    data = [dataItemProps],
    config = heroProps
}) {
    const { Title, Description } = config
    const { Size = "Large", Alignment = "Center" } = config.Config || {}

    const { minHeight, titleVariant, descVariant } = sizeMap[Size] || sizeMap.Large
    const { alignItems, textAlign } = alignmentMap[Alignment] || alignmentMap.Center

    const item = data?.[0]
    const backgroundImage = item?.Image?.[0]

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                minHeight,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems,
                overflow: "hidden",
            }}
        >
            {/* Background */}
            {backgroundImage && (
                <Box
                    component="img"
                    src={backgroundImage}
                    alt={item?.Title}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                    }}
                />
            )}

            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    px: { xs: 3, md: 8 },
                    py: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems,
                    textAlign,
                    gap: 2,
                    maxWidth: "900px",
                }}
            >
                {(item?.Tags?.length > 0) && (
                    <Stack direction="row" spacing={1} justifyContent={textAlign === "center" ? "center" : "flex-start"}>
                        {item.Tags.map((tag, i) => (
                            <Chip key={i} label={tag} size="small" sx={{ color: "white", borderColor: "white" }} variant="outlined" />
                        ))}
                    </Stack>
                )}

                {(item?.Title || Title) && (
                    <Typography variant={titleVariant} fontWeight={700} color="white" dangerouslySetInnerHTML={{ __html: item?.Title || Title }} />
                )}

                {(item?.Description || Description) && (
                    <Typography variant={descVariant} color="rgba(255,255,255,0.85)" dangerouslySetInnerHTML={{ __html: item?.Description || Description }} />
                )}

                {item?.Author?.length > 0 && (
                    <Typography variant="caption" color="rgba(255,255,255,0.6)">
                        {item.Author.map(a => a.Name).join(", ")}
                        {item.Date && ` · ${item.Date}`}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
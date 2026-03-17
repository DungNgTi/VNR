import { Box } from "@mui/material"

/**
 * Decorative divider with gradient effect
 * @param {Object} props
 * @param {string} props.variant - 'line', 'fade', 'dots'
 * @param {number} props.spacing - Vertical spacing in px
 */
export default function DecorativeDivider({ variant = "fade", spacing = 48 }) {
    if (variant === "line") {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
                    my: spacing / 2,
                }}
            />
        )
    }

    if (variant === "dots") {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    my: spacing / 2,
                }}
            >
                {[...Array(3)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.15)",
                        }}
                    />
                ))}
            </Box>
        )
    }

    // Default: fade gradient
    return (
        <Box
            sx={{
                width: "100%",
                height: spacing,
                background: "linear-gradient(180deg, transparent, rgba(102, 126, 234, 0.03), transparent)",
                my: spacing / 2,
            }}
        />
    )
}

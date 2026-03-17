import { Box, useColorScheme } from "@mui/material"

export default function Background({ config }) {
    const { Color, Image, Gradient, Blur = 0, Overlay } = config.Background ?? {}
    const { mode } = useColorScheme()

    if (!Color && !Image && !Gradient) return null

    return (
        <>
            {/* Image layer */}
            {Image && (
                <Box sx={{
                    position:           "fixed",
                    inset:              0,
                    zIndex:             -2,
                    backgroundImage:    `url(${Image})`,
                    backgroundSize:     "cover",
                    backgroundPosition: "center",
                    backgroundRepeat:   "no-repeat",
                    filter:             Blur ? `blur(${Blur}px)` : "none",
                    transform:          Blur ? "scale(1.05)" : "none", // prevent blur edge bleed
                }} />
            )}

            {/* Color / gradient layer */}
            {(Color || Gradient) && (
                <Box sx={{
                    position:   "fixed",
                    inset:      0,
                    zIndex:     -2,
                    background: Gradient ?? Color,
                }} />
            )}

            {/* Overlay layer */}
            {Overlay && (
                <Box sx={{
                    position:   "fixed",
                    inset:      0,
                    zIndex:     -1,
                    background: Overlay,
                    ...(mode === 'dark' && {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay in dark mode
                        backgroundImage: 'none',
                    })
                }} />
            )}
        </>
    )
}
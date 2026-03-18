import { useLocation, useNavigate } from "react-router-dom"
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material"
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown"

export default function Navbar({ config }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { Name, Logo, Header } = config

    if (!Header?.Enabled) return null

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: Header.Transparent ? "transparent" : "background.paper",
                backdropFilter: Header.Transparent ? "blur(8px)" : "none",
                borderBottom: Header.Transparent ? "none" : "1px solid",
                borderColor: "divider",
                color: "text.primary",
                borderRadius: 2,
                mt: 1,
                mx: 1,
                width: "calc(100% - 2px)",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ gap: 2 }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            cursor: "pointer",
                            flexShrink: 0,
                            mr: 2,
                        }}
                        onClick={() => navigate("/")}
                    >
                        {Logo ?? Name ?? "Site"}
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ flexGrow: 1 }}>
                        {Header.Links?.map(({ Label, Path }, i) => {
                            const active = location.pathname === Path
                            return (
                                <Button
                                    key={i}
                                    onClick={() => navigate(Path)}
                                    sx={{
                                        fontWeight: active ? 700 : 400,
                                        color: active ? "primary.main" : "text.secondary",
                                        textTransform: "none",
                                        fontSize: 14,
                                    }}
                                >
                                    {Label}
                                </Button>
                            )
                        })}
                    </Stack>
                    <ColorModeIconDropdown />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

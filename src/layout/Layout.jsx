import { Outlet } from "react-router-dom"
import { Box, CircularProgress } from "@mui/material"
import { useSiteConfig } from "../hook/useSiteConfig"
import Navbar from "./Navbar"
import Background from "./Background"
import Footer from "../components/Footer"

export default function Layout() {
    const { config, loading } = useSiteConfig()

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Background config={config} />
            <Navbar config={config} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            {config.Footer?.Enabled !== false && <Footer config={config.Footer} />}
        </Box>
    )
}

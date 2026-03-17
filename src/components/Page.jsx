import { Box, CircularProgress, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import HeroModule from "./hero/Index"
import CardModule from "./card/Index"
import StatisticModule from "./statistic/Index"
import TimelineModule from "./timeline/Index"
import ProfileModule from "./profile/Index"
import ComparisonModule from "./comparison/Index"
import TableModule from "./table/Index"
import AccordionModule from "./accordion/Index"
import { useEffect, useState } from "react"

const MODULE_MAP = {
    HERO:       HeroModule,
    CARD:       CardModule,
    STATISTIC:  StatisticModule,
    TIMELINE:   TimelineModule,
    PROFILE:    ProfileModule,
    COMPARISON: ComparisonModule,
    TABLE:      TableModule,
    ACCORDION:  AccordionModule,
}

// These modules always take full width regardless of ColSpan
const FULL_WIDTH_MODULES = new Set(["HERO", "COMPARISON", "TIMELINE", "PROFILE"])

function resolveData(rawData, moduleType) {
    if (moduleType === "COMPARISON" && rawData && !Array.isArray(rawData))
        return Object.values(rawData).flat()
    return rawData
}

function NotFound({ src }) {
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            minHeight: "70vh", gap: 2, textAlign: "center", px: 3,
        }}>
            <Typography variant="h1" fontWeight={800}
                sx={{ fontSize: { xs: "6rem", md: "10rem" }, lineHeight: 1, color: "text.disabled" }}>
                404
            </Typography>
            <Typography variant="h5" fontWeight={600}>Trang không tồn tại</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
                Không tìm thấy tệp cấu hình <code style={{ opacity: 0.7 }}>{src}</code>
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 1 }}>
                Về trang chủ
            </Button>
        </Box>
    )
}

export default function Page({ src }) {
    const [layout,   setLayout]   = useState([])
    const [data,     setData]     = useState({})
    const [loading,  setLoading]  = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [error,    setError]    = useState(null)

    useEffect(() => {
        if (!src) return
        let cancelled = false
        setLoading(true)
        setNotFound(false)
        setError(null)

        fetch(src)
            .then(res => {
                if (cancelled) return null
                if (res.status === 404) { if (!cancelled) setNotFound(true); return null }
                if (!res.ok) throw new Error(`Failed to load config: ${res.status}`)
                return res.json()
            })
            .then(json => {
                if (cancelled || !json) return
                setLayout(json.Layout ?? [])
                setData(json.Data ?? {})
            })
            .catch(err  => { if (!cancelled) setError(err.message) })
            .finally(()  => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [src])

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
            <CircularProgress />
        </Box>
    )

    if (notFound) return <NotFound src={src} />

    if (error) return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh", gap: 1 }}>
            <Typography variant="h6" color="error">Đã xảy ra lỗi</Typography>
            <Typography variant="body2" color="text.secondary">{error}</Typography>
        </Box>
    )

    return (
    <Box sx={{
        display:       "flex",
        flexDirection: "column",
        gap:           4,
        width:         "100%",
        px:            { xs: 2, md: 6 },
        py:            4,
    }}>
        {layout.map((moduleConfig, index) => {
            const { ModuleType, Data, ...rest } = moduleConfig
            const Module = MODULE_MAP[ModuleType]

            if (!Module) {
                console.warn(`[Page] Unknown ModuleType: "${ModuleType}"`)
                return null
            }

            const rawData    = typeof Data === "string" ? data[Data] : Data
            const moduleData = resolveData(rawData, ModuleType)

            return (
                <Module
                    key={`${ModuleType}-${index}`}
                    data={moduleData}
                    config={{ ModuleType, Data, ...rest }}
                />
            )
        })}
    </Box>
)
}
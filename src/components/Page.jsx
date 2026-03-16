import { Box, CircularProgress, Typography } from "@mui/material"
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

function resolveData(rawData, moduleType) {
    if (moduleType === "COMPARISON" && rawData && !Array.isArray(rawData)) {
        return Object.values(rawData).flat()
    }
    return rawData
}

export default function Page({ src }) {
    const [layout, setLayout] = useState([])
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!src) return
        setLoading(true)
        setError(null)

        fetch(src)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load config: ${res.status}`)
                return res.json()
            })
            .then(json => {
                setLayout(json.Layout ?? [])
                setData(json.Data ?? {})
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [src])

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
            <CircularProgress />
        </Box>
    )

    if (error) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
            <Typography color="error">{error}</Typography>
        </Box>
    )

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", px: { xs: 2, md: 6 }, py: 4 }}>
            {layout.map((moduleConfig, index) => {
                const { ModuleType, Data, ...rest } = moduleConfig
                const Module = MODULE_MAP[ModuleType]

                if (!Module) {
                    console.warn(`[Page] Unknown ModuleType: "${ModuleType}"`)
                    return null
                }

                const rawData = typeof Data === "string" ? data[Data] : Data
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
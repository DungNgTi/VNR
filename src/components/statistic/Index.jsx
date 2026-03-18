import { Box, Typography, useTheme } from "@mui/material"
import { statisticProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"
import {
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    PieChart, Pie, Cell,
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"

const DEFAULT_COLORS = [
    "#2563eb", "#dc2626", "#d97706", "#65a30d",
    "#7c3aed", "#0891b2", "#db2777", "#070a08"
]

const alignmentMap = {
    Left: "flex-start",
    Center: "center",
    Right: "flex-end",
}

function parseData(data, configKeys, metricsConfig) {
    return data.map(item => {
        let values = {}
        const content = item.Content
        const description = item.Description

        // If Metrics config is provided, extract specific metrics
        if (metricsConfig && metricsConfig.length > 0) {
            metricsConfig.forEach((metric, index) => {
                const { Field, Key, ExtractPattern } = metric
                const key = Key || `Metric ${index + 1}`
                const field = Field || "Content"
                
                // Get source value - handle Scale as a number field
                let sourceValue
                if (field === "Scale") {
                    sourceValue = item.Scale
                } else {
                    sourceValue = item[field] || item.Content
                }

                if (typeof sourceValue === "string") {
                    if (ExtractPattern) {
                        // Use regex pattern to extract number
                        const regex = new RegExp(ExtractPattern)
                        const match = sourceValue.match(regex)
                        values[key] = match ? parseFloat(match[1] || match[0].replace(/[^0-9.-]/g, "")) : 0
                    } else {
                        // Extract number from string
                        const num = parseFloat(sourceValue.replace(/[^0-9.-]/g, ""))
                        values[key] = isNaN(num) ? 0 : num
                    }
                } else if (typeof sourceValue === "number") {
                    values[key] = sourceValue
                } else {
                    values[key] = item.Scale ?? 0
                }
            })
        } else if (configKeys && configKeys.length > 0) {
            // Use original Keys-based parsing
            try {
                // 1. Try JSON
                const parsed = JSON.parse(content)
                if (typeof parsed === "object" && parsed !== null) {
                    values = parsed
                } else {
                    values = { [configKeys?.[0] || "Value"]: parsed }
                }
            } catch {
                // 2. Try Pipe-separated (e.g., "774.7 | 3.4")
                if (typeof content === "string" && content.includes("|")) {
                    const parts = content.split("|").map(p => {
                        // Extract number from string like "8.2%/năm" or "774.7"
                        const num = parseFloat(p.replace(/[^0-9.-]/g, ""))
                        return isNaN(num) ? 0 : num
                    })
                    parts.forEach((val, i) => {
                        const key = configKeys?.[i] || `Value ${i + 1}`
                        values[key] = val
                    })
                } else {
                    // 3. Fallback to Scale or Number in Content
                    const num = parseFloat(String(content).replace(/[^0-9.-]/g, ""))
                    values = { [configKeys?.[0] || "Value"]: !isNaN(num) ? num : (item.Scale ?? 0) }
                }
            }
        } else {
            // Default: use Scale value
            values = { Value: item.Scale ?? 0 }
        }

        return { name: item.Title || item.Date || "", ...values }
    })
}

function extractKeys(chartData) {
    const keys = new Set()
    chartData.forEach(row => {
        Object.keys(row).forEach(k => { if (k !== "name") keys.add(k) })
    })
    return [...keys]
}

function renderChart(variant, chartData, keys, colors, isStacked) {
    const commonProps = {
        data: chartData,
        margin: { top: 10, right: 10, left: -20, bottom: 0 }
    }

    switch (variant) {
        case "Line":
            return (
                <LineChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" />
                    {keys.map((key, i) => (
                        <Line key={key} type="monotone" dataKey={key} stroke={colors[i % colors.length]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    ))}
                </LineChart>
            )

        case "Area":
            return (
                <AreaChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" />
                    {keys.map((key, i) => (
                        <Area key={key} type="monotone" dataKey={key} stackId={isStacked ? "1" : undefined} stroke={colors[i % colors.length]} fill={colors[i % colors.length]} fillOpacity={0.4} />
                    ))}
                </AreaChart>
            )

        case "Pie":
            return (
                <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie data={chartData} dataKey={keys[0]} nameKey="name" cx="50%" cy="50%" outerRadius="80%" label>
                        {chartData.map((_, i) => (
                            <Cell key={i} fill={colors[i % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            )

        case "Grid":
        case "Card":
            return (
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                    gap: 2,
                    width: "100%"
                }}>
                    {chartData.map((row, i) => (
                        <Box key={i} sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                            textAlign: "center"
                        }}>
                            <Typography variant="h6" sx={{ mb: 1, fontSize: "0.9rem" }}>{row.name}</Typography>
                            {keys.map((key, j) => (
                                <Box key={key}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: colors[j % colors.length],
                                            fontWeight: "bold",
                                            fontSize: { xs: "1.25rem", sm: "1.5rem" }
                                        }}
                                    >
                                        {typeof row[key] === "number" ? row[key].toLocaleString() : row[key]}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                        {key}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            )

        case "Bar":
        default:
            return (
                <BarChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Legend iconType="circle" />
                    {keys.map((key, i) => (
                        <Bar key={key} dataKey={key} stackId={isStacked ? "a" : undefined} fill={colors[i % colors.length]} radius={isStacked ? 0 : [4, 4, 0, 0]} barSize={30} />
                    ))}
                </BarChart>
            )
    }
}

export default function StatisticModule({
    data = [dataItemProps],
    config = statisticProps
}) {
    const theme = useTheme()
    const { Title, Description } = config
    const {
        Variant = "Bar",
        Alignment = "Left",
        Height = 400,
        Keys = [],
        Metrics = [],
        Colors = [],
        Stacked = false
    } = config.Config || {}

    const chartColors = Colors.length > 0 ? Colors : DEFAULT_COLORS
    const chartData = parseData(data, Keys, Metrics)
    const keys = extractKeys(chartData)
    const isGridVariant = Variant === "Grid" || Variant === "Card"

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: alignmentMap[Alignment] ?? "flex-start",
            gap: 1
        }}>
            {Title && (
                <Typography variant="h4" sx={{ mb: 0.5 }} dangerouslySetInnerHTML={{ __html: Title }} />
            )}
            {Description && (
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: Description }} />
            )}

            <Box sx={{
                width: "100%",
                height: isGridVariant ? "auto" : Height,
                backgroundColor: "background.paper",
                p: isGridVariant ? 0 : 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider"
            }}>
                {isGridVariant ? (
                    renderChart(Variant, chartData, keys, chartColors, Stacked)
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart(Variant, chartData, keys, chartColors, Stacked)}
                    </ResponsiveContainer>
                )}
            </Box>
        </Box>
    )
}
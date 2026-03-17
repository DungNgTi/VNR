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

function parseData(data, configKeys) {
    return data.map(item => {
        let values = {}
        const content = item.Content

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
        Colors = [], 
        Stacked = false 
    } = config.Config || {}

    const chartColors = Colors.length > 0 ? Colors : DEFAULT_COLORS
    const chartData = parseData(data, Keys)
    const keys = extractKeys(chartData)

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
                height: Height, 
                backgroundColor: "background.paper", 
                p: 2, 
                borderRadius: 2, 
                border: "1px solid", 
                borderColor: "divider" 
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart(Variant, chartData, keys, chartColors, Stacked)}
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}
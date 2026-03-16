import { Box, Typography } from "@mui/material"
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

const COLORS = [
    "#2563eb", "#070a08", "#dc2626", "#d97706",
    "#7c3aed", "#0891b2", "#db2777", "#65a30d"
]

const alignmentMap = {
    Left: "flex-start",
    Center: "center",
    Right: "flex-end",
}

function renderChart(variant, chartData, keys) {
    const commonProps = {
        data: chartData,
        margin: { top: 8, right: 16, left: 0, bottom: 8 }
    }

    switch (variant) {
        case "Line":
            return (
                <LineChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {keys.map((key, i) => (
                        <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} dot={false} />
                    ))}
                </LineChart>
            )

        case "Area":
            return (
                <AreaChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {keys.map((key, i) => (
                        <Area key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.2} />
                    ))}
                </AreaChart>
            )

        case "Pie":
            return (
                <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie data={chartData} dataKey={keys[0]} nameKey="name" cx="50%" cy="50%" outerRadius={140} label>
                        {chartData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            )

        case "Radar":
            return (
                <RadarChart cx="50%" cy="50%" outerRadius={140} data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <Tooltip />
                    <Legend />
                    {keys.map((key, i) => (
                        <Radar key={key} dataKey={key} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.2} />
                    ))}
                </RadarChart>
            )

        case "Scatter":
            return (
                <ScatterChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {keys.map((key, i) => (
                        <Scatter key={key} name={key} data={chartData} dataKey={key} fill={COLORS[i % COLORS.length]} />
                    ))}
                </ScatterChart>
            )

        case "Bar":
        default:
            return (
                <BarChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {keys.map((key, i) => (
                        <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
                    ))}
                </BarChart>
            )
    }
}

function parseData(data) {
    // Expects item.Title as x-axis label, item.Content as JSON values
    // e.g. Content: '{"GDP": 3.2, "CPI": 1.8}'
    // Falls back to Scale as single value key "Value"
    return data.map(item => {
        let values = {}
        try {
            values = item.Content ? JSON.parse(item.Content) : { Value: item.Scale ?? 0 }
        } catch {
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

export default function StatisticModule({
    data = [dataItemProps],
    config = statisticProps
}) {
    const { Title, Description } = config
    const { Variant = "Bar", Alignment = "Left" } = config.Config || {}

    const chartData = parseData(data)
    const keys = extractKeys(chartData)

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: alignmentMap[Alignment] ?? "flex-start", gap: 2 }}>

            {Title && <Typography variant="h4">{Title}</Typography>}
            {Description && <Typography variant="body1">{Description}</Typography>}

            <ResponsiveContainer width="100%" height={400}>
                {renderChart(Variant, chartData, keys)}
            </ResponsiveContainer>

        </Box>
    )
}
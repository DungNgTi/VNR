import { useState, useMemo } from "react"
import {
    Box, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TableSortLabel, Paper, Chip
} from "@mui/material"
import { tableProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

const DEFAULT_COLUMNS = [
    { key: "Title",       label: "Title"       },
    { key: "Description", label: "Description" },
    { key: "Content",     label: "Content"     },
    { key: "Date",        label: "Date"        },
    { key: "Tags",        label: "Tags"        },
]

function resolveColumns(configColumns, data) {
    if (configColumns?.length > 0) {
        return configColumns.map((col, i) => {
            if (typeof col === "string") return { key: null, label: col, index: i }
            return { ...col, index: i }
        })
    }

    const firstItem = data?.[0]
    if (!firstItem) return DEFAULT_COLUMNS

    return Object.keys(firstItem)
        .filter(k => !["Image", "Video", "Author", "Link", "Scale", "Alignment"].includes(k))
        .map((k, i) => ({ key: k, label: k, index: i }))
}

function getSmartValue(row, col) {
    if (!col) return ""
    const { key, label, index } = col
    
    // 1. Direct key match
    if (key && row[key] !== undefined) return row[key]

    // 2. Logic for vii.json mapping: Title (0), Description (1), Content split (2+)
    let rawValue = ""
    if (index === 0) rawValue = row.Title
    else if (index === 1) rawValue = row.Description
    else {
        const content = row.Content || ""
        if (typeof content === "string" && content.includes("|")) {
            const parts = content.split("|").map(s => s.trim())
            rawValue = parts[index - 2] || ""
        } else if (index === 2) {
            rawValue = content
        }
    }

    // 3. Clean up prefix if it matches label (e.g., "Kế hoạch: 5%" -> "5%")
    if (typeof rawValue === "string" && label) {
        const prefix = `${label}:`
        if (rawValue.toLowerCase().startsWith(prefix.toLowerCase())) {
            return rawValue.substring(prefix.length).trim()
        }
    }

    return rawValue
}

function CellValue({ value }) {
    if (value == null || value === "") return <Typography variant="body2" color="text.disabled">—</Typography>

    if (Array.isArray(value)) {
        if (typeof value[0] === "string") {
            return (
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {value.map((v, i) => <Chip key={i} label={v} size="small" variant="outlined" />)}
                </Box>
            )
        }
        return <Typography variant="body2">{value.length} mục</Typography>
    }

    if (typeof value === "object") {
        return <Typography variant="body2" color="text.secondary">{JSON.stringify(value)}</Typography>
    }

    return <Box sx={{ typography: 'body2' }} dangerouslySetInnerHTML={{ __html: String(value) }} />
}

export default function TableModule({
    data = [dataItemProps],
    config = tableProps
}) {
    const { Title, Description } = config
    const { Columns = [], Sortable = true, Striped = true } = config.Config || {}

    const [orderBy, setOrderBy] = useState(null)
    const [order, setOrder] = useState("asc")

    const columns = useMemo(() => resolveColumns(Columns, data), [Columns, data])

    const handleSort = (key, label) => {
        if (!Sortable) return
        const sortKey = key || label
        if (orderBy === sortKey) {
            setOrder(prev => prev === "asc" ? "desc" : "asc")
        } else {
            setOrderBy(sortKey)
            setOrder("asc")
        }
    }

    const sortedData = useMemo(() => {
        if (!Sortable || !orderBy) return data
        return [...data].sort((a, b) => {
            const col = columns.find(c => (c.key || c.label) === orderBy)
            const aVal = getSmartValue(a, col) ?? ""
            const bVal = getSmartValue(b, col) ?? ""
            const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
            return order === "asc" ? cmp : -cmp
        })
    }, [data, orderBy, order, Sortable, columns])

    return (
        <Box sx={{ width: "100%" }}>

            {Title && <Typography variant="h4" sx={{ mb: 1 }} dangerouslySetInnerHTML={{ __html: Title }} />}
            {Description && <Typography variant="body1" sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: Description }} />}

            <TableContainer component={Paper} variant="outlined">
                <Table size="medium" stickyHeader>

                    <TableHead>
                        <TableRow>
                            {columns.map((col, i) => (
                                <TableCell
                                    key={i}
                                    sortDirection={orderBy === (col.key || col.label) ? order : false}
                                    sx={{ fontWeight: 700, whiteSpace: "nowrap", backgroundColor: "background.paper" }}
                                >
                                    {Sortable ? (
                                        <TableSortLabel
                                            active={orderBy === (col.key || col.label)}
                                            direction={orderBy === (col.key || col.label) ? order : "asc"}
                                            onClick={() => handleSort(col.key, col.label)}
                                        >
                                            {col.label}
                                        </TableSortLabel>
                                    ) : col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortedData.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                hover
                                sx={{
                                    backgroundColor: Striped && rowIndex % 2 !== 0
                                        ? "action.hover"
                                        : "transparent"
                                }}
                            >
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <CellValue value={getSmartValue(row, col)} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

        </Box>
    )
}

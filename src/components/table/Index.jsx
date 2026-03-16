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
    if (configColumns?.length > 0) return configColumns

    // Auto-derive columns from first data item keys if no config given
    const firstItem = data?.[0]
    if (!firstItem) return DEFAULT_COLUMNS

    return Object.keys(firstItem)
        .filter(k => !["Image", "Video", "Author", "Link", "Scale", "Alignment"].includes(k))
        .map(k => ({ key: k, label: k }))
}

function CellValue({ value }) {
    if (value == null || value === "") return <Typography variant="body2" color="text.disabled">—</Typography>

    if (Array.isArray(value)) {
        // Tags array
        if (typeof value[0] === "string") {
            return (
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {value.map((v, i) => <Chip key={i} label={v} size="small" variant="outlined" />)}
                </Box>
            )
        }
        return <Typography variant="body2">{value.length} items</Typography>
    }

    if (typeof value === "object") {
        return <Typography variant="body2" color="text.secondary">{JSON.stringify(value)}</Typography>
    }

    return <Typography variant="body2">{String(value)}</Typography>
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

    const handleSort = (key) => {
        if (!Sortable) return
        if (orderBy === key) {
            setOrder(prev => prev === "asc" ? "desc" : "asc")
        } else {
            setOrderBy(key)
            setOrder("asc")
        }
    }

    const sortedData = useMemo(() => {
        if (!Sortable || !orderBy) return data
        return [...data].sort((a, b) => {
            const aVal = a[orderBy] ?? ""
            const bVal = b[orderBy] ?? ""
            const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
            return order === "asc" ? cmp : -cmp
        })
    }, [data, orderBy, order, Sortable])

    return (
        <Box sx={{ width: "100%" }}>

            {Title && <Typography variant="h4" sx={{ mb: 1 }}>{Title}</Typography>}
            {Description && <Typography variant="body1" sx={{ mb: 2 }}>{Description}</Typography>}

            <TableContainer component={Paper} variant="outlined">
                <Table size="medium" stickyHeader>

                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    sortDirection={orderBy === col.key ? order : false}
                                    sx={{ fontWeight: 700, whiteSpace: "nowrap", backgroundColor: "background.paper" }}
                                >
                                    {Sortable ? (
                                        <TableSortLabel
                                            active={orderBy === col.key}
                                            direction={orderBy === col.key ? order : "asc"}
                                            onClick={() => handleSort(col.key)}
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
                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        <CellValue value={row[col.key]} />
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
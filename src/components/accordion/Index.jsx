import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { accordionProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

export default function AccordionModule({ data = [dataItemProps], config = accordionProps }) {
    const { Title, Description } = config;
    const { DefaultExpanded = 0, Alignment = "Left" } = config.Config || {}

    return (
        <Box sx={{ width: "100%", textAlign: Alignment === "Center" ? "center" : "left" }}>
            {Title && (
                <Typography variant="h4" sx={{ mb: 1 }} dangerouslySetInnerHTML={{ __html: Title }} />
            )}
            {Description && (
                <Typography variant="body1" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: Description }} />
            )}

            <Box sx={{ maxWidth: "1000px", mx: Alignment === "Center" ? "auto" : 0 }}>
                {data?.map((item, index) => (
                    <Accordion 
                        key={index} 
                        defaultExpanded={index === DefaultExpanded}
                        variant="outlined"
                        sx={{
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: index === 0 ? "1px solid" : "none",
                            borderColor: "divider",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography component="span" fontWeight={600} dangerouslySetInnerHTML={{ __html: item.Title }} />
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.Description && (
                                <Box
                                    sx={{ 
                                        typography: 'body2', 
                                        color: 'text.secondary', 
                                        mb: 1,
                                        '& p': { mb: 1.5 },
                                        '& *:last-child': { mb: 0 } 
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.Description }}
                                />
                            )}
                            {item.Content && (
                                <Box
                                    sx={{ 
                                        typography: 'body2',
                                        '& p': { mb: 1.5 },
                                        '& *:last-child': { mb: 0 }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.Content }}
                                />
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    )
}
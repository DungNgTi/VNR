import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { accordionProps } from "../../schemas/layout"
import { dataItemProps } from "../../schemas/data"

export default function AccordionModule({ data = dataItemProps, config = accordionProps }) {
    const { Title, Description } = config;
    const { DefaultExpanded = 0, Alignment = "Left" } = config.Config || {}

    const getAlignment = (alignment) => {
        switch (alignment) {
            case "Center":
                return "center"
            case "Right":
                return "flex-end"
            default:
                return "flex-start"
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            {Title && <Typography variant="h4">{Title}</Typography>}
            {Description && <Typography variant="body1">{Description}</Typography>}
            <br></br>
            {data?.map((item, index) => (
                <Accordion key={index} defaultExpanded={index === DefaultExpanded}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ justifyContent: getAlignment(Alignment) }}
                    >
                        {item.Title}
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.Content}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}
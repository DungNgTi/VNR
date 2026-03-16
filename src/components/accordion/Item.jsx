import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { dataItemProps } from '../../schemas/data'

export default ({ item = dataItemProps, index = 0 }) => {
    return (
        <>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
            >
                <Typography component="span">{item.Title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {item.Description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        {item.Description}
                    </Typography>
                )}
                {item.Content && (
                    <Typography variant="body2">
                        {item.Content}
                    </Typography>
                )}
            </AccordionDetails>
        </>
    )
}

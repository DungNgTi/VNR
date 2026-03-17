import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
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
                    <Box
                        sx={{ 
                            typography: 'body2', 
                            color: 'text.secondary', 
                            mb: 1,
                            '& p': { mb: 1 }, // Thêm khoảng cách hợp lý cho đoạn văn
                            '& *:last-child': { mb: 0 } 
                        }}
                        dangerouslySetInnerHTML={{ __html: item.Description }}
                    />
                )}
                {item.Content && (
                    <Box
                        sx={{ 
                            typography: 'body2',
                            '& p': { mb: 1 },
                            '& *:last-child': { mb: 0 }
                        }}
                        dangerouslySetInnerHTML={{ __html: item.Content }}
                    />
                )}
            </AccordionDetails>
        </>
    )
}

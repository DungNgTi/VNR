import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AccordionItem({ item, index }) {
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
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.Description}
          </Typography>
        )}
        {item.Content && (
          <Typography variant="body2">{item.Content}</Typography>
        )}
      </AccordionDetails>
    </>
  );
}

export default function AccordionModule({ title, description, data, config }) {
  const moduleConfig = createConfig(config);
  const validatedData = validateData(data);
  const [expanded, setExpanded] = React.useState(
    moduleConfig.DefaultExpanded !== null ? moduleConfig.DefaultExpanded : false
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAlignmentStyle = () => {
    switch (moduleConfig.Alignment) {
      case 'Center':
        return { textAlign: 'center' };
      case 'Right':
        return { textAlign: 'right' };
      default:
        return { textAlign: 'left' };
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {(title || description) && (
        <Box sx={{ mb: 3, ...getAlignmentStyle() }}>
          {title && (
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ ...getAlignmentStyle() }}>
        {validatedData.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            disableGutters
          >
            <AccordionItem item={item} index={index} />
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

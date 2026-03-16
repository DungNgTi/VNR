import * as React from 'react';
import PropTypes from 'prop-types';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionItemProps = {
  Image: [],
  Video: {
    Src: '',
    Type: 'youtube | file',
    Poster: '',
  },
  Title: '',
  Description: '',
  Content: '',
  Tags: [''],
  Author: [
    {
      Name: '',
      Image: '',
    },
  ],
  Scale: 0.5,
  Alignment: 'Left',
  Date: '',
  Link: {
    Href: '',
    Title: '',
    Target: '_blank',
  },
}

export default function AccordionItem({ item, expanded, onChange, id }) {
  return (
    <>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
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

AccordionItem.propTypes = {
  item: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Content: PropTypes.string,
  }).isRequired,
  expanded: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

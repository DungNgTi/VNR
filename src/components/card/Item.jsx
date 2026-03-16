import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { dataItemProps } from '../../schemas/data';
import Author from './Author';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': { backgroundColor: 'transparent', cursor: 'pointer' },
  '&:focus-visible': { outline: '3px solid', outlineColor: 'hsla(210, 98%, 48%, 0.5)', outlineOffset: '2px' },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': { paddingBottom: 16 },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export default function Item({ item = dataItemProps }) {
  const { Image, Title, Description, Tags, Author: authors, Date: date, Link } = item;

  const [focused, setFocused] = React.useState(false);

  const handleClick = () => {
    if (Link?.Href) window.open(Link.Href, Link.Target || '_self');
  };

  return (
    <StyledCard
      variant="outlined"
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
      className={focused ? 'Mui-focused' : ''}
    >
      {Image && Image.length > 0 && (
        <CardMedia
          component="img"
          alt={Title}
          image={Image[0]}
          sx={{ aspectRatio: '16 / 9', borderBottom: '1px solid', borderColor: 'divider' }}
        />
      )}
      <StyledCardContent>
        {Tags && Tags.length > 0 && (
          <Typography gutterBottom variant="caption" component="div">{Tags[0]}</Typography>
        )}
        <Typography gutterBottom variant="h6" component="div">{Title}</Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>{Description}</StyledTypography>
      </StyledCardContent>
      <Author authors={authors} date={date} />
    </StyledCard>
  );
}
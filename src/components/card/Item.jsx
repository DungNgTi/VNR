import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { dataItemProps } from '../../schemas/data';
import Author from './Author';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  minHeight: 200, // Đảm bảo thẻ luôn có chiều cao tối thiểu
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': { 
    backgroundColor: (theme.vars || theme).palette.background.paper,
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
  },
  '&:focus-visible': { outline: '3px solid', outlineColor: 'hsla(210, 98%, 48%, 0.5)', outlineOffset: '2px' },
  // Tùy chỉnh dots của swiper trong card
  '& .swiper-pagination-bullet': {
    width: '6px',
    height: '6px',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.4,
  },
  '& .swiper-pagination-bullet-active': {
    opacity: 1,
    width: '12px',
    borderRadius: '4px',
  }
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': { paddingBottom: 16 },
});

const StyledTypography = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3, // Cắt bớt sau 3 dòng
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flexGrow: 1, // Chiếm trọn không gian trống còn lại
  color: theme.palette.text.secondary,
  '& *': {
    margin: 0,
    display: 'inline', // Buộc các thẻ con hiển thị như text để line-clamp hoạt động chính xác
  },
  '& blockquote': {
    borderLeft: '2px solid silver',
    paddingLeft: '8px',
    marginLeft: '4px',
    fontStyle: 'italic',
  }
}));

export default function Item({ item = dataItemProps }) {
  const { Image, Title, Description, Tags, Author: authors, Date: date, Link } = item;

  const [focused, setFocused] = React.useState(false);

  const handleClick = (e) => {
    // Ngăn chặn click khi đang kéo swiper (nếu cần) hoặc click vào pagination
    if (e.target.classList.contains('swiper-pagination-bullet')) return;
    if (Link?.Href) window.open(Link.Href, Link.Target || '_self');
  };

  return (
    <StyledCard
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
      className={focused ? 'Mui-focused' : ''}
    >
      {Image && Image.length > 0 && (
        <Box sx={{ width: '100%', aspectRatio: '16 / 9', borderBottom: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            style={{ width: '100%', height: '100%' }}
          >
            {Image.map((img, idx) => (
              <SwiperSlide key={idx}>
                <CardMedia
                  component="img"
                  alt={`${Title} - ${idx}`}
                  image={img}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
      <StyledCardContent>
        {Tags && Tags.length > 0 && (
          <Typography gutterBottom variant="caption" component="div">{Tags[0]}</Typography>
        )}
        <Typography gutterBottom variant="h6" component="div">{Title}</Typography>
        <StyledTypography 
          dangerouslySetInnerHTML={{ __html: Description }}
        />
      </StyledCardContent>
      <Author authors={authors} date={date} />
    </StyledCard>
  );
}
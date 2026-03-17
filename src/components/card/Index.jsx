import { Box, Grid, Typography, Stack } from '@mui/material';
import Item from './Item';
import { Search, filterData } from './Search';
import { cardProps } from '../../schemas/layout';
import { dataItemProps } from '../../schemas/data';
import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

export default function CardModule({
  data = [dataItemProps],
  config = cardProps,
}) {
  const { Config, Title, Description } = config;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() =>
    filterData(data, query, category),
    [data, query, category]
  );

  const hasImages = useMemo(() => 
    filtered.some(item => item.Image && item.Image.length > 0),
    [filtered]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      {(Title || Description) && (
        <Box>
          {Title && <Typography variant="h4" gutterBottom dangerouslySetInnerHTML={{ __html: Title }} />}
          {Description && <Typography dangerouslySetInnerHTML={{ __html: Description }} />}
        </Box>
      )}

      <Search
        query={query} onSearch={setQuery}
        category={category} onCategory={setCategory}
        placeholder={Config?.Placeholder}
        categories={Config?.Categories}
      />

      {hasImages ? (
        /* Chế độ Grid cho thẻ có ảnh */
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {filtered.map((item, index) => {
            const scale = item.Scale ?? (index < 2 ? 0.5 : 0.33)
            const pct = `calc(${scale * 100}% - 16px)` // minus gap

            return (
              <Box
                key={index}
                sx={{
                  width: pct,
                  flexGrow: 1,
                  flexShrink: 0,
                  minWidth: { xs: "100%", sm: 300 },
                }}
              >
                <Item item={item} />
              </Box>
            )
          })}
        </Box>
      ) : (
        /* Chế độ Swiper cho thẻ không có ảnh */
        <Box sx={{ width: "100%" }}>
          <Swiper
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[FreeMode]}
            freeMode={true}
            spaceBetween={16}
            slidesPerView="auto"
            style={{ width: "100%", paddingBottom: "20px" }}
          >
            {filtered.map((item, index) => (
              <SwiperSlide key={index} style={{ width: "auto", height: "auto", display: "flex" }}>
                <Box sx={{ width: { xs: 280, md: 350 }, height: "100%" }}>
                  <Item item={item} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Dot Indicators */}
          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
            {filtered.map((_, i) => (
              <Box
                key={i}
                onClick={() => swiperRef?.slideTo(i)}
                sx={{
                  width: activeIndex === i ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: activeIndex === i ? "primary.main" : "grey.400",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {!filtered.length && (
        <Typography variant="body1" align="center" sx={{ py: 8 }}>
          Không tìm thấy nội dung phù hợp.
        </Typography>
      )}
    </Box>
  );
}

import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, FreeMode } from "swiper/modules"
import { useState } from "react"
import "swiper/css"
import { Box, Stack, Typography } from "@mui/material"
import { ProfileCard } from "./Card"

export default function ProfileModule({ data = [], config = profileProps }) {
  const { Title, Description } = config
  const { Scroll: { Direction = "Horizontal", Parallax: EnableParallax = true } = {} } = config.Config || {}
  const isHorizontal = Direction === "Horizontal"

  const [activeIndex, setActiveIndex] = useState(0)
  const [swiperRef, setSwiperRef] = useState(null)

  return (
    <Box sx={{ width: "100%" }}>
      {Title && <Typography variant="h4" dangerouslySetInnerHTML={{ __html: Title }} />}
      {Description && <Typography variant="body1" sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: Description }} />}

      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Parallax, FreeMode]}
        parallax={EnableParallax}
        freeMode={true}
        spaceBetween={16}
        slidesPerView="auto"
        direction={isHorizontal ? "horizontal" : "vertical"}
        style={{ width: "100%", paddingBottom: isHorizontal ? "40px" : 0 }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto", display: "flex" }} data-swiper-parallax={index % 2 === 0 ? "-100" : "100"}>
            <ProfileCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom MUI Dot Indicators */}
      {isHorizontal && (
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1 }}>
          {data.map((_, i) => (
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
      )}
    </Box>
  )
}
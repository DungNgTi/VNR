import { useState } from "react"
import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, FreeMode } from "swiper/modules"
import "swiper/css"

/**
 * General Scroller Component
 * Supports both Swiper-based scrolling and native MUI overflow scrolling
 * @param {Object} props
 * @param {"horizontal" | "vertical"} props.direction - Scroll direction
 * @param {boolean} props.parallax - Enable parallax effect (Swiper only)
 * @param {boolean} props.freeMode - Enable free mode scrolling
 * @param {number} props.spaceBetween - Space between slides in px
 * @param {"auto" | number} props.slidesPerView - Number of slides per view
 * @param {boolean} props.showDots - Show dot indicators (Swiper only)
 * @param {boolean} props.useNative - Use native MUI overflow instead of Swiper
 * @param {Object} props.sx - Additional MUI sx styles
 * @param {React.ReactNode} props.children - Content to scroll (for native mode)
 * @param {Array} props.items - Array of items to render as slides (for Swiper mode)
 * @param {Function} props.renderSlide - Function to render each slide (for Swiper mode)
 */
export default function Scroller({
  direction = "horizontal",
  parallax = false,
  freeMode = true,
  spaceBetween = 16,
  slidesPerView = "auto",
  showDots = true,
  useNative = false,
  sx = {},
  children,
  items = [],
  renderSlide,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiperRef, setSwiperRef] = useState(null)

  const isHorizontal = direction === "horizontal"

  // Native MUI scrolling mode
  if (useNative) {
    return (
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          flexDirection: isHorizontal ? "row" : "column",
          gap: spaceBetween,
          ...sx,
        }}
      >
        {children}
      </Box>
    )
  }

  // Swiper-based scrolling mode
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Parallax, FreeMode]}
        parallax={parallax}
        freeMode={freeMode}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        direction={isHorizontal ? "horizontal" : "vertical"}
        style={{ width: "100%", paddingBottom: isHorizontal && showDots ? "40px" : 0 }}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "auto", height: "auto", display: "flex" }}
            data-swiper-parallax={parallax ? (index % 2 === 0 ? "-100" : "100") : undefined}
          >
            {renderSlide ? renderSlide(item, index) : item}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dot Indicators */}
      {isHorizontal && showDots && items.length > 0 && (
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
          {items.map((_, i) => (
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

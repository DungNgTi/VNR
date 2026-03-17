import { Box, Typography } from "@mui/material"
import { ProfileCard } from "./Card"
import Scroller from "../scroller/Index"
import { profileProps } from "../../schemas/layout"

export default function ProfileModule({ data = [], config = profileProps }) {
  const { Title, Description } = config
  const { Scroll: { Direction = "Horizontal", Parallax: EnableParallax = true, ShowDots = true } = {} } = config.Config || {}

  return (
    <Box sx={{ width: "100%" }}>
      {Title && <Typography variant="h4" dangerouslySetInnerHTML={{ __html: Title }} />}
      {Description && <Typography variant="body1" sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: Description }} />}

      <Scroller
        direction={Direction.toLowerCase()}
        parallax={EnableParallax}
        showDots={ShowDots}
        spaceBetween={16}
        items={data}
        renderSlide={(item, index) => <ProfileCard item={item} />}
      />
    </Box>
  )
}

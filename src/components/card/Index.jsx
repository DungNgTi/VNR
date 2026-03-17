import { Box, Grid, Typography } from '@mui/material'
import Item from './Item'
import { Search, filterData } from './Search'
import { cardProps } from '../../schemas/layout'
import { dataItemProps } from '../../schemas/data'
import { useMemo, useState } from 'react'
import Scroller from '../scroller/Index'

export default function CardModule({
  data = [dataItemProps],
  config = cardProps,
}) {
  const { Config, Title, Description } = config
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() =>
    filterData(data, query, category),
    [data, query, category]
  )

  const hasImages = useMemo(() =>
    filtered.some(item => item.Image && item.Image.length > 0),
    [filtered]
  )

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
        /* Grid mode for cards with images */
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
        /* Scroller mode for cards without images */
        <Scroller
          direction="horizontal"
          parallax={false}
          showDots={true}
          spaceBetween={16}
          items={filtered}
          renderSlide={(item, index) => (
            <Box sx={{ width: { xs: 280, md: 350 }, height: "100%" }}>
              <Item item={item} />
            </Box>
          )}
        />
      )}

      {!filtered.length && (
        <Typography variant="body1" align="center" sx={{ py: 8 }}>
          Không tìm thấy nội dung phù hợp.
        </Typography>
      )}
    </Box>
  )
}

import { Box, Grid, Typography } from '@mui/material';
import Item from './Item';
import { Search, filterData } from './Search';
import { cardProps } from '../../schemas/layout';
import { dataItemProps } from '../../schemas/data';
import { useMemo, useState } from 'react';

export default function CardModule({
  data = [dataItemProps],
  config = cardProps,
}) {
  const { Config, Title, Description } = config;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() =>
    filterData(data, query, category),
    [data, query, category]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      {(Title || Description) && (
        <Box>
          {Title && <Typography variant="h1" gutterBottom>{Title}</Typography>}
          {Description && <Typography>{Description}</Typography>}
        </Box>
      )}

      <Search
        query={query} onSearch={setQuery}
        category={category} onCategory={setCategory}
        placeholder={Config?.Placeholder}
        categories={Config?.Categories}
      />

      <Grid container spacing={2}>
        <Grid container spacing={2}>
          {filtered.map((item, index) => {
            const scale = item.Scale ?? (index < 2 ? 0.5 : 0.33)
            const mdCols = Math.round(scale * 12) // 0.5 → 6, 0.33 → 4, 1 → 12

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {filtered.map((item, index) => {
                  const scale = item.Scale ?? (index < 2 ? 0.5 : 0.33)
                  const pct = `calc(${scale * 100}% - 16px)` // minus gap

                  return (
                    <Box
                      key={index}
                      sx={{
                        width: pct,
                        aspectRatio: "1 / 1",
                        flexGrow: 1,      // fills leftover space on row
                        flexShrink: 0,
                        minWidth: 120,    // prevents too-tiny cards on mobile
                      }}
                    >
                      <Item item={item} />
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Grid>
      </Grid>

      {!filtered.length && (
        <Typography variant="body1" align="center" sx={{ py: 8 }}>
          No items found matching your criteria.
        </Typography>
      )}
    </Box>
  );
}

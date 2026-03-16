import * as React from 'react';
import { Box, Chip, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import RssIcon from '@mui/icons-material/RssFeedRounded';

export const filterData = (data, query, category) => 
  data.filter(item => 
    (item.Title + item.Description).toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || item.Tags?.includes(category))
  );

export function Search({ query, placeholder, onSearch, category, onCategory, categories = [] }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 1, overflow: 'auto' }}>
        {['All', ...categories].map(c => (
          <Chip 
            key={c} 
            label={c} 
            onClick={() => onCategory(c)} 
            color={category === c ? 'primary' : 'default'} 
            variant={category === c ? 'filled' : 'outlined'} 
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
        <OutlinedInput
          size="small"
          fullWidth
          placeholder={placeholder || "Search…"}
          value={query}
          onChange={e => onSearch(e.target.value)}
          startAdornment={<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>}
          sx={{ maxWidth: { sm: '25ch' } }}
        />
        <IconButton size="small"><RssIcon /></IconButton>
      </Box>
    </Box>
  );
}

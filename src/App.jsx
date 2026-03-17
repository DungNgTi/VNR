import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppRouter from './router/AppRouter';

/**
 * Main application component
 * Sets up the theme, layout container, and routing
 */
export default function App(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="xl"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 9, gap: 4 }}
      >
        <AppRouter />
      </Container>
    </AppTheme>
  );
}

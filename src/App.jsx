import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';
import Page from './components/Page';

export default function Blog(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="xl"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 9, gap: 4 }}
      >
        <Page src="/config/default.json" />
        {/* <Latest /> */}
      </Container>
      {/* <Footer /> */}
    </AppTheme>
  );
}

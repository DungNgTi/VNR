import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

function Copyright({ name, url }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href={url ?? '#'}>
        {name ?? 'Sitemark'}
      </Link>
      &nbsp;{new Date().getFullYear()}
    </Typography>
  );
}

const footerProps = {
  Brand: {
    Logo: null,           // React component or null
    Name: 'Sitemark',
    Url: '/',
  },
  Newsletter: {
    Enabled: true,
    Title: 'Join the newsletter',
    Description: 'Subscribe for weekly updates. No spams ever!',
    Placeholder: 'Your email address',
    ButtonLabel: 'Subscribe',
    onSubmit: null,       // (email) => void
  },
  Columns: [
    {
      Title: 'Product',
      Links: [
        { Label: 'Features', Url: '#' },
        { Label: 'Testimonials', Url: '#' },
        { Label: 'Pricing', Url: '#' },
        { Label: 'FAQs', Url: '#' },
      ],
    },
    {
      Title: 'Company',
      Links: [
        { Label: 'About us', Url: '#' },
        { Label: 'Careers', Url: '#' },
        { Label: 'Press', Url: '#' },
      ],
    },
    {
      Title: 'Legal',
      Links: [
        { Label: 'Terms', Url: '#' },
        { Label: 'Privacy', Url: '#' },
        { Label: 'Contact', Url: '#' },
      ],
    },
  ],
  Legal: {
    Links: [
      { Label: 'Privacy Policy', Url: '#' },
      { Label: 'Terms of Service', Url: '#' },
    ],
  },
  Socials: [
    { Icon: 'github',   Url: 'https://github.com/mui',                        Label: 'GitHub' },
    { Icon: 'twitter',  Url: 'https://x.com/MaterialUI',                      Label: 'X' },
    { Icon: 'linkedin', Url: 'https://www.linkedin.com/company/mui/',          Label: 'LinkedIn' },
  ],
}

const SOCIAL_ICONS = {
  github:   <GitHubIcon />,
  twitter:  <TwitterIcon />,
  linkedin: <LinkedInIcon />,
}

export default function Footer({ config = footerProps }) {
  const { Brand, Newsletter, Columns, Legal, Socials } = config
  const [email, setEmail] = React.useState('')

  const handleSubscribe = () => {
    Newsletter?.onSubmit?.(email)
    setEmail('')
  }

  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          {/* Brand + Newsletter */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              {Brand?.Logo && <Brand.Logo />}
              {Brand?.Name && !Brand?.Logo && (
                <Typography variant="h6" fontWeight={700}>{Brand.Name}</Typography>
              )}

              {Newsletter?.Enabled && (
                <>
                  <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                    {Newsletter.Title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {Newsletter.Description}
                  </Typography>
                  <InputLabel htmlFor="email-newsletter">Email</InputLabel>
                  <Stack direction="row" spacing={1} useFlexGap>
                    <TextField
                      id="email-newsletter"
                      hiddenLabel
                      size="small"
                      variant="outlined"
                      fullWidth
                      placeholder={Newsletter.Placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      slotProps={{ htmlInput: { autoComplete: 'off' } }}
                      sx={{ width: '250px' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ flexShrink: 0 }}
                      onClick={handleSubscribe}
                    >
                      {Newsletter.ButtonLabel}
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          </Box>

          {/* Nav Columns */}
          {Columns?.map((col, i) => (
            <Box key={i} sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{col.Title}</Typography>
              {col.Links?.map((link, j) => (
                <Link key={j} color="text.secondary" variant="body2" href={link.Url}>
                  {link.Label}
                </Link>
              ))}
            </Box>
          ))}
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            {Legal?.Links?.map((link, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>&nbsp;•&nbsp;</Typography>
                )}
                <Link color="text.secondary" variant="body2" href={link.Url}>
                  {link.Label}
                </Link>
              </React.Fragment>
            ))}
            <Copyright name={Brand?.Name} url={Brand?.Url} />
          </div>

          {/* Socials */}
          <Stack direction="row" spacing={1} useFlexGap sx={{ color: 'text.secondary' }}>
            {Socials?.map((social, i) => (
              <IconButton
                key={i}
                color="inherit"
                size="small"
                href={social.Url}
                aria-label={social.Label}
                sx={{ alignSelf: 'center' }}
              >
                {SOCIAL_ICONS[social.Icon] ?? null}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  )
}
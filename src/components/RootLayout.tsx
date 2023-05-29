import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import MainNavigation from './MainNavigation';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography/Typography';
import ColorSchemeToggle from './utils/ColorSchemeToggle';
import Header from './Header';

export default function RootLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', overflow: 'auto' }}>
      <Header />
      <MainNavigation />
      <Box
        component="main"
        className="MainContent"
        sx={(theme) => ({
          px: {
            xs: 2,
            md: 6,
          },
          pt: {
            xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
            sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
            md: `calc(${theme.spacing(2)} + var(--Header-height))`,
          },
          pb: {
            xs: 2,
            sm: 2,
            md: 3,
          },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<i data-feather="chevron-right" />}
            sx={{
              '--Breadcrumbs-gap': '1rem',
              '--Icon-fontSize': '16px',
              fontWeight: 'lg',
              color: 'neutral.400',
              px: 0,
            }}
          >
            <Link
              underline="none"
              color="neutral"
              fontSize="inherit"
              href="#some-link"
              aria-label="Home"
            >
              <i data-feather="home" />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              fontSize="inherit"
              href="#some-link"
            >
              Dashboard
            </Link>
            <Typography fontSize="inherit" variant="soft" color="primary">
              Orders
            </Typography>
          </Breadcrumbs>
          <ColorSchemeToggle
            sx={{
              ml: 'auto',
              display: { xs: 'none', md: 'none', lg: 'inline-flex' },
            }}
          />
        </Box>
        {children}
      </Box>
    </Box>
  );
}

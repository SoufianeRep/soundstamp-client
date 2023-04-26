import React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet/Sheet';
import List from '@mui/joy/List/List';
import { Link } from 'react-router-dom';
import ListSubheader from '@mui/joy/ListSubheader/ListSubheader';
import ListItem from '@mui/joy/ListItem/ListItem';
import ListItemButton from '@mui/joy/ListItemButton/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent/ListItemContent';
import Typography from '@mui/joy/Typography/Typography';
import IconButton from '@mui/joy/IconButton/IconButton';
import { closeNavigation, openNavigation } from '../utils/animationUtils';

export default function MainNavigation() {
  return (
    <>
      <Box
        className="SideNavigation-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgColor: 'background.body',
          opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeNavigation()}
      />
      <Sheet
        className="SideNavigation"
        sx={{
          position: { xs: 'fixed', lg: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'none',
          },
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'transform 0.4s',
          zIndex: 9999,
          height: '100vh',
          top: 0,
          p: 2,
          py: 3,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <List
          sx={{
            '--ListItem-radius': '8px',
            '--ListItem-minHeight': '32px',
            '--List-gap': '4px',
          }}
        >
          <ListSubheader role="presentation" sx={{ color: 'text.primary' }}>
            Dashboard
          </ListSubheader>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemButton
                onClick={() => closeNavigation()}
                selected
                variant="soft"
              >
                <ListItemDecorator>
                  <i data-feather="activity" />
                </ListItemDecorator>
                <ListItemContent>Overview</ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/dropbox" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemButton onClick={() => closeNavigation()}>
                <ListItemDecorator>
                  <i data-feather="hard-drive" />
                </ListItemDecorator>
                <ListItemContent>Dropbox</ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemButton onClick={() => closeNavigation()}>
                <ListItemDecorator>
                  <i data-feather="clipboard" />
                </ListItemDecorator>
                <ListItemContent>Projects</ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/calendar" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemButton onClick={() => closeNavigation()}>
                <ListItemDecorator>
                  <i data-feather="calendar" />
                </ListItemDecorator>
                <ListItemContent>Calender</ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemButton onClick={() => closeNavigation()}>
                <ListItemDecorator>
                  <i data-feather="settings" />
                </ListItemDecorator>
                <ListItemContent>Administration Tools</ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Box sx={{ pl: 1, mt: 'auto', display: 'flex', alignItems: 'center' }}>
          <div>
            <Typography fontWeight="lg" level="body2">
              Ezzine Youness
            </Typography>
            <Typography level="body3">you.ezzine@gmail.com</Typography>
          </div>
          <IconButton variant="plain" sx={{ ml: 'auto' }}>
            <i data-feather="log-out" />
          </IconButton>
        </Box>
      </Sheet>
    </>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tab from '@mui/joy/Tab';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Link } from '@mui/material';

import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import Accounts from './Accounts';
import Invitations from './Invitations';

export default function AdminToolsLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 2,
        }}
      >
        <Typography
          startDecorator={<EngineeringRoundedIcon />}
          level="h1"
          fontSize="xl4"
        >
          Administration Tools
        </Typography>
        <Box sx={{ flex: 999 }} />
      </Box>
      <Sheet>
        <Tabs sx={{}} defaultValue={0}>
          <TabList>
            <Tab>Accounts</Tab>
            <Tab>Invitations</Tab>
            <Tab>Tab...</Tab>
            <Tab>Tab...</Tab>
          </TabList>
          <Sheet
            className="AdminToolsContainer"
            variant="outlined"
            sx={{
              width: '100%',
              borderRadius: 'md',
              flex: 1,
              overflow: 'auto',
              minHeight: 0,
              mt: 2,
            }}
          >
            {/* <Outlet /> */}
            <TabPanel value={0}>
              <Accounts />
            </TabPanel>
            <TabPanel value={1}>
              <Invitations />
            </TabPanel>
          </Sheet>
        </Tabs>
      </Sheet>
    </Box>
  );
}

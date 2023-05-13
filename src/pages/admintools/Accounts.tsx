import React from 'react';
import Box from '@mui/joy/Box';
import CreateUserForm from '../../components/CreateUserFrom';
import UsersList from '../../components/UsersList';

export default function Accounts() {
  return (
    <Box
      sx={{
        display: { md: 'flex' },
        height: 'auto',
        gap: 2,
        py: 1,
        px: 2,
      }}
    >
      <UsersList />
      <CreateUserForm />
    </Box>
  );
}

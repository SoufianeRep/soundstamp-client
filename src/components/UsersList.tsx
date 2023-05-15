import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import { ColorPaletteProp } from '@mui/joy/styles';
import Stack from '@mui/joy/Stack';
import useLocalStorage from '../hooks/useLocalStorage';
import { capitalize } from '../utils/helpers';

type User = {
  avatarUrl: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: string;
};

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [token] = useLocalStorage('token', '');

  const fetchUsers = async () => {
    const baseURL = import.meta.env.VITE_BACKEND_DOMAIN;
    try {
      const response = await axios({
        method: 'get',
        url: '/users',
        baseURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const usersMarkup = (users: User[]): JSX.Element[] => {};

  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);

  return (
    <Box sx={{ minWidth: '55%', my: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography component="h2" fontSize="xl2" fontWeight="lg">
          Users List
        </Typography>
        <Box sx={{ flex: 999 }} />
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          borderRadius: 'md',
          flex: 1,
          overFlow: 'auto',
          minHeight: 0,
          mt: 2,
        }}
      >
        <Table stickyHeader hoverRow>
          <thead>
            <tr>
              <th style={{ width: 50, textAlign: 'center' }}></th>
              <th style={{ width: 160, textAlign: 'start', padding: 12 }}>
                Email
              </th>
              <th style={{ width: 70, textAlign: 'start', padding: 12 }}>
                Permission
              </th>
              <th style={{ width: 50, textAlign: 'start', padding: 12 }}>
                Settings
              </th>
            </tr>
          </thead>
          <tbody style={{ overflow: 'scroll' }}>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ textAlign: 'center' }}>
                  <Avatar size="lg" variant="solid" src={user.avatarUrl} />
                </td>
                <td>
                  <Stack>
                    <Typography component={'h4'}>{`${capitalize(
                      user.firstName
                    )} ${capitalize(user.lastName)}`}</Typography>
                    <Typography>{user.email}</Typography>
                  </Stack>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    color={
                      {
                        superadmin: 'warning',
                        admin: 'danger',
                        user: 'primary',
                      }[user.role] as ColorPaletteProp
                    }
                  >
                    {capitalize(user.role)}
                  </Chip>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}

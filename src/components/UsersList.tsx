import React, { useEffect, useState, MouseEvent } from 'react';
import axios from 'axios';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/joy/Stack';
import useLocalStorage from '../hooks/useLocalStorage';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import { capitalize } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

type User = {
  avatarUrl: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: string;
};

type UserWithMenu = User & { menuOpen: boolean; anchorEl: null | HTMLElement };

export default function UsersList() {
  const [users, setUsers] = useState<UserWithMenu[]>([]);
  const [token] = useLocalStorage('token', '');
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLElement>, user: UserWithMenu) => {
    // event.stopPropagation();
    if (user.menuOpen) return;
    setUsers((prevUsers) =>
      prevUsers.map((prevUser) =>
        prevUser.id === user.id
          ? {
              ...prevUser,
              menuOpen: prevUser.id === user.id ? !prevUser.menuOpen : false,
              anchorEl: prevUser.id === user.id ? event.currentTarget : null,
            }
          : prevUser
      )
    );
  };
  const handleClose = (user: UserWithMenu) => {
    setUsers((prevUsers) =>
      prevUsers.map((prevUser) =>
        prevUser.id === user.id
          ? { ...prevUser, menuOpen: false, anchorEl: null }
          : prevUser
      )
    );
  };

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
      const response = error.repsonse;
      if (response.status === 401) {
        navigate('/login');
        localStorage.removeItem('token');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const usersMarkup = users.map((user: UserWithMenu) => {
    return (
      <tr key={user.id}>
        <td style={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar size="md" variant="solid" src={user.avatarUrl} />
          </Box>
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
                guest: 'neutral',
              }[user.role] as ColorPaletteProp
            }
          >
            {capitalize(user.role)}
          </Chip>
        </td>
        <td>
          <div>
            <IconButton
              id={`user-menu-button-${user.id}`}
              aria-controls={user.menuOpen ? `user-menu-${user.id}` : undefined}
              aria-haspopup="true"
              aria-expanded={user.menuOpen ? 'true' : undefined}
              color="neutral"
              variant="plain"
              onClick={(event) => handleClick(event, user)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id={`user-menu-${user.id}`}
              anchorEl={user.anchorEl}
              open={user.menuOpen}
              onClose={() => handleClose(user)}
              aria-labelledby={`user-menu-button-${user.id}`}
            >
              <MenuItem onClick={() => handleClose(user)}>Edit</MenuItem>
              <MenuItem onClick={() => handleClose(user)}>Item</MenuItem>
              <MenuItem onClick={() => handleClose(user)}>Item</MenuItem>
            </Menu>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Box sx={{ my: 2, px: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography component="h2" fontSize="xl2" fontWeight="lg">
          Users List
        </Typography>
        <Box sx={{ flex: 999 }} />
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          // width: '100%',
          borderRadius: 'md',
          flex: 1,
          overFlow: 'auto',
          minHeight: 0,
          mt: 2,
        }}
      >
        <Table stickyHeader hoverRow sx={{ overflow: 'scroll' }}>
          <thead>
            <tr>
              <th style={{ width: '10%', padding: 12 }}></th>
              <th style={{ textAlign: 'start', padding: 12 }}>Info</th>
              <th style={{ width: '15%', textAlign: 'start', padding: 12 }}>
                Permission
              </th>
              <th
                style={{ width: '10%', textAlign: 'start', padding: 12 }}
              ></th>
            </tr>
          </thead>
          <tbody style={{ overflow: 'scroll' }}>{usersMarkup}</tbody>
        </Table>
      </Sheet>
    </Box>
  );
}

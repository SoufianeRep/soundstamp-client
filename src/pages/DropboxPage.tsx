import React, { useState, useEffect } from 'react';
import { Dropbox } from 'dropbox';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import DropboxLoginForm from '../components/DropboxLoginForm';

const accessToken = import.meta.env.VITE_DROPBOX_ACCESS;
// const dbx = new Dropbox({
//   accessToken,
// });
const dbx = new Dropbox({
  accessToken,
});

export default function DropboxPage() {
  const [isLogged, setIsLogged] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);

  const errorMarkup = '';

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          my: 1,
          gap: 1,
        }}
      >
        <Typography level="h1" fontSize="xl4">
          Dropbox
        </Typography>
        <Box sx={{ flex: 999 }} />
        <Box>
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<i data-feather="upload-cloud" />}
          >
            Upload a File
          </Button>
        </Box>
      </Box>
      {!isLogged ? <DropboxLoginForm setIsLogged={setIsLogged} /> : <></>}
    </>
  );
}

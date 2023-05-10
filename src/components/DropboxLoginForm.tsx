import React from 'react';
import Container from '@mui/system/Container';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

export default function DropboxLoginForm({ setIsLogged }) {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ alignSelf: 'center' }}>
        <Button
          onClick={() => {}}
          startDecorator={<CheckBoxOutlineBlankOutlinedIcon />}
          color="primary"
          variant="solid"
          size="lg"
        >
          Login to Dropbox
        </Button>
      </Box>
    </Container>
  );
}

import { useState, useEffect } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Stack from '@mui/material/Stack';
import Button from '@mui/joy/Button';
import FormHelperText from '@mui/joy/FormHelperText';
import { generatePassword } from '../utils/helpers';

export default function CreateUserForm() {
  const [password, setPassword] = useState('');
  const passwordLength = 12;

  const handleGenerate = () => {
    setPassword(generatePassword(passwordLength));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    console.log(password);
  };

  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    <Box sx={{ my: 2, px: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography component="h2" fontSize="xl2" fontWeight="lg">
          Create A User
        </Typography>
        <Box sx={{ flex: 999 }} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack>
            <Box sx={{ display: 'flex' }}>
              <FormControl sx={{ width: '47%' }}>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="Soufiane" />
                <FormHelperText sx={{ visibility: 'hidden', color: 'red' }}>
                  Name Required
                </FormHelperText>
              </FormControl>
              <Box flex={999} />
              <FormControl sx={{ width: '47%' }}>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Ezzine" />
                <FormHelperText sx={{ visibility: 'hidden', color: 'red' }}>
                  Name Required
                </FormHelperText>
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="email@example.com" />
              <FormHelperText sx={{ visibility: 'hidden', color: 'red' }}>
                Email Required
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Set a Password</FormLabel>
              <Input
                value={password}
                placeholder="Set a password or generate ->"
                onChange={handleChange}
                endDecorator={
                  <Button variant="plain" onClick={handleGenerate} sx={{}}>
                    Generate
                  </Button>
                }
              />
              <FormHelperText sx={{ visibility: 'hidden', color: 'red' }}>
                Set a password or generate one
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Set Premissions</FormLabel>
              <RadioGroup
                defaultValue="outlined"
                orientation="horizontal"
                sx={{ mt: 1 }}
              >
                <Radio value="user" label="User" />
                <Box sx={{ width: '30%' }} />
                <Radio value="admin" label="Admin" />
              </RadioGroup>
              <FormHelperText sx={{ visibility: 'hidden', color: 'red' }}>
                Please set a permission
              </FormHelperText>
            </FormControl>
            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit">Create a User</Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

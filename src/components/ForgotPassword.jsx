import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';
import { doPasswordReset } from '../firebase/FirebaseFunctions.js'
import { validateEmail } from '../helpers.js';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
  
    const onSubmit = async () => {
      try {
        if(email.length == 0) throw new Error("Email is Required")
        validateEmail(email)
      
        await doPasswordReset(email);
        setError("")
        setMessage("We have mailed you a link to reset your password!")
        setEmail("")
      } catch (e) {
        if(e.code == "auth/invalid-credential")
          setError("Invalid Login Credentials")
        else setError(e.message)
      }
    };

  
    return (
      <Box height={'85vh'} display={'flex'} justifyContent={'center'}>
        <Box width={'400px'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Box padding={2} border={5} borderColor={'secondary.main'} borderRadius={4}>
            <Typography variant='h5'>Forgot Password!</Typography>
            <Typography variant='subtitle1'>No worries we have you covered!</Typography>
            <Divider/>

            <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Email</Typography>
            <TextField
              required
              fullWidth
              InputLabelProps={{shrink: false}}
              sx={{marginBottom: '15px'}}
              placeholder="Email"
              type='email'
              onChange={e => setEmail(e.target.value.trim())}/>
  
            <Button fullWidth variant="outlined" color="primary" sx={{marginBottom: '10px'}} onClick={e => onSubmit()}>
                Submit
            </Button>

            {message &&
              <Box display={'flex'} justifyContent={'center'} marginTop={'15px'}>
                <Typography variant='subtitle1' color={'success'} textAlign={'center'}>{message}</Typography>
              </Box>
            }

            {error &&
              <Box display={'flex'} justifyContent={'center'} marginTop={'15px'}>
                <Typography variant='subtitle1' color={'error'} textAlign={'center'}>{error}</Typography>
              </Box>
            }
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default ForgotPassword;